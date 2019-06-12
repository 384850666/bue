<template>
    <div class="bue-table">
        <el-table ref="tableModule" v-loading="loading" :data="data"
                  tooltip-effect="dark" stripe @selection-change="selectChange" height="100%">
            <el-table-column type="selection" width="55" v-if="multiple"></el-table-column>

            <el-table-column label="序号" width="50" v-if="rowNum">
                <template slot-scope="scope">
                    <slot name="hasRowNUm" :index="scope.$index+1">
                        {{scope.$index+1}}
                    </slot>
                </template>
            </el-table-column>

            <el-table-column v-for="(column,index) in columns" :key="index" :label="column.label"
                             :width="column.width" :show-overflow-tooltip="column.nowrap">
                <template v-if="!column.children" slot-scope="scope">
                    <slot :name="column.data" :row="scope.row"
                          :format="dataFormat(scope.row, column.data, bindings, column.dtype, column.format)">
                        <template v-if="column.dtype === 'image'">
                            <div class="bue-preview" v-if="scope.row.pics.length">
                                <span class="load">Image</span>
                                <div class="img-box">
                                    <img :src="scope.row.pics[0].url"
                                         alt="" width="50" height="50">
                                </div>
                                <div class="preview-box" title="点击查看大图"
                                     @click="previewPic(scope.row.pics)">
                                    <i class="el-icon-search"></i>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            {{dataFormat(scope.row, column.data, bindings, column.dtype, column.format)}}
                        </template>
                    </slot>
                </template>
                <template v-if="column.children">
                    <el-table-column v-for="(column2, i2) in column.children" :key="i2"
                                     :label="column2.label"
                                     :width="column2.width" :show-overflow-tooltip="column2.nowrap">
                        <template slot-scope="scope">
                            <slot :name="column2.data" :row="scope.row"
                                  :format="dataFormat(scope.row, column2.data, bindings, column2.dtype, column2.format)">
                                <template v-if="column2.dtype === 'image'">
                                    <div class="bue-preview" v-if="scope.row.pics.length">
                                        <span class="load">Image</span>
                                        <div class="img-box">
                                            <img :src="scope.row.pics[0].url"
                                                 alt="" width="50" height="50">
                                        </div>
                                        <div class="preview-box" title="点击查看大图"
                                             @click="previewPic(scope.row.pics)">
                                            <i class="el-icon-search"></i>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    {{dataFormat(scope.row, column2.data, bindings, column2.dtype, column2.format)}}
                                </template>
                            </slot>
                        </template>
                    </el-table-column>
                </template>
            </el-table-column>

            <el-table-column label="管理" width="150" v-if="columnHandel.length">
                <template slot-scope="scope">
                    <slot name="hasRowHandel" :scope="scope"></slot>
                </template>
            </el-table-column>

        </el-table>

        <bue-img-view ref="bueImgView" :urls="picDialog.urls"></bue-img-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import moment from 'moment'
    import BueImgView from '@/components/BueImgView/BueImgView'

    export default {
        name: 'bue-table',
        components: {
            BueImgView
        },
        props: {
            data: {
                type: Array,
                default() {
                    return []
                }
            },
            columns: {
                type: Array,
                default() {
                    return []
                }
            },
            columnHandel: {
                type: Array,
                default() {
                    return []
                }
            },
            multiple: {
                type: Boolean,
                default: false
            },
            bindings: {
                type: Object,
                default: null
            },
            rowNum: {
                type: Boolean,
                default: true
            },
            fileName: { //文件导出名
                type: String,
                default: ''
            },
        },
        data() {
            return {
                loading: false,
                selectRows: [],
                picDialog: {
                    urls: []
                },
            }
        },
        methods: {
            selectChange(rows) {
                this.selectRows = rows;
                this.$emit('selection-change', rows);
            },
            objectGet(object, expression) {
                if (!(object && expression)) {
                    throw new Error('both object and expression args are required')
                }
                return expression.trim().split('.').reduce(function (prev, curr) {
                    let arr = curr.match(/(.*?)\[(.*?)\]/);
                    if (arr) {
                        return prev && prev[arr[1]][arr[2]]
                    }
                    else {
                        return prev && prev[curr]
                    }
                }, object)
            },
            dataFormat(row, data, bindings, dtype, format) {
                if (dtype && format) {
                    if (dtype === 'code' && bindings) {
                        if (bindings[format]) {
                            let flter = bindings[format].find((v) => {
                                return v.Value === this.objectGet(row, data)
                            });
                            return flter ? flter.Name : '';
                        }
                    } else if (dtype === 'dateTime') {
                        return moment(this.objectGet(row, data)).format(format);
                    }
                } else {
                    return this.objectGet(row, data);
                }
            },
            previewPic(picArr) {
                this.picDialog.urls = picArr.map((v) => {
                    return v.url;
                });
                this.$refs.bueImgView.Show();
            },
            // 导出
            Export(rows) {
                require.ensure([], () => {
                    const {exportJsonToExcel} = require('@/vendor/Export2Excel');
                    let ftCol = this.columns.filter((c) => {
                        return c.dtype !== 'image';
                    });
                    let tHeader = [], filterVal = [];
                    for (let col of ftCol) {
                        if (col.children) {
                            col.children.forEach((child) => {
                                tHeader.push(child.label);
                                filterVal.push({
                                    data: child.data,
                                    dtype: child.dtype,
                                    format: child.format
                                })
                            })
                        } else {
                            tHeader.push(col.label);
                            filterVal.push({
                                data: col.data,
                                dtype: col.dtype,
                                format: col.format
                            })
                        }
                    }
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
            },
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    .bue-table {
        height: 100%;
        position: relative;
        .el-table {
            position: absolute;
            height: 100%;
            left: 0;
            right: 0;
            th {
                background-color: #f0f3fa;
            }
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
        .img-box {
            position: absolute;
            width: 50px;
            height: 50px;
            left: 0;
            top: 0;
            z-index: 1;
            background-color: #ffffff;
            img {
                width: 50px;
                height: 50px;
            }
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