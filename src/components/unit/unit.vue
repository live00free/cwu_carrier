<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>单位管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-row :gutter="24" class="rowcard">
      <el-col :span="8">
        <el-card class="unitcard">
          <el-row :gutter="8">
            <el-col :offset="2">
              <el-button type="primary" plain icon="el-icon-plus" @click="addTopUnit" :disabled="limit.createTopUnit">添加顶层单位</el-button>
              <el-button type="primary" plain icon="el-icon-folder-opened" @click="setAllExpand(true)">展开</el-button>
              <el-button type="primary" plain icon="el-icon-folder" @click="setAllExpand(false)">折叠</el-button>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-col>
              <el-tree :data="unitData" node-key="id" :expand-on-click-node="false" ref="selectTree" :highlight-current="true" @node-click="selectNode">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}</span>
                  <span>
                    <el-button type="text" size="medium" @click="() => append(data)" :disabled="limit.createUnit">添加</el-button>
                    <el-button type="text" size="medium" @click="() => remove(data)" :disabled="limit.deleteUnit">删除</el-button>
                  </span>
                </span>
              </el-tree>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="unitusercard">
          <el-row>
            <el-col :offset="10">
              <span>单位人员</span>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-col>
              <el-table :data="userlist" style="width: 100%;height: 100%" border :highlight-current-row=true :header-cell-style="{background:'#d3e0def5',color:'#303133'}" :row-style="{height:'40px'}" :cell-style="{padding:'0'}">
                <el-table-column prop="serial" label="序号" min-width="10%" header-align="center" align="center"></el-table-column>
                <el-table-column prop="fullName" label="姓名" min-width="15%" header-align="center" align="center"></el-table-column>
                <el-table-column prop="userName" label="账号" min-width="15%" header-align="center" align="center"></el-table-column>
                <el-table-column prop="secret" label="人员分类" min-width="15%" header-align="center" align="center"></el-table-column>
                <el-table-column prop="unit" label="单位" min-width="20%" header-align="center" align="center"></el-table-column>
                <!-- <el-table-column prop="department" label="部门" min-width="25%" header-align="center" align="center"></el-table-column> -->
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-pagination @current-change="handleCurrentChange" background :page-size="queryInfo.pageSize" layout="total, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <!-- 添加顶层单位的对话框 -->
    <el-dialog title="添加单位" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed" center>
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="right" size="small">
        <el-card shadow="never">
          <el-row :gutter="24">
            <el-col :span="18" :offset="3">
              <el-form-item label="名称" prop="label">
                <el-input v-model="addForm.label"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row :gutter="24">
            <el-col :span="18" :offset="3">
              <el-form-item label="是否单位" prop="isUnit">
                <el-radio-group v-model="addForm.isUnit">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row> -->
        </el-card>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUnit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
let id = 1000;
export default {
  data () {
    return {
      unitData: [],
      queryInfo: {
        isUnit: false,
        label: '',
        // 当前的页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 10
      },
      userlist: [],
      total: 0,
      addForm: {
        id: '',
        label: '',
        isUnit: true,
        parentId: ''
      },
      limit: { createTopUnit: false, createUnit: false, deleteUnit: false, createUser: false, deleteUser: false, updateUser: false, deleteTopUnit: false },
      addFormRules: {
        label: [
          { required: true, message: '请输入单位名称', trigger: 'blur' },
        ]
      },
      addDialogVisible: false,
      unitDTO: { id: '', label: '', isUnit: '', parentId: '' }
    }
  },
  created () {
    this.getUnitList();
    this.getUserLimit();
  },
  methods: {
    async getUnitList () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.get('carrier/unit/findAll');
      if (res.code == 200) {
        this.unitData = JSON.parse(JSON.stringify(res.data))
      }

    },
    async getUserLimit () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.get('carrier/user/userLimit')
      if (res.code !== 200) {
        return this.$message.error('获取用户列表失败！');
      }
      this.limit = res.data;
    },
    addDialogClosed () {
      this.$refs.addFormRef.resetFields();
    },
    addUnit () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 可以发起添加用户的网络请求 
        this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
        const { data: res } = await this.$http.post('carrier/unit/create-unit', this.addForm);

        if (res.code == 500) {
          return this.$message.error(res.msg);
        }

        if (res.code == 200) {
          this.$message.success('添加单位成功！');
          // 隐藏添加用户的对话框
          this.addDialogVisible = false;
          // 重新获取用户列表数据
          this.getUnitList();
        }

      })
    },
    append (data) {
      this.addDialogVisible = true;
      this.addForm.parentId = data.id;
    },
    addTopUnit () {
      this.addDialogVisible = true;
      this.addForm.parentId = 0;
    },
    async remove (data) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      if (data.parentId == 0 && this.limit.deleteTopUnit) {
        return this.$message.warning("该单位信息不允许删除");
      }

      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.delete('carrier/unit/deleteUnit/' + data.id);
      if (res.code == 200) {
        this.$message.success('删除成功！');
        this.getUnitList();
      } else {
        this.$message.error(res.msg);
      }
    },
    setAllExpand (state) {
      var nodes = this.$refs.selectTree.store.nodesMap
      for (var i in nodes) {
        nodes[i].expanded = state;
      }
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage;
      this.getUserList();
    },
    async getUserList () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      this.queryInfo.isUnit = this.unitDTO.isUnit;
      this.queryInfo.label = this.unitDTO.label;
      const { data: res } = await this.$http.post('carrier/unit/findUnitUsers', this.queryInfo);
      if (res.code == 200) {
        this.userlist = res.data.datas;
        this.total = res.data.total;
      }
    },
    selectNode (obj, node, data) {
      this.unitDTO = node.data;
      this.getUserList();
    }
  }
};
</script>
<style lang="less" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  padding-right: 8px;
}
.unitcard {
  // width: 40%;
  height: 600px;
  padding: 0;
}
.unitusercard {
  height: 600px;
  padding: 0;
}
.el-col {
  padding: 0 !important;
}
.rowcard {
  margin: 0 !important;
  border: 0 !important;
}
.el-button--primary {
  height: 25px;
  padding: 0;
  line-height: 25px;
  width: 120px;
}
</style>