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
            <el-col :offset="12">
              <el-button type="primary" plain icon="el-icon-folder-opened" @click="unFoldAll">展开</el-button>
              <el-button type="primary" plain icon="el-icon-folder" @click="collapseAll">折叠</el-button>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-col>
              <el-tree :data="data" node-key="id" :expand-on-click-node="false" ref="selectTree" :highlight-current="true" @node-click="getUserList">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}</span>
                  <span>
                    <el-button type="text" size="medium" @click="() => append(data)">添加</el-button>
                    <el-button type="text" size="medium" @click="() => remove(node, data)">删除</el-button>
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
            <el-col>
              <el-button type="primary" plain icon="el-icon-plus" @click="unFoldAll">添加用户</el-button>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-col>
              <el-table :data="userlist" style="width: 100%;height: 100%" border :highlight-current-row=true :header-cell-style="{background:'#d3e0def5',color:'#303133'}" :row-style="{height:'40px'}" :cell-style="{padding:'0'}">
                <el-table-column prop="serial" label="序号" style="width: 15%;" header-align="center" align="center"></el-table-column>
                <el-table-column prop="fullname" label="姓名" style="width: 25%" header-align="center" align="center"></el-table-column>
                <el-table-column prop="username" label="账号" style="width: 20%" header-align="center" align="center"></el-table-column>
                <el-table-column prop="secret" label="密级" style="width: 20%" header-align="center" align="center"></el-table-column>
                <el-table-column label="操作" style="width: 20%" header-align="center" align="center">
                  <template slot-scope="scope">
                    <el-button @click="deleteUser(scope.row.id)" type="text" size="medium">移除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-pagination @current-change="handleCurrentChange" background :page-size="queryInfo.pagesize" layout="total, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/javascript">
let id = 1000;
export default {
  data () {
    const data = [{
      id: 1,
      label: '单位 1',
      children: [{
        id: 4,
        label: '一所 1-1',
        children: [{
          id: 9,
          label: '一部 1-1-1'
        }, {
          id: 10,
          label: '二部 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '单位 2',
      children: [{
        id: 5,
        label: '一所 2-1'
      }, {
        id: 6,
        label: '二所 2-2'
      }]
    }, {
      id: 3,
      label: '单位 3',
      children: [{
        id: 7,
        label: '一所 3-1'
      }, {
        id: 8,
        label: '二所 3-2'
      }]
    }];
    return {
      data: JSON.parse(JSON.stringify(data)),
      data: JSON.parse(JSON.stringify(data)),
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 10
      },
      userlist: [],
      total: 0
    }
  },
  methods: {
    append (data) {
      const newChild = { id: id++, label: '部门一', children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },

    remove (node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    unFoldAll () {
      let self = this;
      let list = this.data;
      for (let i = 0; i < list.length; i++) {
        self.$refs.selectTree.store.nodesMap[list[i].id].expanded = true
      }
    },
    collapseAll () {
      let self = this;
      let list = this.data;
      for (let i = 0; i < list.length; i++) {
        self.$refs.selectTree.store.nodesMap[list[i].id].expanded = false
      }
    },
    deleteUser (rowId) {
      this.$message.success('用户移除成功！')
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    getUserList (obj, node, data) {
      const res = {
        users: [{
          id: '481243921',
          serial: '1',
          fullname: '站点管理员',
          username: 'Administrator',
          secret: '绝密'
        }, {
          id: '481243922',
          serial: '2',
          fullname: '王小明',
          username: 'wangxiaoming',
          secret: '非密'
        }, {
          id: '481243923',
          serial: '3',
          fullname: '王小东',
          username: 'wangxiaoming',
          secret: '非密'
        }],
        total: 3
      };
      this.userlist = res.users;
      this.total = res.total;
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
  width: 100px;
}
</style>