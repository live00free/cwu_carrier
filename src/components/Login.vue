<template>
  <el-container>
    <el-header height="120px">
      <span class="sys-title">军事科学院涉密载体管理系统</span>
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
            <el-button type="primary" @click="addDialogVisible = true">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
    <el-footer height="100px">版权所有 &copy; 2020 军事科学院</el-footer>
    <!-- 添加用户的对话框 -->
    <el-dialog title="注册用户" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed" center>
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="right" size="mini">
        <el-card shadow="never">
          <el-row :gutter="24">
            <el-col :span="18" :offset="3">
              <el-form-item label="姓名" prop="fullName">
                <el-input v-model="addForm.fullName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="18" :offset="3">
              <el-form-item label="账号" prop="userName">
                <el-input v-model="addForm.userName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="18" :offset="3">
              <el-form-item label="密码" prop="passWord">
                <el-input v-model="addForm.passWord" type="password" :show-password="true" autoComplete="new-password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="18" :offset="3">
              <el-form-item label="人员类别" prop="secret">
                <el-select v-model="addForm.secret" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="18" :offset="3">
              <el-form-item label="单位" prop="unit">
                <el-select v-model="addForm.unit" placeholder="请选择单位" style="width: 180px" ref="selectReport">
                  <el-option :value="addForm.unit" :label="addForm.unit" style="width: 180px;height:200px;overflow: auto;background-color:#fff">
                    <el-tree :data="unitData" @node-click="handleAddNodeClick"></el-tree>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="18" :offset="3">
              <el-form-item label="电话" prop="telephone">
                <el-input v-model="addForm.telephone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="18" :offset="3">
              <el-form-item label="手机号" prop="mobilePhone">
                <el-input v-model="addForm.mobilePhone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

  </el-container>
</template>
<script>
export default {
  data () {
    var checkPassword = (rule, value, cb) => {
      const regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,30}$/

      if (regPassword.test(value)) {
        return cb()
      }

      cb(new Error('密码为8位以上，密码中必须同时包含数字、字母'))
    }

    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      addForm: {
        fullName: '',
        userName: '',
        passWord: '',
        secret: '',
        unit: '',
        department: '',
        telephone: '',
        mobilePhone: '',
        role: '普通用户'
      },
      // 添加表单的验证规则对象
      addFormRules: {
        fullName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          {
            min: 2,
            max: 16,
            message: '姓名的长度在2~16个字符之间',
            trigger: 'blur'
          }
        ],
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 3,
            max: 16,
            message: '账号的长度在3~16个字符之间,',
            trigger: 'blur'
          }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        secret: [
          { required: true, message: '请选择人员类别', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '请选择单位', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ]
      },
      unitOptions: [],
      options: [{
        value: '非密人员',
        label: '非密人员'
      }, {
        value: '一般涉密人员',
        label: '一般涉密人员'
      }, {
        value: '重要涉密人员',
        label: '重要涉密人员'
      }, {
        value: '核心涉密人员',
        label: '核心涉密人员'
      }],
      addDialogVisible: false,
      unitData: [],
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 8, max: 30, message: '长度在8位以上', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUnitList();
  },
  methods: {
    async getUnitList () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.get('carrier/unit/findAll');
      if (res.code == 200) {
        this.unitData = JSON.parse(JSON.stringify(res.data))
      }
    },
    handleAddNodeClick (node) {
      this.addForm.unit = node.label;
      this.$refs.selectReport.blur();
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post('/login', this.loginForm);
        if (res.code !== 200) return this.$message.error('登录失败！');
        window.sessionStorage.setItem('token', res.data.token);
        this.$message.success('登录成功');
        let atPath = window.sessionStorage.getItem('activePath');
        if (atPath) {
          this.$router.push(atPath);
        } else {
          this.$router.push('/home');
        }

      })
    },
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮，添加新用户
    addUser () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 可以发起添加用户的网络请求 
        // this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
        const { data: res } = await this.$http.post('carrier/user/create-user', this.addForm);
        if (res.code == 500) {
          return this.$message.error(res.msg);
        }
        if (res.code == 200) {
          this.$message.success('注册用户成功！');
          // 隐藏添加用户的对话框
          this.addDialogVisible = false;
          // 重新获取用户列表数据
          this.loginForm.username = this.addForm.userName;
          this.loginForm.password = this.addForm.passWord;
        }

      })
    },
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

.el-footer {
  background: url(../assets/topnav_bg.png);
  line-height: 100px;
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
  font-size: 45px;
  color: #151515b0;
  font-family: "宋体";
  font-weight: bold;
}
</style>