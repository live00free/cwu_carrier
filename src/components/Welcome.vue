<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>总览</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card :style="tuShow">
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="item in 3" :key="item">
          <div :id="myChart(item)" :style="{width: '600px', height: '300px'}" class="myChart"></div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
    <el-card>
      <el-row>
        <el-col :span="24">
          <el-form :inline="true" :model="queryInfo" class="demo-form-inline" size="mini">
            <el-form-item label="领用人" style="margin-left: 30px;">
              <el-input v-model="queryInfo.fullName" placeholder="领用人"></el-input>
            </el-form-item>
            <el-form-item label="载体类型">
              <el-select v-model="queryInfo.carrierType" placeholder="载体类型">
                <el-option label="U盘" value="U盘"></el-option>
                <el-option label="移动硬盘" value="移动硬盘"></el-option>
                <el-option label="光盘" value="光盘"></el-option>
                <el-option label="软盘" value="软盘"></el-option>
                <el-option label="闪存盘" value="闪存盘"></el-option>
                <el-option label="磁带" value="磁带"></el-option>
                <el-option label="笔记本电脑" value="笔记本电脑"></el-option>
                <el-option label="台式机" value="台式机"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="密级">
              <el-select v-model="queryInfo.secret" placeholder="密级">
                <el-option label="非密" value="非密"></el-option>
                <el-option label="内部" value="内部"></el-option>
                <el-option label="秘密" value="秘密"></el-option>
                <el-option label="机密" value="机密"></el-option>
                <el-option label="绝密" value="绝密"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="使用情况">
              <el-select v-model="queryInfo.useState" placeholder="使用情况">
                <el-option label="在用" value="在用"></el-option>
                <el-option label="停用" value="停用"></el-option>
                <el-option label="转借" value="转借"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getCarrierList" plain icon="el-icon-search">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="resetCarrierList" plain icon="el-icon-refresh-left">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table :data="carrierlist" :header-cell-style="{background:'#d3e0def5',color:'#303133'}" style="width: 100%;height: 100%" border :highlight-current-row=true :row-style="{height:'50px'}" :cell-style="{padding:'0'}">
            <el-table-column prop="carrierId" label="ID" v-if="false" header-align="center" align="center"></el-table-column>
            <el-table-column prop="serial" label="序号" fixed width="50" header-align="center" align="center"></el-table-column>
            <el-table-column prop="number" label="编号" fixed width="150" header-align="center" align="center">
              <template slot-scope='scope'>
                <router-link v-bind:to="{path:'/home/detail',query:{carrierId:scope.row.carrierId,page:'welcome'}}">{{scope.row.number}}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="carrierType" label="载体类型" fixed width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="fullName" label="领用人" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="useName" label="使用人" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="unit" label="单位" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="department" label="部门" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="secret" label="密级" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="useFor" label="用途" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="useDate" label="领用日期" width="150" :formatter="dateFormater" header-align="center" align="center"></el-table-column>
            <el-table-column prop="product" label="品牌型号" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="proSerial" label="产品序列号" width="250" header-align="center" align="center"></el-table-column>
            <el-table-column prop="size" label="容量" width="150" :formatter="sizeFormater" header-align="center" align="center"></el-table-column>
            <el-table-column prop="useState" label="使用情况" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="proColor" label="颜色" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="gqState" label="光驱情况" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="wkState" label="无线网卡情况" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="systemVersion" label="操作系统版本" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="systemDate" label="系统安装日期" width="150" :formatter="dateFormat" header-align="center" align="center"></el-table-column>
            <el-table-column prop="ypSerial" label="硬盘序列号" width="250" header-align="center" align="center"></el-table-column>
            <el-table-column prop="ypSize" label="硬盘容量" width="150" :formatter="sizeFormater" header-align="center" align="center"></el-table-column>
            <el-table-column prop="creatorName" label="创建者" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="creatorDate" label="创建时间" width="160" :formatter="dateFormat" header-align="center" align="center"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-pagination @current-change="handleCurrentChange" background :page-size="queryInfo.pageSize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      queryInfo: {
        unit: '',
        fullName: '',
        carrierType: '',
        secret: '',
        useState: '',
        useName: '',
        // 当前的页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 10
      },
      tuShow: "display:block;",
      total: 0,
      carrierlist: [],
      unitOptions: [],
      addDialogVisible: false,
      stateData: []
    }
  },
  created () {
    this.getCarrierList();
    this.getUserUnits();
    this.showTu();
    this.getStateData();
    this.getTypeData();
    this.getUnitData();
  },
  methods: {
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage
      this.getUserList()
    },
    async getCarrierList () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.post('carrier/overview/findAllCarriers', this.queryInfo)
      if (res.code !== 200) {
        return this.$message.error('获取载体列表失败！');
      }
      this.carrierlist = res.data.datas;
      this.total = res.data.total;
    },
    async getStateData () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.get('carrier/overview/findStateData');
      //单位数量统计
      let myChart2 = this.$echarts.init(document.getElementById('myChart2'));
      // 绘制图表
      myChart2.setOption({
        legend: {},
        tooltip: {},
        dataset: {
          source: res.data
        },
        xAxis: { type: 'category' },
        yAxis: {},
        dataZoom: [
          {
            show: true,
            start: 0,
            end: 80
          },
          {
            type: 'inside',
            start: 0,
            end: 80
          },
          {
            show: true,
            yAxisIndex: 0,
            filterMode: 'empty',
            width: 30,
            height: '80%',
            showDataShadow: false,
            left: '93%'
          }
        ],
        series: [
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' }
        ]
      });
    },
    async getTypeData () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.get('carrier/overview/findTypeData');
      let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
      // 绘制图表
      myChart1.setOption({
        title: {
          //   text: '载体类型数量统计',
          //   textStyle: {
          //     color: '#f6f2f2'
          //   },
          //   padding: [15, 0, 0, 250]
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          //坐标轴斜着显示
          axisLabel: {
            interval: 0,
            rotate: 40
          },
          data: ['U盘', '移动硬盘', '光盘', '软盘', '闪存盘', '磁带', '笔记本电脑', '台式机']
        },
        yAxis: {},
        series: [{
          name: '数量',
          type: 'bar',
          barWidth: 20,
          data: res.data,
          itemStyle: {
            normal: {
              color: '#2f89cf',
              opacity: 1,
              barBorderRadius: 5
            }
          }
        }]
      });
    },
    async getUnitData () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.get('carrier/overview/findUnitData');
      let myChart3 = this.$echarts.init(document.getElementById('myChart3'))
      // 绘制图表
      myChart3.setOption({
        legend: {},
        tooltip: {},
        dataset: {
          source: res.data
        },
        xAxis: { type: 'category' },
        yAxis: {},
        dataZoom: [
          {
            show: true,
            start: 0,
            end: 30
          },
          {
            type: 'inside',
            start: 0,
            end: 30
          },
          {
            show: true,
            yAxisIndex: 0,
            filterMode: 'empty',
            width: 30,
            height: '80%',
            showDataShadow: false,
            left: '93%'
          }
        ],
        series: [
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' }
        ]
      });
    },
    resetCarrierList () {
      this.queryInfo.unit = '';
      this.queryInfo.fullName = '';
      this.queryInfo.carrierType = '';
      this.queryInfo.secret = '';
      this.queryInfo.useState = '';
      this.queryInfo.useName = '';
      this.getCarrierList();
    },
    async getUserUnits () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.get('carrier/unit/findAllUnits')
      if (res.code !== 200) {
        return this.$message.error('获取单位列表失败！');
      }
      this.unitOptions = res.data;
    },
    async showTu () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.get('carrier/user/findLoginUser');
      if (res.role == "普通用户") {
        this.tuShow = "display:none;";
      }
    },
    dateFormat (row, column, cellValue, index) {
      const daterc = row[column.property]
      if (daterc != null) {
        const dateMat = new Date(daterc);
        const year = dateMat.getFullYear();
        const month = dateMat.getMonth() + 1;
        const day = dateMat.getDate();
        const hh = dateMat.getHours();
        const mm = dateMat.getMinutes();
        const ss = dateMat.getSeconds();
        const timeFormat = year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
        return timeFormat;
      }
    },
    dateFormater (row, column, cellValue, index) {
      const daterc = row[column.property]
      if (daterc != null) {
        const dateMat = new Date(daterc);
        const year = dateMat.getFullYear();
        const month = dateMat.getMonth() + 1;
        const day = dateMat.getDate();
        const timeFormat = year + "-" + month + "-" + day;
        return timeFormat;
      }
    },
    sizeFormater (row, column, cellValue, index) {
      if (cellValue) {
        return cellValue + "G";
      }
      return "";
    },
    myChart (item) {
      return "myChart" + item;
    }
  }
}
</script>
<style lang="less" scoped>
.myChart {
  margin: 0 auto;
}

.el-carousel__item:nth-child(2n) {
  background-color: #bce38c;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #79ebc9;
}
.el-input--mini {
  width: 150px;
}
.el-select--mini {
  width: 180px;
}
.el-button--primary {
  height: 25px;
  padding: 0;
  line-height: 25px;
  width: 120px;
}
</style>