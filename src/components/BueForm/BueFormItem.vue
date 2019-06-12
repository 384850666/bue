<template>
    <div class="bue-form-item">
        <el-form-item ref="formItem" :label="label" :prop="prop" :label-width="labelW"
                      :rules="rule">
            <slot></slot>
        </el-form-item>
    </div>
</template>

<script type="text/ecmascript-6">
    import {isIdCardNo, checkIsPhone} from '@/common/js/validate';

    export default {
        name: 'bue-form-item',
        inject: ['FORM'],
        props: {
            label: {type: String, default: ''},
            prop: {type: String, default: ''},
            labelWidth: {type: String, default: ''},
            required: {type: Boolean, default: false},
            rules: {
                type: Array, default() {
                    return []
                }
            },
            type: {type: String, default: ''}
        },
        data() {
            return {
                message: this.required ? `${this.label}为必填字段` : ''
            }
        },
        computed: {
            labelW() {
                return this.labelWidth || this.FORM.labelWidth || '120px';
            },
            rule() {
                let rule = {};
                switch (this.type) {
                    case 'email':
                        rule = {type: 'email', message: '邮箱格式错误'};
                        break;
                    case 'number':
                        rule = {type: 'number', message: '请输入数字'};
                        break;
                    case 'integer':
                        rule = {type: 'integer', message: '请输入整数'};
                        break;
                    case 'url':
                        rule = {type: 'url', message: 'url格式错误'};
                        break;
                    case 'phone':
                        rule = {validator: this.isPhone};
                        break;
                    case 'idCard':
                        rule = {validator: this.isIdcard};
                        break;
                    default:
                        rule = {}
                }
                return Object.keys(rule).length !== 0 ? [...this.rules, {
                    required: this.required, message: this.message
                }, rule] : [...this.rules, {required: this.required, message: this.message}]
            }
        },
        methods: {
            isPhone(rule, value, callback) {
                checkIsPhone(value) ? callback() : callback(new Error('手机号格式错误'));
            },
            isIdcard(rule, value, callback) {
                isIdCardNo(value) ? callback() : callback(new Error('身份证号格式错误'));
            },
            ClearValidate() {
                this.$refs.formItem.clearValidate();
            }
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    .bue-form-item {
        & > .is-error {
            .bue-rich-editor .tox-tinymce{
                border: solid 1px #F56C6C;
            }
        }
        & > .is-success {
            .bue-rich-editor .tox-tinymce{
                border: solid 1px #67C23A;
            }
        }
    }
</style>