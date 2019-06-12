<template>
    <div class="bue-rich-editor" :class="{'is-focus' : focus}">
        <editor :id="id" v-model="richEditor" :init="initOpts" :key="flag" @onFocus="focus = true"
                @onBlur="onBlur" v-on="$listeners"></editor>
    </div>
</template>

<script type="text/ecmascript-6">
    // import tinymce from 'tinymce/tinymce.min.js'
    import 'tinymce/tinymce.min.js'
    import 'tinymce/themes/silver/theme'
    import Editor from '@tinymce/tinymce-vue'

    // plugins
    import "tinymce/plugins/image";
    import "tinymce/plugins/link";
    // import "tinymce/plugins/code";
    // import "tinymce/plugins/table";
    import "tinymce/plugins/lists";
    import "tinymce/plugins/preview";
    import "tinymce/plugins/fullscreen";
    import 'tinymce/plugins/code';
    import 'tinymce/plugins/table';
    // import "./langs/zh_CN";

    export default {
        name: 'bue-rich-editor',
        components: {
            Editor
        },
        inheritAttrs: false,
        props: {
            value: {
                type: String,
                default: ''
            },
            disable: {
                type: Boolean,
                default: false
            },
            init: {
                type: Object,
                default() {
                    return null
                }
            },
        },
        data() {
            return {
                id: String(new Date().getTime()), //绑定动态id，解决keep-alive以后路由切换时tinymce编辑器显示异常问题
                flag: 1, //解决keep-alive以后路由切换时tinymce编辑器显示异常问题
                focus: false,
                richEditor: '',
                defaultInit: {
                    language_url: '/tinymce/langs/zh_CN.js',
                    language: 'zh_CN',
                    skin_url: '/tinymce/skins/ui/oxide',
                    height: 200,
                    plugins: 'link lists image preview fullscreen code table',
                    // plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
                    toolbar: 'fontselect fontsizeselect forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | imageUpload quicklink h2 h3 blockquote outdent indent numlist bullist table | link unlink image code | undo redo removeformat preview fullscreen',
                    // toolbar: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
                    branding: false, //去水印
                    resize: false,  //禁用缩放
                    relative_urls: false,
                    statusbar: false, // 隐藏编辑器底部的状态栏
                    // paste_data_images: true, // 允许粘贴图像
                    menubar: false, // 隐藏最上方menu
                    // elementpath: false, //禁用编辑器底部的状态栏
                    images_upload_handler: (blobInfo, success, failure) => {
                        let formData = new FormData();
                        formData.append('upload_file', blobInfo.blob(), blobInfo.filename());
                        this.$axios.post('https://easy-mock.com/mock/5cb838d699757c224ec96441/bue/upload', formData).then((res) => {
                            let data = res.data;
                            if (data.code === 0) {
                                success(data.data.url);
                            }
                        }).catch((err) => {
                            failure(err);
                        });
                    }
                }
            }
        },
        computed: {
            initOpts() {
                if (!this.init) {
                    return this.defaultInit
                } else {
                    return {...this.defaultInit, ...this.init}
                }
            }
        },
        watch: {
            value: {
                immediate: true, deep: true,
                handler(v) {
                    this.richEditor = v
                }
            },
            richEditor: {
                immediate: true, deep: true,
                handler(v) {
                    this.$emit('input', v);
                }
            }
        },
        mounted() {
            // tinymce.init({});
        },
        activated() {
            this.flag += 1;
        },
        methods: {
            onBlur() {
                this.focus = false;
            }
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    .bue-rich-editor {
        &:hover > .tox-tinymce {
            border: solid 1px #aeaeae;
        }
        &.is-focus > .tox-tinymce {
            border: solid 1px #409EFF;
        }
    }
</style>