<template>
    <div class="bue-select">
        <el-select ref="select" v-model="model" :placeholder="placeholder" :multiple="multiple" v-bind="$attrs"
                   v-on="$listeners">

            <el-option v-for="option in data" :key="option.Value | str" :label="option.Name" :value="option.Value | str"
                       :disabled="option.Disabled"></el-option>

        </el-select>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'bue-select',
        inheritAttrs: false,
        props: {
            value: {
                type: [String, Array, Number],
                default: ''
            },
            data: {
                type: Array,
                default() {
                    return []
                }
            },
            placeholder: {
                type: String,
                default: ''
            },
            isArray: { //值输出是否为数组，多选时有效
                type: Boolean,
                default: false
            },
            multiple: {
                type: Boolean,
                default: false
            }
        },
        filters: {
            str(v){
                return String(v);
            }
        },
        data() {
            return {
                model: null
            }
        },
        watch: {
            value: {
                immediate: true, deep: true,
                handler(v, ov){
                    if(v === ov || JSON.stringify(v) === JSON.stringify(ov)) { //防止死循环
                        return;
                    }
                    if(this.multiple){
                        if(Array.isArray(v)){
                            this.model = v.map((val) => {
                                return String(val);
                            });
                        }
                        else if(typeof v === "string"){
                            this.model = v ? v.split(",") : [];
                        }
                        else{
                            this.model = [];
                        }
                    }
                    else{
                        if(typeof v === "number"){
                            this.model = String(v);
                        }
                        else{
                            this.model = v;
                        }
                    }
                }
            },
            model: {
                immediate: true, deep: true,
                handler(v){
                    let value = v;
                    if(this.multiple){
                        if(this.isArray){
                            value = v;
                        }
                        else{
                            value = v.length === 0 ? null : v.join(",");
                        }
                    }
                    else{
                        if(!v){
                            value = '';
                        }
                        else{
                            value = v;
                        }
                    }
                    this.$emit("input", value);
                }
            }
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    .bue-select {
        .el-select {
            display: block;
        }
    }
</style>