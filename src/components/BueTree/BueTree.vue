<template>
    <div class="bue-tree" v-loading="loading">
        <div class="custom-tree-container">
            <el-tree ref="eltree" :data="data" v-loading.fullscreen.lock="saving" v-bind="$attrs" v-on="$listeners">
                <div class="custom-tree-node" slot-scope="{node, data}">
                    <slot name="nodeInfo" :node="node" :data="data">
                        <span>{{ data.name }}</span>
                    </slot>
                    <span>
                    <slot name="nodeHandle" :node="node" :data="data">
                        <el-button v-if="!!data.type" type="success" size="mini" icon="el-icon-plus"
                                   @click="() => appendNode(node, data)"></el-button>
                        <el-button type="primary" size="mini" icon="el-icon-edit"
                                   @click="() => editNode(node, data)"></el-button>
                        <el-button type="warning" size="mini" icon="el-icon-right"
                                   @click="() => moveNode(node, data)"></el-button>
                        <el-button type="danger" size="mini" icon="el-icon-delete"
                                   @click="() => deleteNode(node, data)"></el-button>
                    </slot>

                </span>
                </div>
            </el-tree>
        </div>
        <el-dialog ref="buetreeDialog" :title="dialog.isNew ? '新增':'修改'" :visible.sync="dialog.visible"
                   custom-class="bue-tree-dialog" :close-on-click-modal="false" append-to-body
                   @closed="dialog.closed = true"
                   @open="dialog.closed = false">

            <bue-form v-if="!dialog.closed" ref="bueTreeForm" v-model="model" :label-width="formLabelWidth">
                <slot name="treeForm" :model="model" :is-new="dialog.isNew">
                </slot>
            </bue-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog ref="bueMoveDialog" title="移动" :visible.sync="moveDialog.visible"
                   custom-class="bue-tree-dialog" :close-on-click-modal="false" append-to-body
                   @closed="moveDialog.closed = true"
                   @open="moveDialog.closed = false">

            <bue-form v-if="!moveDialog.closed" ref="treeForm" v-model="moveModel" :label-width="formLabelWidth">
                <el-row :gutter="20">
                    <el-col :span="24">
                        <bue-form-item label="移动至" prop="node" required>
                            <el-cascader v-model="moveModel.node" :options="options" :props="{ checkStrictly: true }"
                                         clearable></el-cascader>
                        </bue-form-item>
                    </el-col>
                </el-row>
            </bue-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="moveDialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script type="text/ecmascript-6">
    import BueForm from '@/components/BueForm/BueForm'
    import BueFormItem from '@/components/BueForm/BueFormItem'

    const DO_EL_TREE_METHOD = (vm, act, ...args) => {
        if (vm.$refs.eltree && typeof vm.$refs.eltree[act] === "function") {
            return vm.$refs.eltree[act](...args);
        }
    };

    export default {
        name: 'bue-tree',
        inheritAttrs: false,
        components: {
            BueForm,
            BueFormItem
        },
        props: {
            api: {
                type: Object,
                default() {
                    return null
                }
            },
            formLabelWidth: {
                type: String,
                default: ''
            },
            formSet: { //表单初始化钩子
                type: Function,
                default: null
            },
            afterSave: { //提交数据成功后的钩子,用于修改渲染内容
                type: Function,
                default: null
            },
            beforeDelete: {
                type: Function,
                default: null
            },
            afterDelete: {
                type: Function,
                default: null
            }
        },
        data() {
            return {
                data: [],
                options: [],
                loading: false,
                saving: false,
                dialog: {
                    isNew: false,
                    visible: false,
                    closed: true
                },
                moveDialog: {
                    visible: false,
                    closed: true
                },
                model: {},
                moveModel: {
                    node: []
                },
                current: {}
            }
        },
        methods: {
            Query() {
                this.data = [];
                this.loading = true;
                this.api.query().then((res) => {
                    this.loading = false;
                    this.data = res.data;
                    this.$emit('queried', this.data)
                })
            },
            initCascader() {
                return new Promise((resolve) => {
                    this.options = [];
                    this.api.query().then((res) => {
                        resolve(res);
                    })
                });
            },
            formatData(data) {
                return data.map((v) => {
                    const haveChildren = Array.isArray(v.children) && v.children.length > 0;
                    return {
                        value: v.id,
                        label: v.name,
                        type: v.type,
                        children: haveChildren ? this.formatData(v.children) : undefined
                    };

                });
            },
            appendNode(node, data) {
                this.dialog.isNew = true;
                this.dialog.visible = true;
                this.$set(this, 'model', {});
                if (typeof this.formSet === 'function') {
                    this.model = this.formSet(this.model, this.dialog.isNew);
                }
                this.current = {node, data};
                this.$emit('node-append-active', this.current)
            },
            editNode(node, data) {
                this.dialog.isNew = false;
                this.dialog.visible = true;
                this.$set(this, 'model', JSON.parse(JSON.stringify(data)));
                if (typeof this.formSet === 'function') {
                    this.model = this.formSet(this.model, this.dialog.isNew);
                }
                this.current = {node, data};
                this.$emit('node-append-active', this.current)
            },
            deleteNode(node, data) {
                let nodeData = JSON.parse(JSON.stringify(data));

                let success = (res) => {
                    this.saving = false;

                    if (typeof this.afterDelete === 'function') {
                        res = this.afterDelete(res);
                        if (res === false) {
                            return
                        }
                    }

                    const parent = node.parent;
                    const children = parent.data.children || parent.data;
                    const index = children.findIndex(d => d.id === data.id);
                    children.splice(index, 1);

                    this.$message({
                        type: 'success',
                        message: '删除成功',
                        showClose: true
                    });
                    this.$emit('deleted', res);
                };
                let fail = () => {
                    this.saving = false;
                };
                let next = (nodeData) => {
                    this.$confirm('您将删除这条记录，是否继续？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(() => {
                        this.saving = true;
                        this.api.delete(nodeData).then(success).catch(fail);
                    }).catch(() => {

                    })
                };

                if (typeof this.beforeDelete === 'function') {
                    let flag = this.beforeDelete(node, nodeData);
                    if (flag === false) {
                        console.log('终止删除')
                    } else if (flag instanceof Promise) {
                        flag().then((r) => {
                            next(r);
                        })
                    } else {
                        next(flag);
                    }
                } else {
                    next(nodeData);
                }

            },
            moveNode(node, data) {
                this.initCascader().then((res) => {
                    this.options = this.formatData(res.data);
                    this.moveDialog.visible = true;
                    this.current = {node, data};
                })
                /*let success = (res) => {
                    this.saving = false;
                    this.$message({
                        type: 'success',
                        message: '移动成功',
                        showClose: true
                    });
                };
                let fail = () => {
                    this.saving = false;
                };

                this.saving = true;
                this.api.move(nodes).then(success).catch(fail);*/
            },
            confirm() {
                this.$refs.bueTreeForm.validate((pass) => {
                    if (pass) {
                        this.saving = true;
                        let id = this.current.data.id;
                        let params = {id, ...this.model};
                        let isNew = this.dialog.isNew;
                        this.onSave(params, isNew);
                    }
                })

            },
            onSave(params, isNew) {
                let success = (res) => {
                    this.dialog.visible = false;

                    if (typeof this.afterSave === 'function') {
                        res = this.afterSave(res, isNew);
                        if (res === false) {
                            this.saving = false;
                            return
                        }
                    }

                    if (isNew) {
                        this.insertNode(res);
                    } else {
                        this.updateNode(res);
                    }

                    this.saving = false;
                    this.$emit('saved', res, isNew);

                    this.$message({
                        type: 'success',
                        message: `${isNew ? '新增' : '修改'}成功`,
                        showClose: true
                    })
                };
                let fail = (err) => {

                };
                this.api[isNew ? 'add' : 'edit'](params).then(success).catch(fail);
            },
            insertNode(res) {
                const newChild = {id: res.id, name: res.name, type: res.type, children: []};
                if (!this.current.data.children) {
                    this.$set(this.current.data, 'children', []);
                }
                this.current.data.children.push(newChild);
            },
            updateNode({name, type}) {
                this.current.data.name = name;
                this.current.data.type = type;
            },

            filter(...args) {
                DO_EL_TREE_METHOD(this, 'filter', ...args);
            },
            updateKeyChildren(...args) {
                DO_EL_TREE_METHOD(this, 'updateKeyChildren', ...args);
            },
            getCheckedNodes(...args) {
                DO_EL_TREE_METHOD(this, 'getCheckedNodes', ...args);
            },
            setCheckedNodes(...args) {
                DO_EL_TREE_METHOD(this, 'setCheckedNodes', ...args);
            },
            getCheckedKeys(...args) {
                DO_EL_TREE_METHOD(this, 'getCheckedKeys', ...args);
            },
            setCheckedKeys(...args) {
                DO_EL_TREE_METHOD(this, 'setCheckedKeys', ...args);
            },
            setChecked(...args) {
                DO_EL_TREE_METHOD(this, 'setChecked', ...args);
            },
            getHalfCheckedNodes(...args) {
                DO_EL_TREE_METHOD(this, 'getHalfCheckedNodes', ...args);
            },
            getHalfCheckedKeys(...args) {
                DO_EL_TREE_METHOD(this, 'getHalfCheckedKeys', ...args);
            },
            getCurrentKey(...args) {
                DO_EL_TREE_METHOD(this, 'getCurrentKey', ...args);
            },
            getCurrentNode(...args) {
                DO_EL_TREE_METHOD(this, 'getCurrentNode', ...args);
            },
            setCurrentKey(...args) {
                DO_EL_TREE_METHOD(this, 'setCurrentKey', ...args);
            },
            setCurrentNode(...args) {
                DO_EL_TREE_METHOD(this, 'setCurrentNode', ...args);
            },
            getNode(...args) {
                DO_EL_TREE_METHOD(this, 'getNode', ...args);
            },
            remove(...args) {
                DO_EL_TREE_METHOD(this, 'remove', ...args);
            },
            append(...args) {
                DO_EL_TREE_METHOD(this, 'append', ...args);
            },
            insertBefore(...args) {
                DO_EL_TREE_METHOD(this, 'insertBefore', ...args);
            },
            insertAfter(...args) {
                DO_EL_TREE_METHOD(this, 'insertAfter', ...args);
            },
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    .bue-tree {
        .custom-tree-container {
            .el-tree {
                .el-tree-node {
                    .el-tree-node__content {
                        height: 40px;
                    }
                }
            }
            .custom-tree-node {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 14px;
                padding-right: 8px;
            }
        }
    }

    .bue-tree-dialog {
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
</style>