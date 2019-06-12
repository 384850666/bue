<template>
    <div class="bue-img-upload">
        <el-upload ref="uploadPic" :action="uploadUrl"
                   accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP"
                   list-type="picture-card"
                   :on-remove="onRemove" :limit="limit" :multiple="multiple"
                   :on-preview="onPreview"
                   :on-exceed="onExceed" :on-success="onSuccess" :file-list="picList">
            <i class="el-icon-plus"></i>
        </el-upload>
        <bue-img-view ref="bueImgView" :urls="preview.urls"></bue-img-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import BueImgView from '@/components/BueImgView/BueImgView';
    export default {
        name: 'bue-img-upload',
        components: {
            BueImgView
        },
        props: {
            value: {
                type: Array,
                default() {
                    return []
                }
            },
            multiple: {
                type: Boolean,
                default: false
            },
            limit: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                uploadUrl: 'https://easy-mock.com/mock/5cb838d699757c224ec96441/bue/upload',
                picList: this.value, //el-upload的file-list只读，只能定义常量
                pics: [],
                dict: {},
                preview: {
                    urls: ''
                },
            }
        },
        watch: {
            value: {
                immediate: true,
                deep: true,
                handler(v) {
                    this.pics = v;
                }
            },
            pics: {
                immediate: true,
                deep: true,
                handler(v) {
                    this.dict = {};
                    if (v.length) {
                        v.forEach((pic) => {
                            this.$set(this.dict, pic.url, pic.filename);
                        })
                    }
                }
            }
        },
        methods: {
            onSubmit(pics) {
                this.$emit('input', pics);
                this.$emit('change', pics);
            },
            onSuccess(response, file) {
                //文件上传成功后钩子
                this.getBase64(file.raw).then(base64String => {
                    const picData = {
                        filename: file.name,
                        url: file.url,
                        base64String,
                        type: file.raw.type,
                        size: file.raw.size
                    };
                    if (!this.multiple) {
                        this.onSubmit([picData]);
                    } else {
                        let pics = [...this.pics];
                        pics.push(picData);
                        this.onSubmit(pics);
                    }
                });
            },
            getBase64(file) {
                return new Promise(function (resolve, reject) {
                    let reader = new FileReader();
                    let imgResult = '';
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        imgResult = reader.result;
                    };
                    reader.onerror = function (error) {
                        reject(error);
                    };
                    reader.onloadend = function () {
                        resolve(imgResult);
                    };
                });
            },
            onExceed() {
                //超出限制上传个数钩子
                this.$message.error(`最多上传${this.limit}张图片!`);
            },
            onRemove(file) {
                //删除图片钩子
                let pics = [...this.pics];
                let i = pics.findIndex((v) => {
                    return v.url === file.url
                });
                pics.splice(i, 1);
                this.onSubmit(pics);
            },
            onPreview(file) {
                this.preview.urls = file.url;
                this.$refs.bueImgView.Show();
            }
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    .bue-img-upload {
        .el-upload--picture-card {
            width: 100px;
            height: 100px;
            line-height: 98px;
        }
        .el-upload-list--picture-card .el-upload-list__item {
            width: 100px;
            height: 100px;
        }
    }
</style>