<template>
    <div class="login">
        <div class="wrapper clearfix">
            <div class="title-box">
                <h2>北仑区岗位津贴管理系统<span class="type">中心端</span></h2>
            </div>
            <div class="left-box">
                <img class="pic1" src="../../assets/login-ico2.png" alt="">
            </div>
            <div class="right-box">
                <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="0" class="login-form">
                    <el-form-item label="" prop="account">
                        <span class="icon">
                          <i class="iconfont icon-geren"></i>
                        </span>
                        <el-input v-model="loginForm.account" placeholder="输入管理员账号"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="password">
                        <span class="icon">
                          <i class="iconfont icon-credentials_icon"></i>
                        </span>
                        <el-input v-model="loginForm.password" placeholder="输入密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-checkbox v-model="loginForm.rmbPwd">记住密码</el-checkbox>
                    </el-form-item>
                    <el-form-item class="do-btn">
                        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <h4 class="company-name">宁波慧升软件有限公司</h4>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import * as Cookies from "js-cookie";
    export default {
        name: 'login',
        data() {
            return {
                loginForm: {
                    account: '',
                    password: '',
                    rmbPwd: false
                },
                rules: {
                    account: [
                        {required: true, message: '请输入管理员账号', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                }
            };
        },
        mounted() {
            //获取cookie
            // console.log(document.cookie);
            this.getCookie();
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        /* ajax操作 */
                        //记住密码
                        this.setCookie(1, this.loginForm.account, this.loginForm.password, 3);
                        if (this.loginForm.rmbPwd === false) {
                            Cookies.remove('a_password');
                        }
                        this.$message({
                            message: '登录成功！',
                            type: 'success'
                        });
                        this.$router.push({path: '/manage/homepage'});
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //设置cookie
            setCookie(aid, account, password, exdays) {
                Cookies.set('a_id', aid, { expires: exdays });
                Cookies.set('a_account', account, { expires: exdays });
                Cookies.set('a_password', password, { expires: exdays });
            },
            //读取cookie
            getCookie: function () {
                if (document.cookie.length > 0) {
                    this.loginForm.account = Cookies.getJSON('a_account');
                    this.loginForm.password = Cookies.getJSON('a_password');
                }
            }
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    .login {
        width: 100%;
        min-width: 1230px;
        height: 100%;
        min-height: 700px;
        /*background: #4254f8;
        background: linear-gradient(to bottom, #4254f8, #1b7bfe);*/
        background:url(../../assets/manage-bg.jpg) no-repeat center top;
        position: relative;
        background-size:100%;
        .wrapper {
            width: 1200px;
            min-height: 640px;
            background: #ffffff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 12px;
            padding: 60px;
            .title-box {
                font-size: 40px;
                margin-bottom: 15px;
                .type {
                    font-size: 24px;
                    color: #4e93fd;
                    margin-left: 10px;
                }
            }
            .left-box {
                width: 600px;
                float: left;
                position: relative;
                .pic1 {
                    margin-left: 20px;
                    margin-top: 50px;
                    width: 420px;
                }
            }
            .right-box {
                width: 440px;
                float: right;
                padding-top: 60px;
                .el-form {
                    .el-form-item {
                        .el-form-item__content {
                            .icon {
                                position: absolute;
                                left: 0;
                                top: 0;
                                z-index: 1;
                                width: 50px;
                                text-align: center;
                                height: 50px;
                                line-height: 50px;
                                color: #409EFF;
                                i {
                                    font-size: 18px;
                                }
                            }
                            .el-input {
                                input {
                                    padding: 0 15px 0 50px;
                                    border: 0;
                                    border-bottom: solid 1px #dcdfe6;
                                    font-size: 18px;
                                    border-radius: 0;
                                    height: 50px;
                                    line-height: 50px;
                                }
                            }
                            .el-button {
                                font-size: 20px;
                                display: block;
                                width: 100%;
                                margin-top: 30px;
                                padding: 16px 20px;
                                border-radius: 30px;
                                position: relative;
                                &:before {
                                    content: '';
                                    position: absolute;
                                    width: 85%;
                                    height: 13px;
                                    background-color: #e5efff;
                                    left: 50%;
                                    transform: translateX(-50%);
                                    bottom: -14px;
                                    border-radius: 0 0 20px 20px;
                                }
                            }
                            .identify-box {
                                display: inline-block;
                                height: 40px;
                                overflow: hidden;
                                cursor: pointer;
                                position: absolute;
                                right: 0;
                                top: 5px;
                            }
                            .el-radio, .el-checkbox {
                                display:inline-block;
                                padding-left: 14px;
                                .el-radio__label, .el-checkbox__label {
                                    font-size: 18px;
                                    color: #888888;
                                    vertical-align: middle;
                                }
                                .el-radio__input, .el-checkbox__input {
                                    margin-right: 8px;
                                    margin-top: 1px;
                                    .el-radio__inner, .el-checkbox__inner {
                                        width: 18px;
                                        height: 18px;
                                        border: solid 1px #409EFF;
                                        background-color: #ffffff;
                                    }
                                    &.is-checked {
                                        & + .el-radio__label {
                                            color: #409EFF;
                                        }
                                        .el-radio__inner::after {
                                            width: 14px;
                                            height: 14px;
                                            background-color: #409EFF;
                                        }
                                        & + .el-checkbox__label {
                                            color: #409EFF;
                                        }
                                        .el-checkbox__inner::after {
                                            border-right: 1px solid #409EFF;
                                            border-bottom: 1px solid #409EFF;
                                            height: 10px;
                                            left: 4px;
                                            top: 0;
                                            width: 7px;
                                        }
                                    }
                                }
                            }
                        }
                        &.is-error {
                            .icon {
                                color: #f56c6c;
                            }
                            .el-input {
                                input {
                                    border-bottom: solid 1px #f56c6c;
                                }
                            }
                        }
                        &.is-success {
                            .icon {
                                color: #67c23a;
                            }
                            .el-input {
                                input {
                                    border-bottom: solid 1px #67c23a;
                                }
                            }
                        }
                    }
                }
            }
            .company-name {
                font-size: 18px;
                color: #c1c1c1;
                position: absolute;
                right: 60px;
                bottom: 60px;
            }
        }
    }
</style>