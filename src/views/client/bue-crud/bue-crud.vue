<template>
    <bue-fixed-container>
        <div class="demo-crud">
            <bue-crud ref="bueCrud" :crudApi="crudApi" :handle="handle" :column-handel="columnHandel" :columns="columns"
                      :bindings="bindings" :rules="rules" :before-query="beforeQuery" :form-set="formSet"
                      :form-get="formGet"
                      :after-query="afterQuery" @queried="queriedHandle" :after-save="afterSave"
                      :before-delete="beforeDelete" file-name="安全日志" multiple>

                <!-- 标题 -->
                <template v-slot:crudTitle>BUE-CRUD</template>

                <!-- 扩展["create", "update", "multiDel", "export", "refresh"]以外操作 -->
                <!--<template v-slot:extendHandel>
                    <i class="operation-btn el-icon-plus" title="扩展" @click="extendFunction()"></i>
                </template>-->

                <!-- 过滤条件 -->
                <template v-slot:filterBox>
                    <el-form inline :model="params">
                        <el-form-item>
                            <el-input v-model="params.title" type="text" placeholder="标题"/>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="params.recorder" type="text" placeholder="记录人"></el-input>
                        </el-form-item>
                    </el-form>
                </template>

                <!-- 表格列插槽 -->
                <!--<template v-slot:detail.pics="{row}">
                    <span>{{row['detail']['pics']}}</span>
                </template>-->
                <template v-slot:status="{row,format}">
                    <span v-if="row.status === 1" class="open"><i class="iconfont iconchenggong"></i>{{format}}</span>
                    <span v-else class="close"><i class="iconfont iconerror"></i>{{format}}</span>
                </template>

                <!-- 表单项插槽 -->
                <template v-slot:crudForm="{model,isNew}">
                    <el-row :gutter="20">

                        <el-col :span="12">
                            <el-form-item label="标题" prop="title" label-width="120px"
                                          :rules="{required: true, message: '请输入标题'}">
                                <el-input v-model="model.title" placeholder="请输入标题"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="记录人" prop="recorder" label-width="120px"
                                          :rules="{required: true, message: '请输入记录人'}">
                                <el-input v-model="model.recorder" placeholder="请输入记录人"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="日志类型" prop="detail.type" label-width="120px"
                                          :rules="{required: true, message: '请选择日志类型', trigger: ['blur', 'change']}">
                                <el-select v-model="model.detail.type" placeholder="请选择日志类型">
                                    <el-option label="安全日志" :value="0"></el-option>
                                    <el-option label="登录日志" :value="1"></el-option>
                                    <el-option label="登出日志" :value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="启用" prop="status" label-width="120px">
                                <el-switch v-model="model.status" :active-value="1" :inactive-value="0"></el-switch>
                            </el-form-item>
                        </el-col>

                        <el-col :span="24">
                            <el-form-item label="内容" prop="content" label-width="120px"
                                          :rules="{required: true, message: '请输入内容'}">
                                <el-input type="textarea" rows="5" v-model="model.content" placeholder="请输入内容"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="24">
                            <el-form-item label="图片" prop="pics" label-width="120px"
                                          :rules="{required: true, message: '至少上传1张图片', trigger: 'change'}"
                                          ref="picsFormItem">
                                <bue-img-upload v-model="model.pics" multiple :limit="9"
                                                @change="picsChange"></bue-img-upload>
                            </el-form-item>
                        </el-col>

                    </el-row>
                </template>

            </bue-crud>
        </div>
    </bue-fixed-container>
</template>

