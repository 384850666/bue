<template>
    <div class="demo-img-upload">
        <bue-form ref="form" v-model="model">
            <el-row :gutter="20">

                <el-col :span="24">
                    <bue-form-item label="图片" prop="pics" label-width="120px"
                                   :rules="[{required: true, message: '至少上传1张图片', trigger: 'change'}]"
                                   ref="picsFormItem">
                        <bue-img-upload v-model="model.pics" multiple :limit="9" @change="picsChange"></bue-img-upload>
                    </bue-form-item>
                </el-col>

            </el-row>
        </bue-form>
    </div>
</template>

<script type="text/ecmascript-6">
    import BueForm from '@/components/BueForm/BueForm';
    import BueFormItem from '@/components/BueForm/BueFormItem';
    import BueImgUpload from '@/components/BueImgUpload/BueImgUpload'

    export default {
        name: 'demo-img-upload',
        components: {
            BueForm,
            BueFormItem,
            BueImgUpload
        },
        data() {
            return {
                model: {
                    pics: []
                }
            }
        },
        methods: {
            picsChange(pics) {
                if (pics.length) {
                    this.$refs.picsFormItem.ClearValidate();
                }
            },
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    .demo-img-upload {
        padding: 25px;
    }
</style>