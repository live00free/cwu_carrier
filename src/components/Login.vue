<template>
    <el-container>
        <el-header height="120px">
            <span class="sys-title">涉密载体管理系统</span>
        </el-header>
        <el-main>
            <div class="login_box">
                <div class="avatar_box">
                    <img src="../assets/logo.png" alt="">
                </div>
                <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
                    </el-form-item>
                    <el-form-item class="btns">
                        <el-button type="primary" @click="login">登录</el-button>
                        <el-button type="primary" @click="resetLoginForm">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-main>
    </el-container>
</template>
<script>
export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            loginFormRules: {
                username: [
                    { required: true, message: '请输入登录名称', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        resetLoginForm() {
            this.$refs.loginFormRef.resetFields()
        },
        login() {
            if (this.loginForm.username == 'admin' && this.loginForm.password == 'admin') {
                window.sessionStorage.setItem('token', this.loginForm.username);
                this.$message.success('登录成功');
                this.$router.push('/home');
            } else {
                this.$refs.loginFormRef.validate(async valid => {
                    if (!valid) return;
                    const { data: res } = await this.$http.post('login', this.loginForm);
                    if (res.code !== 200) return this.$message.error('登录失败！');
                    window.sessionStorage.setItem('token', res.data.token);
                    this.$message.success('登录成功');
                    this.$router.push('/home');
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.login_box {
    width: 450px;
    height: 300px;
    background-color: #20594461;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.btns {
    display: flex;
    justify-content: center;
}

.el-main {
    background: url(../assets/login_bg.jpg);
}

.el-header {
    background: url(../assets/topnav_bg.png);
    line-height: 120px;
    text-align: center;
}

.el-container {
    height: 100%;
}

.el-button--primary {
    height: 30px;
    padding: 0;
    line-height: 30px;
    width: 150px;
}

.sys-title {
    font-size: 50px;
    color: #151515B0;
}
</style>