<script type="text/ecmascript-6">
    import BueFixedContainer from '@/components/BueFixedContainer/BueFixedContainer'
    import BueCrud from '@/components/BueCrud/BueCrud'
    import BueImgUpload from '@/components/BueImgUpload/BueImgUpload'
    import {getLog, createLog, updateLog, deleteLog, checkStatus} from '@/api/log'

    const crudApi = {
        query: (params) => {
            return new Promise((resolve) => {
                resolve(getLog(params));
            })
        },
        create: (model) => {
            return new Promise((resolve) => {
                resolve(createLog(model));
            })
            /*createLog(model).then((response) => {
                return new Promise((resolve, reject) => {
                    resolve(response);
                })
            })*/
        },
        update: (model) => {
            return new Promise((resolve) => {
                resolve(updateLog(model));
            })
        },
        delete: (model) => {
            return new Promise((resolve) => {
                resolve(deleteLog(model));
            })
        }
    };
    export default {
        name: 'demo-crud',
        components: {
            BueFixedContainer,
            BueCrud,
            BueImgUpload
        },
        data() {
            return {
                crudApi: crudApi,
                handle: ["create", "update", "multiDel", "export", "refresh"], //默认值：增/改/删/导出/更新
                columnHandel: ["update", "del"],
                columns: [
                    {data: "pics", label: "图片", dtype: 'image'},
                    {data: "title", label: "标题"},
                    {data: "createTime", label: "创建时间", width: 200, dtype: 'dateTime', format: 'YYYY-MM-DD HH:mm:ss'},
                    {data: "updateTime", label: "更新时间", width: 200, dtype: 'dateTime', format: 'YYYY-MM-DD HH:mm:ss'},
                    {data: "recorder", label: "记录人"},
                    {data: "detail.type", label: "日志类型", dtype: 'code', format: 'LogType'},
                    {data: "status", label: "状态", width: 80, dtype: 'code', format: 'Status'},
                    {data: "content", label: "日志内容", nowrap: true}
                ],
                params: {title: "", recorder: ""},
                rules: {},
                bindings: {
                    Status: [
                        {Name: "停用", Value: 0},
                        {Name: "启用", Value: 1},
                    ],
                    LogType: [
                        {Name: "安全日志", Value: 0},
                        {Name: "登录日志", Value: 1},
                        {Name: "登出日志", Value: 2}
                    ]
                }
            }
        },
        mounted() {
            this.$refs.bueCrud.Query();
        },
        methods: {
            beforeQuery(params) {
                this.params.title && params.conditions.push({
                    Field: "title", Value: this.params.title, Operate: "like", Relation: "and"
                });
                this.params.recorder && params.conditions.push({
                    Field: "recorder", Value: this.params.recorder, Operate: "like", Relation: "and"
                });
                params.order = [{order: 1}];
                return params;
            },
            afterQuery(response) {
                // console.log('查询后触发,在此处修改查询结果');
                /*for (let v of response.list) {
                    v.createTime = moment(v.createTime).format('YYYY-MM-DD HH:mm:ss');
                    v.status = this.dataFormat(v.status,this.bindings.status);
                }*/
                return response;
            },
            queriedHandle(obj) {
                console.log(obj);
            },
            formSet(model, isNew) { //行数据与表单数据的转换，如在使用el日期控件时，不能直接使用时间戳，需要转换成Date或者字符串；还有新增的默认值设置
                if (isNew) {
                    this.$set(model, 'status', 1);
                    this.$set(model, 'detail', {});
                    this.$set(model['detail'], 'type', 0);
                }
                return model;
            },
            formGet(model) { //表单数据与请求保存数据的转换，如在使用el日期控件，保存为时间戳的情况
                return model;
            },
            afterSave(response) {
                console.log('保存数据操作成功后触发,可在此处修改接口返回数据');
                return response;
            },
            beforeDelete(rows) { //数据删除的确认，也可用页面数据与请求删除数据的转换,参数：待删除的数据数组
                return new Promise((resolve, reject) => {
                    checkStatus(rows).then((res) => {
                        if (!res.total) {
                            this.$message({
                                type: 'error',
                                message: '存在数据不允许被删除',
                                showClose: true
                            });
                            reject();
                        } else {
                            resolve(rows);
                        }
                    }).catch(() => {
                        reject();
                    })
                })
            },
            picsChange(pics) {
                if (pics.length) {
                    this.$refs.picsFormItem.clearValidate();
                }
            }
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    .demo-crud {
        width: 100%;
        height: 100%;
        padding: 25px 25px;
        .open {
            color: #67C23A;
        }
        .close {
            color: #F56C6C;
        }
        .open i {
            color: #67C23A;
            margin-right: 5px;
        }
        .close i {
            color: #F56C6C;
            margin-right: 5px;
        }
    }
</style>