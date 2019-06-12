<template>
    <div class="demo-form-item">
        <bue-form ref="form" v-model="model">
            <el-row :gutter="20">

                <el-col :span="8">
                    <bue-form-item label="标题" prop="title" required>
                        <el-input v-model="model.title" placeholder="请输入标题"></el-input>
                    </bue-form-item>
                </el-col>

                <el-col :span="8">
                    <bue-form-item label="记录人" prop="recorder" required>
                        <el-input v-model="model.recorder" placeholder="请输入记录人"></el-input>
                    </bue-form-item>
                </el-col>

                <el-col :span="8">
                    <bue-form-item label="手机号" prop="phone" type="phone" required>
                        <el-input v-model="model.phone" placeholder="请输入手机号"></el-input>
                    </bue-form-item>
                </el-col>

                <el-col :span="8">
                    <bue-form-item label="邮箱" prop="email" type="email" required>
                        <el-input v-model="model.email" placeholder="请输入邮箱"></el-input>
                    </bue-form-item>
                </el-col>

                <el-col :span="8">
                    <bue-form-item label="身份证" prop="idCard" type="idCard" required>
                        <el-input v-model="model.idCard" placeholder="请输入身份证"></el-input>
                    </bue-form-item>
                </el-col>

                <el-col :span="8">
                    <bue-form-item label="年龄" prop="age" type="integer" required>
                        <el-input v-model.number="model.age" placeholder="请输入年龄"></el-input>
                    </bue-form-item>
                </el-col>

                <el-col :span="8">
                    <bue-form-item label="博客" prop="blog" type="url" required>
                        <el-input v-model="model.blog" placeholder="请输入博客"></el-input>
                    </bue-form-item>
                </el-col>

                <el-col :span="8">
                    <bue-form-item label="日志类型" prop="detail.type" required>
                        <bue-select v-model="model.detail.type" placeholder="请选择日志类型"
                                    :data="bindings.LogType"></bue-select><!-- isArray multiple collapse-tags -->
                    </bue-form-item>
                </el-col>

                <el-col :span="8">
                    <bue-form-item label="启用" prop="status">
                        <el-switch v-model="model.status" :active-value="1" :inactive-value="0"></el-switch>
                    </bue-form-item>
                </el-col>

                <el-col :span="24">
                    <bue-form-item label="内容" prop="content">
                        <el-input type="textarea" rows="5" v-model="model.content" placeholder="请输入内容"></el-input>
                    </bue-form-item>
                </el-col>

                <el-col :span="24">
                    <bue-form-item label="图片" prop="pics"
                                   :rules="[{required: true, message: '至少上传1张图片', trigger: 'change'}]"
                                   ref="picsFormItem">
                        <bue-img-upload v-model="model.pics" multiple :limit="9" @change="picsChange"/>
                    </bue-form-item>
                </el-col>

                <el-col :span="8">
                    <bue-form-item label="验证码" prop="code" :rules="[{validator: correctCode, trigger: 'blur'}]"
                                   required>
                        <bue-code v-model="model.code" :len="4" placeholder="请输入验证码" @onChange="onChange"></bue-code>
                    </bue-form-item>
                </el-col>

                <el-col :span="24">
                    <bue-form-item label="富文本框" prop="editor" required>
                        <bue-rich-editor v-model="model.editor" placeholder="请输入内容" @onBlur="onBlur"></bue-rich-editor>
                    </bue-form-item>
                </el-col>

            </el-row>
        </bue-form>

        <div class="btn-group">
            <el-button @click="reset">重置</el-button>
            <el-button type="primary" @click="confirm">提交</el-button>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {getLogType} from '@/api/log'
    import BueForm from '@/components/BueForm/BueForm'
    import BueFormItem from '@/components/BueForm/BueFormItem'
    import BueSelect from '@/components/BueSelect/BueSelect'
    import BueImgUpload from '@/components/BueImgUpload/BueImgUpload'
    import BueCode from '@/components/BueCode/BueCode'
    import BueRichEditor from '@/components/BueRichEditor/BueRichEditor'

    export default {
        name: 'demo-form-item',
        components: {
            BueForm,
            BueFormItem,
            BueSelect,
            BueImgUpload,
            BueCode,
            BueRichEditor
        },
        data() {
            return {
                model: {
                    title: '',
                    recorder: '',
                    phone: '',
                    email: '',
                    idCard: '',
                    age: '',
                    blog: '',
                    detail: {
                        type: 0
                    },
                    status: 0,
                    content: '',
                    pics: [],
                    code: ''
                },
                bindings: {
                    LogType: []
                },
                code: '',
                editor: ''
            }
        },
        methods: {
            confirm() {
                this.$refs.form.validate((vaild) => {
                    if (vaild) {
                        alert('验证成功');
                    }
                })
            },
            reset() {
                this.$refs.form.resetFields();
            },
            picsChange(pics) {
                if (pics.length) {
                    this.$refs.picsFormItem.ClearValidate();
                }
            },
            async getTypes() {
                getLogType().then((res) => {
                    let typeList = res.typeList;
                    this.bindings.LogType = typeList.map((v) => {
                        return {
                            Value: v.type,
                            Name: v.name
                        }
                    });
                })
            },
            onChange(code) { //code更新后执行事件
                this.code = code;
            },
            correctCode(rule, value, callback) {
                value.toLowerCase() === this.code.toLowerCase() ? callback() : callback(new Error('验证码错误'));
            },
            onBlur() { //富文本框支取焦点触发验证
                this.$refs.form.validateField('editor')
            }
        },
        created() {
            this.getTypes();
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    .demo-form-item {
        padding: 25px;
        .btn-group {
            padding-left: 120px;
        }
    }
</style>