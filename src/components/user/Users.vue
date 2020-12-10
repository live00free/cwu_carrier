<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card style="height:100%" shadow="never">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.keyWord" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4" :push="13">
          <el-button type="primary" @click="addDialogVisible = true" size='medium' icon="el-icon-circle-plus" :disabled="limit.createUser">添加用户</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table :data="userlist" :header-cell-style="{background:'#d3e0def5',color:'#303133'}" style="width: 100%;height: 100%" border :highlight-current-row=true :row-style="{height:'50px'}" :cell-style="{padding:'0'}">
          <el-table-column prop="serial" label="序号" min-width="5%;" header-align="center" align="center"></el-table-column>
          <el-table-column prop="userId" label="ID" v-if="false" header-align="center" align="center"></el-table-column>
          <el-table-column prop="fullName" label="姓名" min-width="10%" header-align="center" align="center"></el-table-column>
          <el-table-column prop="userName" label="账号" min-width="10%" header-align="center" align="center"></el-table-column>
          <el-table-column prop="secret" label="人员类别" min-width="10%" header-align="center" align="center"></el-table-column>
          <el-table-column prop="unit" label="单位" min-width="12.5%" header-align="center" align="center"></el-table-column>
          <!-- <el-table-column prop="department" label="部门" min-width="12.5%" header-align="center" align="center"></el-table-column> -->
          <el-table-column prop="telephone" label="电话" min-width="10%" header-align="center" align="center"></el-table-column>
          <el-table-column prop="mobilePhone" label="手机号" min-width="10%" header-align="center" align="center"></el-table-column>
          <el-table-column prop="role" label="角色" min-width="10%" header-align="center" align="center"></el-table-column>
          <el-table-column label="操作" min-width="10%" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button @click="editUser(scope.row.userId)" type="text" size="medium">编辑</el-button>
              <el-button @click="deleteUser(scope.row.userId)" type="text" size="medium" :disabled="limit.deleteUser">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <el-pagination @current-change="handleCurrentChange" background :page-size="queryInfo.pageSize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-row>
      <!-- 修改用户的对话框 -->
      <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="40%" @close="editDialogClosed" center>
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px" label-position="right" size="mini">
          <el-card shadow="never">
            <el-row :gutter="24">
              <el-col :span="18" :offset="3">
                <el-form-item label="姓名" prop="fullName">
                  <el-input v-model="editForm.fullName" :disabled="limit.updateUser"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="18" :offset="3">
                <el-form-item label="账号" prop="userName">
                  <el-input v-model="editForm.userName" :disabled="limit.updateUser"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="18" :offset="3">
                <el-form-item label="密码" prop="passWord">
                  <el-input v-model="editForm.passWord" type="password" :show-password="false"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="18" :offset="3">
                <el-form-item label="人员类别" prop="secret">
                  <el-select v-model="editForm.secret" placeholder="请选择" :disabled="limit.updateUser">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="18" :offset="3">
                <el-form-item label="单位" prop="unit">
                  <el-select v-model="editForm.unit" placeholder="请选择单位" style="width: 180px" ref="selectReport">
                    <el-option :value="editForm.unit" :label="editForm.unit" style="width: 180px;height:200px;overflow: auto;background-color:#fff">
                      <el-tree :data="unitData" @node-click="handleNodeClick"></el-tree>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="18" :offset="3">
                <el-form-item label="电话" prop="telephone">
                  <el-input v-model="editForm.telephone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="18" :offset="3">
                <el-form-item label="手机号" prop="mobilePhone">
                  <el-input v-model="editForm.mobilePhone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="18" :offset="3">
                <el-form-item label="角色" prop="role">
                  <el-select v-model="editForm.role" placeholder="请选择" :disabled="limit.updateUser">
                    <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 添加用户的对话框 -->
      <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed" center>
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
            <el-row :gutter="24">
              <el-col :span="18" :offset="3">
                <el-form-item label="角色" prop="role">
                  <el-select v-model="addForm.role" placeholder="请选择">
                    <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
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

    </el-card>

  </div>
</template>

