<template>
    <div class="vheader">
        <div class="left-container">
            <img class="logo" src="../../../assets/logo.png" alt="">
            <!--<h4 class="app-name">北仑区岗位津贴管理系统</h4>-->
            <h4 class="app-name">BUE</h4>
        </div>
        <div class="right-container">
            <span>
                <i class="iconfont icongeren"></i>
                <span>欢迎您，{{user.companyName}} <span class="type">（操作人员）</span></span>
            </span>
            <span>
                <i class="iconfont iconpeizhi"></i>
                <span>设置</span>
            </span>
            <span>
                <i class="iconfont iconhelp"></i>
                <span>帮助</span>
            </span>
            <span @click="logOut()">
                <i class="iconfont iconios-log-out"></i>
                <span>退出</span>
            </span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'vheader',
        data() {
          return{
              user: this.$store.state.currentUser
          }
        },
        methods: {
            logOut() {
                this.$store.dispatch('LOGOUT').then(() => {
                    window.location.reload();
                })
            }
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .vheader {
        width: 100%;
        height: 65px;
        line-height: 65px;
        background-color: #2d2d2d;
        padding: 0 25px;
        .left-container {
            height: 65px;
            float: left;
            .logo {
                height: 40px;
                float: left;
                margin-top: 12px;
                margin-right: 10px;
            }
            .app-name {
                font-size: 20px;
                color: #ffffff;
                display: inline-block;
            }
        }
        .right-container {
            float: right;
            color: #ffffff;
            font-size: 12px;
            & > span {
                margin-right: 15px;
                cursor: pointer;
                transition: all .25s ease;
                i {
                    margin-right: 5px;
                    font-size: 14px
                }
                .type {
                    color: #ffce78;
                }
                &:hover {
                    opacity: 0.8;
                }
            }
            & > span:last-child {
                margin-right: 0;
            }
        }
    }
</style>