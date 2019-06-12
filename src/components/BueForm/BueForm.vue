<template>
    <div class="bue-form">
        <el-form ref="elform" :model="model" v-bind="$attrs" v-on="$listeners">
            <slot></slot>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    const DO_EL_FOEM_METHOD = (vm, act, ...args) => {
        if (vm.$refs.elform && typeof vm.$refs.elform[act] === "function") {
            return vm.$refs.elform[act](...args);
        }
    };
    export default {
        name: 'bue-form',
        provide() {
            return {
                FORM: this
            }
        },
        inheritAttrs: false,
        props: {
            value: {
                type: Object,
                default() {
                    return null
                }
            },
            labelWidth: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                model: {}
            }
        },
        watch: {
            value: {
                immediate: true, deep: true,
                handler(v) {
                    this.model = v;
                }
            },
            model: {
                immediate: true, deep: true,
                handler(v) {
                    this.$emit('input', v);
                }
            }
        },
        methods: {
            validate(...args) {
                DO_EL_FOEM_METHOD(this, 'validate', ...args);
            },
            validateField(...args) {
                DO_EL_FOEM_METHOD(this, 'validateField', ...args);
            },
            resetFields(...args) {
                DO_EL_FOEM_METHOD(this, 'resetFields', ...args);
            },
            clearValidate(...args) {
                DO_EL_FOEM_METHOD(this, 'clearValidate', ...args);
            }
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>