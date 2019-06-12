<template>
    <div class="demo-rich-editor">
        <!--<el-form ref="form" :model="model">
            <el-row :gutter="20">

                <el-col :span="24">
                    <bue-form-item label="富文本框" prop="editor" required>
                        <bue-rich-editor v-model="model.editor" placeholder="请输入内容" @onBlur="onBlur"></bue-rich-editor>
                    </bue-form-item>
                </el-col>

            </el-row>
        </el-form>-->
        <bue-form ref="form" v-model="model">
            <el-row :gutter="20">

                <el-col :span="24">
                    <bue-form-item label="富文本框" prop="editor" required>
                        <bue-rich-editor v-model="model.editor" placeholder="请输入内容" @onBlur="onBlur"></bue-rich-editor>
                    </bue-form-item>
                </el-col>

            </el-row>
        </bue-form>

    </div>
</template>

<script type="text/ecmascript-6">
    import BueRichEditor from '@/components/BueRichEditor/BueRichEditor'
    import BueForm from '@/components/BueForm/BueForm';
    import BueFormItem from '@/components/BueForm/BueFormItem';

    export default {
        name: 'demo-rich-editor',
        components: {
            BueRichEditor,
            BueForm,
            BueFormItem
        },
        data() {
            return {
                model: {
                    editor: ''
                }
            }
        },
        methods: {
            onBlur() { //富文本框支取焦点触发验证
                this.$refs.form.validateField('editor')
            }
        },
        mounted() {
            console.info(this.$refs.form);
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    .demo-rich-editor{
        padding: 25px;
    }
</style>