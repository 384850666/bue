<template>
    <div class="left-bar">
        <el-scrollbar wrap-style="">
            <Submenu :submenu-items="submenuItems">
            </Submenu>
        </el-scrollbar>
    </div>
</template>

<script type="text/ecmascript-6">
    import Submenu from '@/components/Submenu.vue'

    export default {
        name: 'left-bar',
        components: {
            Submenu
        },
        data() {
            return {
                submenuItems: [
                    {
                        tag: 'li',
                        text: 'Homepage',
                        icon: 'iconfont iconhome',
                        link: '/client/homepage'
                    },
                    {
                        tag: 'li',
                        text: 'BueCrud',
                        icon: 'iconfont iconquanxiankuaizhuang',
                        link: '/client/bue-crud'
                    },
                    {
                        tag: 'li',
                        text: 'BueTable',
                        icon: 'iconfont iconzhibiaojihua',
                        link: '/client/bue-table'
                    },
                    {
                        tag: 'li',
                        text: 'BueForm',
                        icon: 'iconfont iconqiye-tianchong',
                        link: '/client/bue-form',
                        children: [
                            {
                                tag: 'li',
                                text: 'BueFormItem',
                                icon: 'iconfont iconzhibiaojihua',
                                link: '/client/bue-form/bue-form-item'
                            },
                            {
                                tag: 'li',
                                text: 'BueSelect',
                                icon: 'iconfont iconquanxiankuaizhuang',
                                link: '/client/bue-form/bue-select',
                            },
                            {
                                tag: 'li',
                                text: 'BueImgUpload',
                                icon: 'iconfont iconzhibiaojihua',
                                link: '/client/bue-form/bue-img-upload'
                            },
                            {
                                tag: 'li',
                                text: 'BueFileUpload',
                                icon: 'iconfont iconzhibiaojihua',
                                link: '/client/bue-form/bue-file-upload'
                            },
                            {
                                tag: 'li',
                                text: 'BueCode',
                                icon: 'iconfont iconqiye-tianchong',
                                link: '/client/bue-form/bue-code'
                            },
                            {
                                tag: 'li',
                                text: 'BueRichEditor',
                                icon: 'iconfont iconquanxiankuaizhuang',
                                link: '/client/bue-form/bue-rich-editor'
                            }
                        ]
                    },
                    {
                        tag: 'li',
                        text: 'BueTree',
                        icon: 'iconfont iconquanxiankuaizhuang',
                        link: '/client/bue-tree'
                    },
                    /*{
                        tag: 'li',
                        text: '待定组件4',
                        icon: 'iconfont iconmeiyuanqianbao',
                        link: '/client/examine'
                    },
                    {
                        tag: 'li',
                        text: '待定组件5',
                        icon: 'iconfont icontongji',
                        link: '/client/analysis'
                    },
                    {
                        tag: 'li',
                        text: '待定组件6',
                        icon: 'iconfont iconrizhi',
                        link: '/client/log'
                    }*/
                ]
            }
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .left-bar {
        width: 250px;
        position: absolute;
        left: 0;
        top: 65px;
        bottom: 0;
        background: #1a1a1a ;
        padding-top: 40px;
        .el-scrollbar{
            position:absolute;
            top:40px;
            bottom:0;
            left:0;
            right:0;
        }
    }
</style>