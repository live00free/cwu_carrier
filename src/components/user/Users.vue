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
          <el-button type="primary" @click="addDialogVisible = true" size='medium' icon="el-icon-circle-plus">添加用户</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table :data="userlist" :header-cell-style="{background:'#d3e0def5',color:'#303133'}" style="width: 100%;height: 100%" border :highlight-current-row=true :row-style="{height:'50px'}" :cell-style="{padding:'0'}">
          <el-table-column prop="serial" label="序号" style="width: 5%;" header-align="center" align="center"></el-table-column>
          <el-table-column prop="userId" label="ID" v-if="false" header-align="center" align="center"></el-table-column>
          <el-table-column prop="fullName" label="姓名" style="width: 10%" header-align="center" align="center"></el-table-column>
          <el-table-column prop="userName" label="账号" style="width: 10%" header-align="center" align="center"></el-table-column>
          <el-table-column prop="secret" label="密级" style="width: 10%" header-align="center" align="center"></el-table-column>
          <el-table-column prop="unit" label="单位" style="width: 15%" header-align="center" align="center"></el-table-column>
          <el-table-column prop="department" label="部门" style="width: 15%" header-align="center" align="center"></el-table-column>
          <el-table-column prop="telephone" label="电话" style="width: 10%" header-align="center" align="center"></el-table-column>
          <el-table-column prop="mobilePhone" label="手机号" style="width: 10%" header-align="center" align="center"></el-table-column>
          <el-table-column label="操作" style="width: 15%" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button @click="editUser(scope.row.userId)" type="text" size="medium">编辑</el-button>
              <el-button @click="deleteUser(scope.row.userId)" type="text" size="medium">删除</el-button>
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
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px" label-position="right" size="small">
          <el-card shadow="never">
            <el-row :gutter="24">
              <el-col :span="18" :offset="3">
                <el-form-item label="用户名" prop="fullName">
                  <el-input v-model="editForm.fullName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="18" :offset="3">
                <el-form-item label="账号" prop="userName">
                  <el-input v-model="editForm.userName"></el-input>
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
                <el-form-item label="密级" prop="secret">
                  <el-select v-model="editForm.secret" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="18" :offset="3">
                <el-form-item label="单位" prop="unit">
                  <el-select v-model="editForm.unit" placeholder="请选择">
                    <el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="18" :offset="3">
                <el-form-item label="部门" prop="department">
                  <el-input v-model="editForm.department">
                    <el-button slot="append" icon="el-icon-s-home" @click="openSelectDpedit"></el-button>
                  </el-input>
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
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="right" size="small">
          <el-card shadow="never">
            <el-row :gutter="24">
              <el-col :span="18" :offset="3">
                <el-form-item label="用户名" prop="fullName">
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
                <el-form-item label="密级" prop="secret">
                  <el-select v-model="addForm.secret" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="18" :offset="3">
                <el-form-item label="单位" prop="unit">
                  <el-select v-model="addForm.unit" placeholder="请选择">
                    <el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="18" :offset="3">
                <el-form-item label="部门" prop="department">
                  <el-input v-model="addForm.department">
                    <el-button slot="append" icon="el-icon-s-home" @click="openSelectDp"></el-button>
                  </el-input>
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

      <!-- 选择部门的对话框 -->
      <el-dialog title="选择部门" :visible.sync="selectDepartmentDV" width="40%" @close="selectDepartmentClosed" center>
        <!-- 内容主体区域 -->
        <el-card shadow="never">
          <el-tree :data="unitData" default-expand-all node-key="id" show-checkbox :check-on-click-node="true" ref="selectTree" :highlight-current="true">
            <span class="custom-tree-node" slot-scope="{ node}">
              <span>{{ node.label }}</span>
            </span>
          </el-tree>
        </el-card>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="selectDPClosed">取 消</el-button>
          <el-button type="primary" @click="selectDP">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>

  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    // 验证邮箱的规则
    var checkPassword = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regPassword = /(?!^(\d+|[a-zA-Z]+|[~!\W*?]+)$)^[\w~!\W*?]{10,}$/

      if (regPassword.test(value)) {
        // 合法的邮箱
        return cb()
      }

      cb(new Error('密码必须包含字母、数字、特殊字符中的两种且长度为10位以上'))
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
      unitOptions: [],
      options: [{
        value: '非密',
        label: '非密'
      }, {
        value: '内部',
        label: '内部'
      }, {
        value: '秘密',
        label: '秘密'
      }, {
        value: '机密',
        label: '机密'
      }, {
        value: '绝密',
        label: '绝密'
      }],
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
        mobilePhone: ''
      },
      // 添加表单的验证规则对象
      addFormRules: {
        fullName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur'
          }
        ],
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '账号名的长度在3~10个字符之间,',
            trigger: 'blur'
          }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        secret: [
          { required: true, message: '请选择密级', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '请选择单位', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选择部门', trigger: 'blur' }
        ]
      },
      editFormRules: {
        fullName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur'
          }
        ],
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '账号名的长度在3~10个字符之间,',
            trigger: 'blur'
          }
        ],
        passWord: [
          { validator: checkPassword, trigger: 'blur' }
        ],
        secret: [
          { required: true, message: '请选择密级', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '请选择单位', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选择部门', trigger: 'blur' }
        ]
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 查询到的用户信息对象
      editForm: {},
      // 控制分配角色对话框的显示与隐藏
      setRoleDialogVisible: false,
      selectDepartmentDV: false,
      // 需要被分配角色的用户信息
      userInfo: {},
      // 所有角色的数据列表
      rolesList: [],
      // 已选中的角色Id值
      selectedRoleId: '',
      selectdp: '',
      unitData: []
    }
  },
  created () {
    this.getUserList();
    this.getUserUnits();
  },
  methods: {
    async getUserList () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.post('carrier/user/findAll', this.queryInfo)
      if (res.code !== 200) {
        return this.$message.error('获取用户列表失败！');
      }
      this.userlist = res.data.datas;
      this.total = res.data.total;
    },
    async getDepartMents () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      let seunit = '';
      if (this.selectdp == 'add') {
        seunit = this.addForm.unit;
      } else {
        seunit = this.editForm.unit;
      }
      const { data: res } = await this.$http.get('carrier/unit/findAllDepartments?unit=' + seunit);
      if (res.code == 200) {
        this.unitData = JSON.parse(JSON.stringify(res.data))
      }
    },
    async getUserUnits () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.get('carrier/unit/findAllUnits')
      if (res.code !== 200) {
        return this.$message.error('获取用户列表失败！');
      }
      this.unitOptions = res.data;
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
    selectDPClosed () {
      this.selectDepartmentDV = false;
    },
    openSelectDp () {
      if (this.addForm.unit == '') {
        return this.$message.error("请先选择单位！");
      }
      this.selectdp = 'add';
      this.selectDepartmentDV = true;
      this.getDepartMents();
    },
    openSelectDpedit () {
      if (this.editForm.unit == '') {
        return this.$message.error("请先选择单位！");
      }
      this.selectdp = 'edit';
      this.selectDepartmentDV = true;
      this.getDepartMents();
    },
    selectDP () {
      let node = this.$refs.selectTree.getCheckedNodes();
      let departs = [];
      node.forEach(item => {
        if (!item.isUnit) {
          departs.push(item);
        }
      });
      if (node.departs > 1) {
        return this.$message.warning("不允许选择多个部门");
      }
      let depart = departs[0].label;
      if (this.selectdp == 'add') {
        this.addForm.department = depart;
      } else {
        this.editForm.department = depart;
      }
      this.selectDepartmentDV = false;
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

      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
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