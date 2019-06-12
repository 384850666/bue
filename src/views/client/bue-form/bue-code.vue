<template>
    <div class="demo-code">
        <bue-form ref="form" v-model="model">
            <el-row :gutter="20">

                <el-col :span="8">
                    <bue-form-item label="验证码" prop="code" :rules="[{validator: correctCode, trigger: 'blur'}]"
                                   required>
                        <bue-code v-model="model.code" :len="4" placeholder="请输入验证码" @onChange="onChange"></bue-code>
                    </bue-form-item>
                </el-col>

            </el-row>
        </bue-form>
    </div>
</template>

<script type="text/ecmascript-6">
    import BueForm from '@/components/BueForm/BueForm';
    import BueFormItem from '@/components/BueForm/BueFormItem';
    import BueCode from '@/components/BueCode/BueCode'

    export default {
        name: 'demo-code',
        components: {
            BueForm,
            BueFormItem,
            BueCode
        },
        data() {
            return {
                model: {
                    code: ''
                },
                code: ''
            }
        },
        methods: {
            onChange(code) { //code更新后执行事件
                this.code = code;
            },
            correctCode(rule, value, callback) {
                value.toLowerCase() === this.code.toLowerCase() ? callback() : callback(new Error('验证码错误'));
            }
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    .demo-code {
        padding: 25px;
    }
</style>