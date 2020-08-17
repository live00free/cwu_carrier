<template>
<div>
	<el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    </el-card>
    <el-card>
    	<el-row :gutter="24">
			<el-col :span="8">
				<el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
				<el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
				</el-input>
			</el-col>
			<el-col :span="4" :push="13">
				<el-button type="primary" @click="addDialogVisible = true" size='medium' icon="el-icon-circle-plus">添加用户</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-table :data="userlist" style="width: 100%" border :highlight-current-row=true :row-style="{height:'50px'}" :cell-style="{padding:'0'}">
				<el-table-column prop="serial" label="序号" style="width: 5%;" header-align="center" align="center"></el-table-column>
				<el-table-column prop="fullname" label="姓名" style="width: 15%" header-align="center" align="center"></el-table-column>
				<el-table-column prop="username" label="账号" style="width: 10%" header-align="center" align="center"></el-table-column>
				<el-table-column prop="secret" label="密级" style="width: 10%" header-align="center" align="center"></el-table-column>
				<el-table-column prop="unit" label="单位" style="width: 10%" header-align="center" align="center"></el-table-column>
				<el-table-column prop="department" label="部门" style="width: 10%" header-align="center" align="center"></el-table-column>
				<el-table-column prop="phone" label="联系方式" style="width: 10%" header-align="center" align="center"></el-table-column>
				<el-table-column prop="userrole" label="角色" style="width: 20%" header-align="center" align="center"></el-table-column>
				<el-table-column label="操作" style="width: 20%">
					<template slot-scope="scope">
						<el-button @click="editUser(scope.row.id)" type="text" size="medium">编辑</el-button>
						<el-button @click="deleteUser(scope.row.id)" type="text" size="medium">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row>
			<el-pagination
				@current-change="handleCurrentChange"
				background
				:page-size="queryInfo.pagesize"
				layout="total, prev, pager, next, jumper"
				:total="total">
		    </el-pagination>
		</el-row>
		<!-- 修改用户的对话框 -->
		<el-dialog title="修改用户" :visible.sync="editDialogVisible" width="40%" @close="editDialogClosed" center>
			<el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="100px" label-position="right" size="small">
				<el-row :gutter="24">
	  				<el-col :span="18" :offset="3">
		        		<el-form-item label="用户名" prop="fullname">
							<el-input v-model="editForm.fullname"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24">
	  				<el-col :span="18" :offset="3">
						<el-form-item label="账号" prop="username">
							<el-input v-model="editForm.username"></el-input>
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
							<el-input v-model="editForm.unit"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24">
	  				<el-col :span="18" :offset="3">
						<el-form-item label="部门" prop="department">
							<el-input v-model="editForm.department"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24">
	  				<el-col :span="18" :offset="3">
						<el-form-item label="联系方式" prop="phone">
							<el-input v-model="editForm.phone"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24">
	  				<el-col :span="18" :offset="3">
						<el-form-item label="角色" prop="userrole">
							<el-input v-model="editForm.userrole"></el-input>
						</el-form-item>
				</el-col>
				</el-row>
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
      			<el-row :gutter="24">
	  				<el-col :span="18" :offset="3">
		        		<el-form-item label="用户名" prop="fullname">
							<el-input v-model="addForm.fullname"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24">
	  				<el-col :span="18" :offset="3">
						<el-form-item label="账号" prop="username">
							<el-input v-model="addForm.username"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24">
	  				<el-col :span="18" :offset="3">
						<el-form-item label="密码" prop="password">
							<el-input v-model="addForm.password" type="password" :show-password="true"></el-input>
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
							<el-input v-model="addForm.unit"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24">
	  				<el-col :span="18" :offset="3">
						<el-form-item label="部门" prop="department">
							<el-input v-model="addForm.department"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24">
	  				<el-col :span="18" :offset="3">
						<el-form-item label="联系方式" prop="phone">
							<el-input v-model="addForm.phone"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24">
	  				<el-col :span="18" :offset="3">
						<el-form-item label="角色" prop="userrole">
							<el-input v-model="addForm.userrole"></el-input>
						</el-form-item>
				</el-col>
				</el-row>
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
	data() {
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
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 10
      },
      options:[{
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
		fullname:'',
		username:'',
		password:'',
		secret:'',
		unit:'',
		department:'',
		phone:'',
		userrole:''
      },
      // 添加表单的验证规则对象
      addFormRules: {
        fullname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur'
          }
        ],
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '账号名的长度在3~10个字符之间,',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        secret: [
          { required: true, message: '请选择密级', trigger: 'blur' }
        ],
        userrole: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
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
      selectedRoleId: ''
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      // const { data: res } = await this.$http.get('users', {
      //   params: this.queryInfo
      // })
      // if (res.meta.status !== 200) {
      //   return this.$message.error('获取用户列表失败！')
      // }
      const res={
      	users:[{
      		id:'481243921',
		  	serial:'1',
		  	fullname:'站点管理员',
		  	username:'Administrator',
		  	secret:'绝密',
		  	unit:'凯锐远景',
		  	department:'',
		  	phone:'',
		  	userrole:'站点管理员',
		  	password:''
		  },{
		  	id:'481243922',
		  	serial:'2',
		  	fullname:'王小明',
		  	username:'wangxiaoming',
		  	secret:'非密',
		  	unit:'凯锐远景',
		  	department:'一部',
		  	phone:'1360215478',
		  	userrole:'负责人',
		  	password:''
		  },{
		  	id:'481243923',
		  	serial:'3',
		  	fullname:'王小明',
		  	username:'wangxiaoming',
		  	secret:'非密',
		  	unit:'凯锐远景',
		  	department:'一部',
		  	phone:'1360215478',
		  	userrole:'负责人',
		  	password:''
		  },{
		  	id:'481243924',
		  	serial:'4',
		  	fullname:'王小明',
		  	username:'wangxiaoming',
		  	secret:'非密',
		  	unit:'凯锐远景',
		  	department:'一部',
		  	phone:'1360215478',
		  	userrole:'负责人',
		  	password:''
		  },{
		  	id:'481243925',
		  	serial:'5',
		  	fullname:'王小明',
		  	username:'wangxiaoming',
		  	secret:'非密',
		  	unit:'凯锐远景',
		  	department:'一部',
		  	phone:'1360215478',
		  	userrole:'负责人',
		  	password:''
		  },{
		  	id:'481243926',
		  	serial:'6',
		  	fullname:'王小明',
		  	username:'wangxiaoming',
		  	secret:'非密',
		  	unit:'凯锐远景',
		  	department:'一部',
		  	phone:'1360215478',
		  	userrole:'负责人',
		  	password:''
		  },{
		  	id:'481243927',
		  	serial:'7',
		  	fullname:'王小明',
		  	username:'wangxiaoming',
		  	secret:'非密',
		  	unit:'凯锐远景',
		  	department:'一部',
		  	phone:'1360215478',
		  	userrole:'负责人',
		  	password:''
		  },{
		  	id:'481243928',
		  	serial:'8',
		  	fullname:'王小明',
		  	username:'wangxiaoming',
		  	secret:'非密',
		  	unit:'凯锐远景',
		  	department:'一部',
		  	phone:'1360215478',
		  	userrole:'负责人',
		  	password:''
		  }],
      	total:8
      };
      this.userlist = res.users;
      this.total = res.total;
      console.log(res);
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮，添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 可以发起添加用户的网络请求
        const { data: res } = await this.$http.post('users', this.addForm)

        if (res.meta.status !== 201) {
          this.$message.error('添加用户失败！')
        }

        this.$message.success('添加用户成功！')
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 重新获取用户列表数据
        this.getUserList()
      })
    },
    // 展示编辑用户的对话框
    async editUser(id) {
      // console.log(id)
      // const { data: res } = await this.$http.get('users/' + id)

      // if (res.meta.status !== 200) {
      //   return this.$message.error('查询用户信息失败！')
      // }
      let user=this.userlist.find(item=>item.id==id);
      // this.editForm = res.data;
      this.editForm = user;
      this.editDialogVisible = true;
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 发起修改用户信息的数据请求
        const { data: res } = await this.$http.put(
          'users/' + this.editForm.id,
          {
            email: this.editForm.email,
            mobile: this.editForm.mobile
          }
        )

        if (res.meta.status !== 200) {
          return this.$message.error('更新用户信息失败！')
        }

        // 关闭对话框
        this.editDialogVisible = false
        // 刷新数据列表
        this.getUserList()
        // 提示修改成功
        this.$message.success('更新用户信息成功！')
      })
    },
    // 根据Id删除对应的用户信息
    async deleteUser(id) {
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

      const { data: res } = await this.$http.delete('users/' + id)

      if (res.meta.status !== 200) {
        return this.$message.error('删除用户失败！')
      }

      this.$message.success('删除用户成功！')
      this.getUserList()
    },

  }
}
</script>

<style lang="less" scoped>
 .el-button--primary {
    height: 30px;
    padding:0;
    line-height: 30px;
    width: 100px;
  }

</style>