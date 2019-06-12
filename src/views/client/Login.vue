<template>
    <div class="login">
        <div class="wrapper clearfix">
            <div class="title-box">
                <h2>北仑区岗位津贴管理系统<span class="type">企业端</span></h2>
            </div>
            <div class="left-box">
                <img class="pic1" src="../../assets/login-ico1.png" alt="">
            </div>
            <div class="right-box">
                <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="0"
                         class="login-form">
                    <el-form-item label="" prop="companyName">
                        <span class="icon">
                          <i class="iconfont icon-geren"></i>
                        </span>
                        <el-input v-model="loginForm.companyName" placeholder="输入企业名称"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="codeCard">
                        <span class="icon">
                          <i class="iconfont icon-credentials_icon"></i>
                        </span>
                        <el-input v-model="loginForm.codeCard" placeholder="输入统一代码证"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="phone">
                        <span class="icon">
                          <i class="iconfont icon-shouji"></i>
                        </span>
                        <el-input v-model="loginForm.phone" placeholder="输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="codeNum">
                        <span class="icon">
                          <i class="iconfont icon-yanzheng"></i>
                        </span>
                        <el-input v-model="loginForm.codeNum" placeholder="输入验证码"></el-input>
                        <div class="identify-box" @click="refreshCode()">
                            <identify-code :identifyCode="identifyCode"></identify-code>
                        </div>
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
    import {checkIsPhone} from '@/common/js/validate';
    import IdentifyCode from '@/components/IdentifyCode.vue';

    export default {
        name: 'login',
        components: {
            IdentifyCode
        },
        data() {
            let isPhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('手机号不能为空'));
                } else if (checkIsPhone(value) === false) {
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            };
            // 验证码自定义验证规则
            const validateVerifycode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else if (value !== this.identifyCode) {
                    console.log('validateVerifycode:', value);
                    callback(new Error('验证码不正确!'));
                } else {
                    callback();
                }
            };
            return {
                identifyCode: '',
                identifyCodes: '1234567890',
                loginForm: {
                    companyName: '',
                    codeCard: '',
                    phone: '',
                    codeNum: ''
                },
                rules: {
                    companyName: [
                        {required: true, message: '请输入企业名称', trigger: 'blur'}
                    ],
                    codeCard: [
                        {required: true, message: '请输入统一代码证', trigger: 'blur'}
                    ],
                    phone: [
                        {validator: isPhone, trigger: 'blur'}
                    ],
                    codeNum: [
                        {required: true, validator: validateVerifycode, trigger: 'blur'}
                    ]
                }
            };
        },
        mounted() {
            //获取cookie
            this.getCookie();
            // 验证码初始化
            this.identifyCode = '';
            this.makeCode(this.identifyCodes, 4);
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        /* ajax操作 */
                        this.setCookie(1, this.loginForm.companyName, this.loginForm.codeCard, this.loginForm.phone, 3);
                        this.$message({
                            message: '登录成功！',
                            type: 'success'
                        });
                        this.$router.push({path: '/client/homepage'});
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 生成随机数
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            // 切换验证码
            refreshCode() {
                this.identifyCode = '';
                this.makeCode(this.identifyCodes, 4);
            },
            // 生成四位随机验证码
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
                }
            },
            //设置cookie
            setCookie(cid, companyName, codeCard, phone, exdays) {
                let exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                window.document.cookie = 'c_id' + '=' + cid + ';path=/;expires=' + exdate.toGMTString();
                window.document.cookie = 'c_companyName' + '=' + companyName + ';path=/;expires=' + exdate.toGMTString();
                window.document.cookie = 'c_codeCard' + '=' + codeCard + ';path=/;expires=' + exdate.toGMTString();
                window.document.cookie = 'c_phone' + '=' + phone + ';path=/;expires=' + exdate.toGMTString();
            },
            //读取cookie
            getCookie: function () {
                if (document.cookie.length > 0) {
                    let arr = document.cookie.split('; '); //显示格式切割
                    for (let i = 0; i < arr.length; i++) {
                        let arr2 = arr[i].split('='); //再次切割
                        //判断查找相对应的值
                        if (arr2[0] === 'c_companyName') {
                            this.loginForm.companyName = arr2[1];
                        } else if (arr2[0] === 'c_codeCard') {
                            this.loginForm.codeCard = arr2[1];
                        } else if (arr2[0] === 'c_phone') {
                            this.loginForm.phone = arr2[1];
                        }
                    }
                }
            },
            //清除cookie
            clearCookie: function () {
                this.setCookie('', '', '', '', -1); //修改2值都为空，天数为负1天
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
        background: url(../../assets/client-bg.jpg) no-repeat center top;
        position: relative;
        background-size: 100%;
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
                    margin-top: 15px;
                    width: 420px;
                }
            }
            .right-box {
                width: 440px;
                float: right;
                padding-top: 30px;
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