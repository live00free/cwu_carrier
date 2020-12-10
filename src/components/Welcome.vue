<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="图统计" name="first">
        <el-row :gutter="24">
          <el-col :span="12">
            <div id="myChart1" class="myChart"></div>
          </el-col>
          <el-col :span="12">
            <div id="myChart2" class="myChart"></div>
          </el-col>
        </el-row>
        <el-row :gutter="24" :style="tuShow">
          <el-col :span="12">
            <div id="myChart3" class="myChart"></div>
          </el-col>
          <el-col :span="12">
            <div id="myChart4" class="myChart"></div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="表统计" name="second">
        <el-card>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form :inline="true" :model="queryInfo" class="demo-form-inline" size="mini">
                <el-form-item label="责任人" style="margin-left: 10px;">
                  <el-input v-model="queryInfo.fullName" placeholder="责任人"></el-input>
                </el-form-item>
                <el-form-item label="设备类型">
                  <el-select v-model="queryInfo.carrierType" placeholder="设备类型">
                    <el-option label="U盘" value="U盘"></el-option>
                    <el-option label="移动硬盘" value="移动硬盘"></el-option>
                    <el-option label="笔记本电脑" value="笔记本电脑"></el-option>
                    <el-option label="台式机" value="台式机"></el-option>
                    <el-option label="照相机" value="照相机"></el-option>
                    <el-option label="录音笔" value="录音笔"></el-option>
                    <el-option label="打印机" value="打印机"></el-option>
                    <el-option label="复印机" value="复印机"></el-option>
                    <el-option label="扫描仪" value="扫描仪"></el-option>
                    <el-option label="传真机" value="传真机"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="密级">
                  <el-select v-model="queryInfo.secret" placeholder="密级">
                    <el-option label="非密" value="非密"></el-option>
                    <el-option label="秘密" value="秘密"></el-option>
                    <el-option label="机密" value="机密"></el-option>
                    <el-option label="绝密" value="绝密"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="getCarrierList" plain icon="el-icon-search">查询</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="resetCarrierList" plain icon="el-icon-refresh-left">重置</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="downLoadCarriers" plain icon="el-icon-refresh-left">导出</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="4">
              <el-card class="unitcard">
                <el-row>
                  <el-col>
                    <el-tree :data="unitData" node-key="id" :indent="5" :expand-on-click-node="false" ref="selectTree" :highlight-current="true" @node-click="selectNode">
                      <span class="custom-tree-node" slot-scope="{ node}">
                        <span>{{ node.label }}</span>
                      </span>
                    </el-tree>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="20">
              <el-card class="unitusercard">
                <el-row>
                  <el-col :span="24">
                    <el-table :data="carrierlist" :header-cell-style="{background:'#d3e0def5',color:'#303133'}" style="width: 100%;height: 100%" border :highlight-current-row=true :row-style="{height:'50px'}" :cell-style="{padding:'0'}">
                      <el-table-column prop="carrierId" label="ID" v-if="false" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="serial" label="序号" fixed width="50" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="unit" label="单位" width="150" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="fullName" label="责任人" width="150" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="number" label="保密编号" fixed width="150" header-align="center" align="center">
                        <template slot-scope='scope'>
                          <router-link v-bind:to="{path:'/home/detail',query:{carrierId:scope.row.carrierId,page:'welcome'}}">{{scope.row.number}}</router-link>
                        </template>
                      </el-table-column>
                      <el-table-column prop="carrierType" label="设备类型" fixed width="150" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="secret" label="密级" width="150" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="useFor" label="位置" width="150" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="useDate" label="购买日期" width="150" :formatter="dateFormater" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="zhuceDate" label="注册日期" width="150" :formatter="dateFormater" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="product" label="品牌型号" width="150" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="proSerial" label="产品序列号" width="250" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="useState" label="使用情况" width="150" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="gqState" label="光驱情况" width="150" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="wkState" label="无线网卡情况" width="150" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="lanYa" label="蓝牙情况" width="150" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="hongWai" label="红外情况" width="150" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="systemVersion" label="操作系统版本" width="150" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="systemDate" label="操作系统安装日期" width="150" :formatter="dateFormater" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="bmSysDate" label="保密系统安装日期" width="150" :formatter="dateFormater" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="ypSerial" label="硬盘序列号" width="250" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="networkSate" label="入网情况" width="250" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="creatorName" label="创建者" width="150" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="creatorDate" label="创建时间" width="160" :formatter="dateFormat" header-align="center" align="center"></el-table-column>
                      <el-table-column prop="carrierName" label="设备名称" width="160" header-align="center" align="center"></el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
                <el-row>
                  <el-pagination @current-change="handleCurrentChange" background :page-size="queryInfo.pageSize" layout="total, prev, pager, next, jumper" :total="total">
                  </el-pagination>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      unitData: [],
      activeName: 'first',
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
      addDialogVisible: false,
      stateData: []
    }
  },
  created () {
    this.getCarrierList();
    this.showTu();
    this.getStateData();
    this.getTypeData();
    this.getUnitData();
    this.getUnitList();
    this.getSecretData();
  },
  methods: {
    handleClick (tab, event) {

    },
    async downLoadCarriers () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      this.$http({
        method: "post",
        url: "carrier/main/downLoadCarriers",
        data: this.queryInfo,
        responseType: "blob"
      })
        .then(res => {
          // console.log(decodeURI(res.headers['filename']));
          const link = document.createElement("a");
          let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
          link.style.display = "none";
          link.href = URL.createObjectURL(blob);
          link.setAttribute("download", decodeURI(res.headers['filename']));
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(error => {
          this.$Notice.error({
            title: "错误",
            desc: "系统数据错误"
          });
          console.log(error);
        });
    },
    async getUnitList () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.get('carrier/unit/findAll');
      if (res.code == 200) {
        this.unitData = JSON.parse(JSON.stringify(res.data))
      }

    },
    selectNode (obj, node, data) {
      this.queryInfo.unit = node.data.label;
      this.getCarrierList();
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage
      this.getUserList()
    },
    async getCarrierList () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.post('carrier/overview/findAllCarriers', this.queryInfo)
      if (res.code !== 200) {
        return this.$message.error('获取设备列表失败！');
      }
      this.carrierlist = res.data.datas;
      this.total = res.data.total;
    },
    async getStateData () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.get('carrier/overview/findStateData');
      //单位数量统计
      let myChart3 = this.$echarts.init(document.getElementById('myChart3'));
      // 绘制图表
      myChart3.setOption({
        title: {
          text: '各单位数量统计',
          textStyle: {
            color: '#2f89cf'
          },
          padding: [15, 0, 0, 250]
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          //坐标轴斜着显示
          axisLabel: {
            interval: 0,
            rotate: 40
          },
          data: res.data.types
        },
        yAxis: {},
        series: [{
          name: '数量',
          type: 'bar',
          barWidth: 20,
          data: res.data.counts,
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
    async getTypeData () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.get('carrier/overview/findTypeData');
      let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
      // 绘制图表
      myChart1.setOption({
        title: {
          text: '设备类型数量统计',
          textStyle: {
            color: '#2f89cf'
          },
          padding: [15, 0, 0, 250]
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          //坐标轴斜着显示
          axisLabel: {
            interval: 0,
            rotate: 40
          },
          data: res.data.types
        },
        yAxis: {},
        series: [{
          name: '数量',
          type: 'bar',
          barWidth: 20,
          data: res.data.counts,
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
    async getSecretData () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.get('carrier/overview/findSecretData');
      let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      myChart2.setOption({
        title: {
          text: '设备密级数量统计',
          textStyle: {
            color: '#2f89cf'
          },
          padding: [15, 0, 0, 250]
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          //坐标轴斜着显示
          axisLabel: {
            interval: 0,
            rotate: 40
          },
          data: res.data.types
        },
        yAxis: {},
        series: [{
          name: '数量',
          type: 'bar',
          barWidth: 20,
          data: res.data.counts,
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
      let myChart4 = this.$echarts.init(document.getElementById('myChart4'))
      // 绘制图表
      myChart4.setOption({
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
    async showTu () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.get('carrier/user/findLoginUser');
      if (res.role != "一级管理员") {
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
    }
  }
}
</script>
<style lang="less" scoped>
.myChart {
  margin: 0 auto;
  width: 100%;
  height: 300px;
  border: 1px solid #96c2f1;
  background: #eff7ff;
  text-align: center;
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
.unitcard {
  // width: 40%;
  height: 600px;
  padding: 0;
}
.unitusercard {
  height: 600px;
  padding: 0;
}
.toucard {
  //   height: 600px;
  padding: 0 !important;
}
.el-col {
  padding: 0 !important;
}
.rowcard {
  margin: 0 !important;
  border: 0 !important;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  padding-right: 0px;
}
</style>