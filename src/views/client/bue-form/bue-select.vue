<template>
    <div class="demo-select">
        <bue-form ref="form" v-model="model">
            <el-row :gutter="20">

                <el-col :span="8">
                    <bue-form-item label="日志类型" prop="detail.type" required>
                        <bue-select v-model="model.detail.type" placeholder="请选择日志类型"
                                    :data="bindings.LogType" isArray multiple collapse-tags></bue-select>
                    </bue-form-item>
                </el-col>

            </el-row>
        </bue-form>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getLogType} from '@/api/log'
    import BueForm from '@/components/BueForm/BueForm';
    import BueFormItem from '@/components/BueForm/BueFormItem';
    import BueSelect from '@/components/BueSelect/BueSelect';

    export default {
        name: 'demo-select',
        components: {
            BueForm,
            BueFormItem,
            BueSelect
        },
        data() {
            return {
                model: {
                    detail: {
                        type: ''
                    }
                },
                bindings: {
                    LogType: []
                }
            }
        },
        methods: {
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
            }
        },
        created() {
            this.getTypes();
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    .demo-select{
        padding:25px;
    }
</style>