<script type="text/javascript">
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
      // 获取用户列表的参数对象
      queryInfo: {
        keyWord: '',
        // 当前的页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 8
      },
      roleOptions: [],
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
      limit: { createTopUnit: false, createUnit: false, deleteUnit: false, createUser: false, deleteUser: false, updateUser: false, deleteTopUnit: false },
      userlist: [],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        fullName: '',
        userName: '',
        passWord: '',
        secret: '',
        unit: '',
        department: '',
        telephone: '',
        mobilePhone: '',
        role: ''
      },
      // 添加表单的验证规则对象
      addFormRules: {
        fullName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          {
            min: 2,
            max: 16,
            message: '姓名的长度在3~16个字符之间',
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
      editFormRules: {
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
            message: '账号名的长度在3~16个字符之间,',
            trigger: 'blur'
          }
        ],
        passWord: [
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
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 查询到的用户信息对象
      editForm: {},
      // 控制分配角色对话框的显示与隐藏
      setRoleDialogVisible: false,
      // 需要被分配角色的用户信息
      userInfo: {},
      // 所有角色的数据列表
      rolesList: [],
      // 已选中的角色Id值
      selectedRoleId: '',
      unitData: []
    }
  },
  created () {
    this.getUserList();
    this.getUserLimit();
    this.setRoleList();
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
    handleNodeClick (node) {
      this.editForm.unit = node.label;
      this.$refs.selectReport.blur();
    },
    async setRoleList () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.get('carrier/user/findLoginUser');
      const loginUserName = res.userName;
      console.info(loginUserName);
      if (loginUserName && loginUserName === 'Administrator') {
        this.roleOptions = [{
          value: '一级管理员',
          label: '一级管理员'
        }, {
          value: '二级级管理员',
          label: '二级级管理员'
        }, {
          value: '三级管理员',
          label: '三级管理员'
        }, {
          value: '四级管理员',
          label: '四级管理员'
        }, {
          value: '普通用户',
          label: '普通用户'
        }];
      } else {
        this.roleOptions = [{
          value: '二级级管理员',
          label: '二级级管理员'
        }, {
          value: '三级管理员',
          label: '三级管理员'
        }, {
          value: '四级管理员',
          label: '四级管理员'
        }, {
          value: '普通用户',
          label: '普通用户'
        }];
      }
    },
    async getUserList () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.post('carrier/user/findAll', this.queryInfo)
      if (res.code !== 200) {
        return this.$message.error('获取用户列表失败！');
      }
      this.userlist = res.data.datas;
      this.total = res.data.total;
    },
    async getUserLimit () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.get('carrier/user/userLimit')
      if (res.code !== 200) {
        return this.$message.error('获取用户列表失败');
      }
      this.limit = res.data;
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage
      this.getUserList();
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    selectDepartmentClosed () {

    },
    // 点击按钮，添加新用户
    addUser () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 可以发起添加用户的网络请求 
        this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
        const { data: res } = await this.$http.post('carrier/user/create-user', this.addForm);
        if (res.code == 500) {
          return this.$message.error(res.msg);
        }
        if (res.code == 200) {
          this.$message.success('添加用户成功！');
          // 隐藏添加用户的对话框
          this.addDialogVisible = false;
          // 重新获取用户列表数据
          this.getUserList();
        }

      })
    },
    // 展示编辑用户的对话框
    editUser (id) {
      let user = this.userlist.find(item => item.userId == id);
      this.editForm = user;
      this.editDialogVisible = true;
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户信息并提交
    editUserInfo () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return;
        // 发起修改用户信息的数据请求
        this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
        const { data: res } = await this.$http.put('carrier/user/updateUser/' + this.editForm.userId, this.editForm);

        if (res.code == 500) {
          return this.$message.error(res.msg);
        }

        // 关闭对话框
        this.editDialogVisible = false;
        // 刷新数据列表
        this.getUserList();
        // 提示修改成功
        this.$message.success('更新用户信息成功！');
      })
    },
    // 根据Id删除对应的用户信息
    async deleteUser (id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      let user = this.userlist.find(item => item.userId == id);
      if (user.userName == "Administrator") {
        return this.$message.warning("请注意，站点管理员账号不可删除！");
      }
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.delete('carrier/user/deleteUser/' + user.userId)

      if (res.code == 500) {
        return this.$message.error(res.msg);
      }

      this.$message.success('删除用户成功！');
      this.getUserList();
    }
  }
}
</script>

<style lang="less" scoped>
.el-button--primary {
  height: 30px;
  padding: 0;
  line-height: 30px;
  width: 100px;
}
</style>