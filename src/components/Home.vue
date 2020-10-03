<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/doc.png" alt="">
        <span class="sys-title">涉密载体登记管理系统</span>
      </div>
      <span class="user-title" style="margin-left:55%">欢迎登录 Administrator</span>
      <el-button type="info" icon="el-icon-switch-button" @click="logout" circle></el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#2f4052" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
          <!-- 一级菜单 -->
          <el-menu-item :index="menurouter.welcome" @click="saveNavState(menurouter.welcome)">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>总览</span>
            </template>
          </el-menu-item>
          <el-menu-item :index="menurouter.carrier" @click="saveNavState(menurouter.carrier)">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>载体管理</span>
            </template>
          </el-menu-item>
          <el-menu-item :index="menurouter.user" @click="saveNavState(menurouter.user)">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>人员管理</span>
            </template>
          </el-menu-item>
          <el-menu-item :index="menurouter.unit" @click="saveNavState(menurouter.unit)">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span>单位管理</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      activePath: '',
      isCollapse: false,
      menurouter: {
        welcome: '/home/welcome',
        user: '/home/users',
        carrier: '/home/carrier',
        unit: '/home/unit',
      }
    }
  },
  created () {
    let atPath = window.sessionStorage.getItem('activePath');
    if (atPath) {
      this.activePath = atPath;
    } else {
      this.activePath = '/home/welcome';
    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear();
      this.$router.push('/login');
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse;
    },
    // 保存链接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath);
      this.activePath = activePath;
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #114da0d6;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #2f4052;
}
.el-menu {
  border-right: none;
}

.el-main {
  background-color: #ffffff;
  padding: 0;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #105fa3c4;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.el-button--success {
  height: 30px;
  padding: 0;
  line-height: 30px;
  width: 80px;
}

.el-menu-item {
  border-left: #fff solid 6px;
}

//设置鼠标悬停时el-menu-item的样式
.el-menu-item:hover {
  border-left: #33a2ef solid 6px !important;
  background-color: #627380e8 !important;
  color: #38b2ff !important;

  //less语法，实现鼠标悬停时icon变色
  i {
    color: #38b2ff;
  }
}

//设置选中el-menu-item时的样式
.el-menu-item.is-active {
  border-left: #33a2ef solid 6px !important;
  background-color: #627380e8 !important;
  color: #38b2ff !important;
}
.sys-title {
  font-size: 25px;
  color: #ffffff;
  font-family: "宋体";
  font-weight: bold;
}
.user-title {
  font-size: 20px;
  color: #ffffff;
  font-family: "宋体";
  font-weight: bold;
}
</style>
<style lang="less">
//设置了默认左边框为白色
.el-submenu .el-submenu__title {
  border-left: #fff solid 6px;
}

//设置鼠标悬停时el-submenu的样式
.el-submenu .el-submenu__title:hover {
  border-left: #33a2ef solid 6px !important;
  background-color: #627380e8 !important;
  color: #38b2ff !important;
  i {
    color: #38b2ff;
  }
}
</style>