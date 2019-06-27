<template>
    <div class="bue-tree-demo">
        <h2 style="margin-bottom:10px;font-size:16px;border-bottom:solid 1px #eee;padding-bottom:15px;">
            继承el-tree所有的属性，方法，事件</h2>
        <bue-tree ref="bueTree" :api="api" :form-set="formSet" :before-delete="beforeDelete"
                  @node-append-active="appendHandle" @saved="savedHandle"
                  show-checkbox default-expand-all :expand-on-click-node="false">
            <template v-slot:treeForm="{model, isNew}">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <bue-form-item label="名称" prop="name" required>
                            <el-input v-model="model.name"></el-input>
                        </bue-form-item>
                    </el-col>
                    <el-col :span="12">
                        <bue-form-item label="类型" prop="type" required>
                            <bue-select v-model="model.type" placeholder="请选择类型" :data="bindings.types"></bue-select>
                        </bue-form-item>
                    </el-col>
                </el-row>
            </template>
        </bue-tree>
    </div>
</template>

<script type="text/ecmascript-6">
    import BueTree from '@/components/BueTree/BueTree';
    import BueFormItem from '@/components/BueForm/BueFormItem'
    import BueSelect from '@/components/BueSelect/BueSelect'
    import {getTreeData, addNode, editNode, deleteNode, moveNode} from '@/api/tree'

    const api = {
        query: () => {
            return new Promise((resolve) => {
                getTreeData().then((res) => {
                    resolve(res);
                })
            })

        },
        add: (model) => {
            return new Promise((resolve) => {
                addNode(model).then((res) => {
                    resolve(res);
                })
            })
        },
        edit: (model) => {
            return new Promise((resolve) => {
                editNode(model).then((res) => {
                    resolve(res);
                })
            })
        },
        delete: (nodeObj) => {
            return new Promise((resolve) => {
                deleteNode(nodeObj).then((res) => {
                    resolve(res);
                })
            })
        },
        move: (nodes) => {
            return new Promise((resolve) => {
                moveNode(nodes).then((res) => {
                    resolve(res);
                })
            })
        }
    };
    export default {
        name: 'bue-tree-demo',
        components: {
            BueTree,
            BueFormItem,
            BueSelect
        },
        data() {
            return {
                api: api,
                bindings: {
                    types: [
                        {Value: 1, Name: '可有子集'},
                        {Value: 0, Name: '无子集'}
                    ]
                }
            }
        },
        methods: {
            formSet(model, isNew) {
                if (isNew) {
                    this.$set(model, 'type', 0);
                }
                return model
            },
            appendHandle({node, data}) { //点击添加节点按钮时触发事件
                console.log(node);
                console.log(data);
            },
            savedHandle(node, isNew) { //添加成功后触发事件
                console.log(node);
            },
            beforeDelete(node, nodeObj) {
                if (nodeObj.children && nodeObj.children.length) {
                    this.$message({
                        type: 'error',
                        message: '禁止删除含有有子节点的节点',
                        showClose: true
                    });
                    return false
                } else {
                    return nodeObj
                }
            }
        },
        mounted() {
            this.$refs.bueTree.Query();
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    .bue-tree-demo {
        padding: 25px;
        min-width: 980px;
    }
</style>