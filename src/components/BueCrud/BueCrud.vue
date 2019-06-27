<template>
    <div class="bue-crud" v-loading="loading">
        <div class="top-handle">
            <slot name="crudTitle">TITLE</slot>
            <div class="operation" v-loading.fullscreen.lock="saving">
                <!-- 扩展操作 -->
                <slot name="extendHandel"></slot>
                <button class="operation-btn" title="添加" @click="Create" v-if="checkHandle(handle, 'create')"><i
                        class="el-icon-plus"></i></button>
                <button class="operation-btn" title="编辑" @click="Update(selectRows[0])"
                        v-if="checkHandle(handle, 'update')" :disabled="selectRows.length !== 1"><i
                        class="el-icon-edit"></i></button>
                <button class="operation-btn" title="批量删除" @click="Delete(selectRows)"
                        v-if="checkHandle(handle, 'multiDel') && multiple" :disabled="!selectRows.length"><i
                        class="el-icon-delete"></i></button>

                <template v-if="checkHandle(handle, 'export')">
                    <el-dropdown @command="Export" v-if="selectRows.length">
                        <!--<span class="el-dropdown-link">
                            下拉菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                        </span>-->
                        <button class="operation-btn" title="导出">
                            <i class="el-icon-download"></i>
                        </button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="checks">选中</el-dropdown-item>
                            <el-dropdown-item command="all">全部</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <button v-else class="operation-btn" title="导出" @click="Export">
                        <i class="el-icon-download"></i>
                    </button>
                </template>

                <button class="operation-btn" title="刷新" @click="Refresh" v-if="checkHandle(handle, 'refresh')"><i
                        class="el-icon-refresh"></i></button>
                <div class="filter-box" v-if="$slots.filterBox">
                    <slot name="filterBox">
                    </slot>
                    <button class="search-btn" @click="Query"><i class="el-icon-search"></i></button>
                </div>
            </div>
        </div>
        <div class="table-con">
            <bue-table ref="bueTable" :columns="columns" :data="rows"
                       :bindings="bindings" :multiple="multiple" :rowNum="rowNum" :columnHandel="columnHandel"
                       :file-name="fileName" @selection-change="selectionChange">
                <!-- 行号列插槽 -->
                <template v-slot:hasRowNUm="{index}">
                    {{(pagination.pageIndex-1)*pagination.pageSize+index}}
                </template>

                <template v-slot:hasRowHandel="{scope}">
                    <el-button size="mini" @click="Update(scope.row)"
                               v-if="checkHandle(columnHandel, 'update')">编辑
                    </el-button>
                    <el-button size="mini" type="danger" @click="Delete(scope.row)"
                               v-if="checkHandle(columnHandel, 'del')">删除
                    </el-button>
                </template>
            </bue-table>
        </div>
        <div class="page-box" v-if="isPager">
            <el-pagination
                    background
                    @size-change="pageSizeChange"
                    @current-change="currentChange"
                    :current-page="pagination.pageIndex"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pagination.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.total">
            </el-pagination>
        </div>
        <el-dialog ref="bueCrudDialog" :title="dialog.isNew ? '新增':'修改'" :visible.sync="dialog.visible"
                   custom-class="bue-crud-dialog" :close-on-click-modal="false" append-to-body
                   @open="dialog.closed = false" @closed="dialog.closed = true">

            <bue-form v-if="!dialog.closed" ref="bueCrudForm" v-model="formModel" :label-width="formLabelWidth">
                <slot name="crudForm" :model="formModel" :is-new="dialog.isNew">
                </slot>
            </bue-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import BueForm from '@/components/BueForm/BueForm';
    import BueTable from '@/components/BueTable/BueTable';

    export default {
        name: 'bue-crud',
        components: {
            BueTable,
            BueForm
        },
        props: {
            crudApi: { //增删改查api实例化方法
                default: null
            },
            handle: {
                type: Array,
                default() {
                    return ["create", "update", "multiDel", "export", "refresh"]
                }
            },
            columnHandel: {
                type: Array,
                default() {
                    return ["update", "del"]
                }
            },
            columns: { //表格定义列，支持作用域插槽
                type: Array,
                default() {
                    return []
                }
            },
            bindings: {
                type: Object,
                default: null
            },
            multiple: {
                type: Boolean,
                default: false
            },
            isPager: { //是否显示分页
                type: Boolean,
                default: true
            },
            rowNum: { //是否显示行号
                type: Boolean,
                default: true
            },
            formLabelWidth: { //表单label宽度
                type: String,
                default: ''
            },
            // rules: {
            //     type: Object,
            //     default: null
            // },
            formSet: {
                type: Function,
                default: null
            },
            formGet: {
                type: Function,
                default: null
            },
            fileName: {type: String, default: ''}, //文件导出名
            beforeQuery: {type: Function, default: null}, //主要作用：查询参数修改
            afterQuery: {type: Function, default: null}, //主要作用：查询结果修改
            beforeSave: {type: Function, default: null}, //数据保存的确认,支持异步，必须返回Promis对象， resolve(请求数据)
            afterSave: {type: Function, default: null}, //请求保存数据完成后执行，用于接口返回数据与组件渲染数据的转换
            beforeDelete: {type: Function, default: null}, //数据删除的确认（判断是否允许删除），也可用页面数据与请求删除数据的转化,支持异步，必须返回Promis对象， resolve(请求数据)
            afterDelete: {type: Function, default: null} //请求删除数据完成后执行
        },
        data() {
            return {
                pagination: {pageIndex: 1, pageSize: 10, total: 0}, //当前页、每页数量、总条数
                order: [], // 排序条件
                conditions: [], // 查询条件
                rows: [],
                selectRows: [],
                loading: false,  //查询遮罩
                saving: false, //保存遮罩
                dialog: {
                    isNew: false,
                    visible: false,
                    closed: true //用于重新渲染form，清除验证条件
                },
                formModel: {} //表单内容
            };
        },
        /*created() {
            this.initData();
        },*/
        computed: {},
        methods: {
            checkHandle(handel, item) {
                return handel.indexOf(item) > -1;
            },
            Clear() {
                this.rows = [];
                this.pagination.pageIndex = 1;
                this.pagination.pageSize = 10;
                this.pagination.total = 0;
            },
            Query() {
                let params = {conditions: [], order: []};
                if (typeof this.beforeQuery === 'function') {
                    params = this.beforeQuery(params);
                    if (params === false) {
                        return;
                    }
                }
                let pager = this.isPager ? this.pagination : {pageIndex: 1, pageSize: Infinity};
                this.Clear();
                this.initData(params.conditions, params.order, pager).then((response) => {
                    this.rows = response.list;
                    this.pagination.total = response.total;
                    this.order = params.order;
                    this.conditions = params.conditions;
                    this.$emit('queried', {
                        rows: response.list,
                        total: response.total,
                        pageIndex: 1,
                        pageSize: this.isPager ? this.pagination.pageSize : Infinity
                    })

                });
            },
            async initData(conditions, order, {pageIndex, pageSize}) {
                this.loading = true;
                let response = await this.crudApi.query({conditions, order, pageIndex, pageSize});
                this.loading = false;
                if (typeof this.afterQuery === 'function') {
                    response = this.afterQuery(response); //用于需要修改传回数据时
                    if (response === false) { //返回false则终止修改操作
                        return;
                    }
                }
                return response;
                /*return new Promise((resolve) => {
                    this.loading = true;
                    this.crudApi.query({conditions, order, pageIndex, pageSize}).then((response) => {
                        this.loading = false;
                        if (typeof this.afterQuery === 'function') {
                            response = this.afterQuery(response); //用于需要修改传回数据时
                            if (response === false) { //返回false则终止修改操作
                                return;
                            }
                        }
                        resolve(response);
                    });

                });*/
            },
            // pageSize 改变时会触发
            pageSizeChange(pageSize) {
                this.pagination.pageSize = pageSize;
                this.pagination.pageIndex = 1;
                this.row = [];
                this.initData(this.conditions, this.order, this.pagination).then((response) => {
                    this.rows = response.list;
                    this.pagination.total = response.total;
                    this.$emit('queried', {
                        rows: response.list,
                        total: response.total,
                        pageIndex: 1,
                        pageSize
                    })

                });

            },
            // currentPage 改变时会触发
            currentChange(pageIndex) {
                this.pagination.pageIndex = pageIndex;
                this.row = [];
                this.initData(this.conditions, this.order, this.pagination).then((response) => {
                    this.rows = response.list;
                    this.pagination.total = response.total;
                    this.$emit('queried', {
                        rows: response.list,
                        total: response.total,
                        pageIndex,
                        pageSize: this.pagination.pageSize
                    })
                })
            },
            // 刷新
            Refresh() {
                this.Query();
            },
            // 新增
            Create() {
                this.dialog.isNew = true;
                this.dialog.visible = true;
                this.$set(this, 'formModel', {});
                if (typeof this.formSet === 'function') {
                    this.formModel = this.formSet(this.formModel, this.dialog.isNew);
                }
            },
            // 修改
            Update(row) {
                this.dialog.isNew = false;
                this.dialog.visible = true;
                console.log(row);
                this.$set(this, 'formModel', JSON.parse(JSON.stringify(row))); //深度拷贝
                if (typeof this.formSet === 'function') {
                    this.formModel = this.formSet(this.formModel, this.dialog.isNew);
                }
            },
            // 批量删除
            Delete(rows) {
                let model = JSON.parse(JSON.stringify(rows));
                let success = (response) => {
                    this.saving = false;
                    if (typeof this.afterDelete === 'function') {
                        response = this.afterDelete(response);
                        if (response === false) {
                            return
                        }
                    }
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                        showClose: true
                    });
                    this.$emit('deleted', response);
                    this.Query();
                };
                let fail = () => {
                    this.saving = false;
                };
                let next = (model) => {
                    this.$confirm('您将删除这些记录，是否继续？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.saving = true;
                        this.crudApi.delete(model).then(success).catch(fail);
                    }).catch(() => {

                    });
                };
                if (typeof this.beforeDelete === 'function') {
                    let flag = this.beforeDelete(model);
                    if (flag === false) {
                        console.log('阻止删除');
                    } else if (flag instanceof Promise) {
                        flag.then((m) => {
                            next(m);
                        }).catch(() => {
                        })
                    } else {
                        next(flag);
                    }
                } else {
                    next(model);
                }
            },
            Export(command = 'all') {
                if (command === 'checks') {
                    this.$refs.bueTable.Export(this.selectRows)
                } else {
                    this.initData(this.conditions, this.order, {pageIndex: 1, pageSize: Infinity}).then((response) => {
                        this.$refs.bueTable.Export(response.list);
                    });
                }
            },
            /*// 导出
            onExport(rows) {
                require.ensure([], () => {
                    const {exportJsonToExcel} = require('@/vendor/Export2Excel');
                    let ftCol = this.columns.filter((c) => {
                        return c.dtype !== 'image';
                    });
                    const tHeader = ftCol.map((v) => {
                        return v.label;
                    });
                    const filterVal = ftCol.map((col) => { //键名数组
                        return {
                            data: col.data,
                            dtype: col.dtype,
                            format: col.format
                        };
                    });
                    const data = this.formatJson(filterVal, rows);
                    exportJsonToExcel(tHeader, data, this.fileName);
                });
            },
            formatJson(filterVal, rows) {
                return rows.map((row) => {
                    return filterVal.map(({data, dtype, format}) => {
                        return this.dataFormat(row, data, this.bindings, dtype, format);
                    });
                });
            },*/
            //提交数据
            confirm() {
                this.$refs.bueCrudForm.validate((valid) => {
                    if (valid) {
                        this.saving = true;
                        let model = this.formModel;
                        let isNew = this.dialog.isNew;
                        if (typeof this.formGet === 'function') {
                            model = this.formGet(model, isNew);
                        }
                        if (typeof this.beforeSave === 'function') {
                            let flag = this.beforeSave(model, isNew);
                            if (flag === false) {
                                this.saving = false;
                            } else if (flag instanceof Promise) {
                                flag.then((m) => {
                                    this.onSave(m, isNew);
                                }).catch(() => {
                                })
                            } else {
                                this.onSave(flag, isNew);
                            }
                        } else {
                            this.onSave(model, isNew);
                        }
                    } else {
                        console.log('validate error')
                    }
                })
            },
            async onSave(model, isNew) {
                let success = (response) => {
                    this.dialog.visible = false;
                    if (typeof this.afterSave === 'function') {
                        response = this.afterSave(response, isNew);
                        if (response === false) {
                            this.saving = false;
                            return
                        }
                    }
                    this.saving = false;
                    this.$message({
                        type: 'success',
                        message: `${isNew ? '新增' : '修改'}成功`,
                        showClose: true
                    })
                    this.$emit("saved", response, isNew);
                    this.Query();
                };
                let fail = () => {
                    this.saving = false;
                };
                this.crudApi[isNew ? 'create' : 'update'](model).then(success).catch(fail);
            },
            /*InsertRow(row) {
                this.rows.splice(0, 0, row);
                this.rows.length > this.pagination.pageSize && this.rows.splice(this.rows.length-1, 1);
                this.pagination.total += 1;
            },*/
            selectionChange(rows) {
                this.selectRows = rows;
            },
            // ClosedHandle() {
            //     this.$refs.bueCrudForm.resetFields();
            //     this.dialog.closed = true;
            // }
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    .bue-crud {
        background-color: #ffffff;
        padding: 20px;
        height: 100%;
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: column;
        .top-handle {
            font-size: 18px;
            height: 40px;
            line-height: 40px;
            margin-bottom: 10px;
            flex: 0 0 40px;
            .title {
                padding-left: 10px;
                border-left: solid 4px #329da5;
            }
            .operation {
                float: right;
                height: 40px;
                .el-dropdown {
                    vertical-align: top;
                }
                .operation-btn {
                    width: 34px;
                    height: 34px;
                    line-height: 34px;
                    text-align: center;
                    border: solid 1px #eee;
                    border-radius: 50%;
                    color: #999;
                    cursor: pointer;
                    vertical-align: top;
                    margin: 3px 5px;
                    font-size: 14px;
                    background: none;
                    &:hover {
                        background-color: #f7f7f7;
                    }
                    & > button:last-child {
                        margin-right: 0;
                    }
                    &:disabled {
                        cursor: not-allowed;
                    }
                }
                .filter-box {
                    height: 34px;
                    border-radius: 4px;
                    display: inline-block;
                    margin-left: 10px;
                    margin-top: 4px;
                    .el-form {
                        display: inline-block;
                        height: 32px;
                        overflow: hidden;
                        .el-form-item {
                            margin-right: 8px;
                            margin-bottom: 0;
                            height: 32px;
                            .el-form-item__content {
                                height: 32px;
                                line-height: 32px;
                                .el-input {
                                    input {
                                        width: 180px;
                                        height: 32px;
                                        float: left;
                                        line-height: 32px;
                                        border: solid 1px #eee;
                                        border-radius: 4px;
                                        padding: 0 15px;
                                        font-size: 14px;
                                        &:focus {
                                            background-color: #f7f7f7;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .search-btn {
                        background: none;
                        border: solid 1px #eeeeee;
                        border-radius: 4px;
                        padding: 0 10px;
                        height: 32px;
                        float: right;
                        line-height: 32px;
                        cursor: pointer;
                        &:hover {
                            background-color: #f7f7f7;
                        }
                    }
                }
            }
        }
        .table-con {
            flex: 1;
            position: relative;
            /*.el-table {
                position: absolute;
                height: 100%;
                left: 0;
                right: 0;
                th {
                    background-color: #f0f3fa;
                }
                .el-table__body-wrapper {
                    !*overflow-y: auto;
                    overflow-x: hidden;
                    height: calc(100% - 48px);*!
                }
            }*/
        }
        .page-box {
            flex: 0 0 32px;
            padding-top: 20px;
            .el-pagination__total {
                float: right;
            }
            .el-pagination__sizes {
                float: right;
            }
            .btn-prev {
                margin-left: 0;
            }
            .el-pagination__jump {
                margin-left: 10px;
                .el-pagination__editor.el-input {
                    margin: 0 5px;
                }
            }
        }
    }

    .bue-crud-dialog {
        width: 800px;
        .el-dialog__header {
            background-color: #fafafa;
            padding: 16px 20px;
        }
        .el-dialog__body {
            padding: 30px;
            .el-form {
                & > .el-row {
                    & > .el-col {
                        &:last-child {
                            & > .el-form-item {
                                margin-bottom: 0;
                                & > .el-input {
                                    display: none;
                                }
                            }
                        }
                    }
                }
                .el-form-item {
                    .el-form-item__label {
                        padding: 0 20px 0 0;
                    }
                    .el-form-item__content {
                        .el-select {
                            width: 100%;
                        }
                    }
                }
            }
        }
        .el-dialog__footer {
            border-top: solid 1px #f7f7f7;
            padding: 15px 20px;
        }
    }

    .bue-preview {
        position: relative;
        display: inline-block;
        height: 50px;
        width: 50px;
        vertical-align: middle;
        background-color: #999999;
        text-align: center;
        .load {
            line-height: 50px;
            color: #ffffff;
            font-size: 12px;
        }
        img {
            position: absolute;
            width: 50px;
            height: 50px;
            left: 0;
            top: 0;
            z-index: 1;
        }
        .preview-box {
            display: none;
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            left: 0;
            top: 0;
            text-align: center;
            cursor: pointer;
            z-index: 5;
            i {
                color: #ffffff;
                line-height: 50px;
            }
        }
        &:hover {
            .preview-box {
                display: block;
            }
        }
    }
</style>