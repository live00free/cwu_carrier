<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>总览</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card>
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="item in 4" :key="item">
          <div :id="myChart(item)" :style="{width: '600px', height: '300px'}" class="myChart"></div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
    <el-card>
      <el-row>
        <el-col :span="24">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
            <el-form-item label="领用人" style="margin-left: 30px;">
              <el-input v-model="formInline.user" placeholder="领用人"></el-input>
            </el-form-item>
            <el-form-item label="载体类型">
              <el-select v-model="formInline.region" placeholder="载体类型">
                <el-option label="U盘" value="upan"></el-option>
                <el-option label="移动硬盘" value="ydpan"></el-option>
                <el-option label="光盘" value="gpan"></el-option>
                <el-option label="软盘" value="ruanpan"></el-option>
                <el-option label="闪存盘" value="shcpan"></el-option>
                <el-option label="磁带" value="cipan"></el-option>
                <el-option label="笔记本电脑" value="yddiannao"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="密级">
              <el-select v-model="formInline.miji" placeholder="密级">
                <el-option label="公开" value="gongkai"></el-option>
                <el-option label="内部" value="neibu"></el-option>
                <el-option label="秘密" value="mimi"></el-option>
                <el-option label="机密" value="jimi"></el-option>
                <el-option label="绝密" value="juemi"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="使用情况">
              <el-select v-model="formInline.usage" placeholder="使用情况">
                <el-option label="在用" value="zaiyong"></el-option>
                <el-option label="停用" value="tingyong"></el-option>
                <el-option label="转借" value="zhuanjie"></el-option>
                <el-option label="移交" value="yijiao"></el-option>
                <el-option label="销毁" value="xiaohui"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" plain icon="el-icon-search">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table :data="carrierlist" :header-cell-style="{background:'#d3e0def5',color:'#303133'}" style="width: 100%;height: 100%" border :highlight-current-row=true :row-style="{height:'50px'}" :cell-style="{padding:'0'}">
            <el-table-column prop="serial" label="序号" fixed width="50" header-align="center" align="center"></el-table-column>
            <el-table-column prop="number" label="编号" fixed width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="carriertype" label="载体类型" fixed width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="fullname" label="领用人" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="unit" label="单位" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="secret" label="密级" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="usefor" label="用途" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="usedate" label="领用日期" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="product" label="品牌型号" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="proserial" label="产品序列号" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="size" label="容量" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="usestate" label="使用情况" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="procolor" label="颜色" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="gqstate" label="光驱情况" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="wkstate" label="无线网卡情况" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="systemversion" label="操作系统版本" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="systemdate" label="系统安装日期" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="ypserial" label="硬盘序列号" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="ypsize" label="硬盘容量" width="150" header-align="center" align="center"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-pagination @current-change="handleCurrentChange" background :page-size="queryInfo.pagesize" layout="total, prev, pager, next, jumper" :total="total">
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
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 10
      },
      formInline: {
        user: '',
        region: '',
        miji: '',
        usage: ''
      },
      carrierlist: [],
      addDialogVisible: false
    }
  },
  mounted () {
    this.drawLine();
  },
  created () {
    this.getCarrierList()
  },
  methods: {
    onSubmit () {
      console.log('submit!');
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    async getCarrierList () {
      const res = {
        carriers: [
          {
            serial: '1',
            number: 'ZT-0001',
            carriertype: 'U盘',
            fullname: '小明',
            unit: '单位1',
            secret: '秘密',
            usefor: '存储',
            usedate: "2020-09-08",
            product: '索尼',
            proserial: '23aea4124124s',
            size: '64G',
            usestate: '在用',
            procolor: '蓝色',
            gqstate: '',
            wkstate: '',
            systemversion: '',
            systemdate: '',
            ypserial: '',
            ypsize: ''
          },
          {
            serial: '2',
            number: 'ZT-0002',
            carriertype: 'U盘',
            fullname: '小红',
            unit: '单位1',
            secret: '非密',
            usefor: '存储',
            usedate: "2020-09-08",
            product: '金斯顿',
            proserial: '23aea4124124s',
            size: '64G',
            usestate: '在用',
            procolor: '蓝色',
            gqstate: '',
            wkstate: '',
            systemversion: '',
            systemdate: '',
            ypserial: '',
            ypsize: ''
          },
          {
            serial: '3',
            number: 'ZT-0003',
            carriertype: '笔记本电脑',
            fullname: '小李',
            unit: '单位2',
            secret: '秘密',
            usefor: '办公',
            usedate: "2020-09-04",
            product: '联想',
            proserial: '23aea4124124s',
            size: '',
            usestate: '在用',
            procolor: '黑色',
            gqstate: '无',
            wkstate: '无',
            systemversion: 'win7',
            systemdate: '2020-09-08',
            ypserial: 'aweg3242gshgae',
            ypsize: '500G'
          }
        ], total: 3
      };
      this.carrierlist = res.carriers;
      this.total = res.total;
    },
    drawLine () {
      // 载体类型数量
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
          data: ['U盘', '移动硬盘', '光盘', '软盘', '闪存盘', '磁带', '笔记本']
        },
        yAxis: {},
        series: [{
          name: '数量',
          type: 'bar',
          barWidth: 20,
          data: [500, 280, 386, 190, 107, 207, 452],
          itemStyle: {
            normal: {
              color: '#2f89cf',
              opacity: 1,
              barBorderRadius: 5
            }
          }
        }]
      });

      //单位数量统计
      let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      // 绘制图表
      myChart2.setOption({
        title: {
          //   text: '单位载体数量统计',
          //   textStyle: {
          //     color: '#f6f2f2'
          //   },
          //   padding: [15, 0, 0, 250]
        },
        tooltip: {},
        xAxis: {
          data: ['单位1', '单位2', '单位3', '单位4', '单位5']
        },
        yAxis: {},
        series: [{
          name: '数量',
          type: 'bar',
          barWidth: 20,
          data: [500, 280, 386, 190, 107],
          itemStyle: {
            normal: {
              color: '#2f89cf',
              opacity: 1,
              barBorderRadius: 5
            }
          }
        }]
      });

      //状态统计
      let myChart3 = this.$echarts.init(document.getElementById('myChart3'))
      // 绘制图表
      myChart3.setOption({

        title: {
          //   text: '使用状态统计图',
          //   textStyle: {
          //     color: '#f6f2f2'
          //   },
          //   left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: ['在用', '停用', '转借', '移交', '销毁']
        },
        series: [{
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: [
            { value: 10, name: '在用' },
            { value: 5, name: '停用' },
            { value: 15, name: '转借' },
            { value: 25, name: '移交' },
            { value: 20, name: '销毁' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      });

      //組合统计
      let myChart4 = this.$echarts.init(document.getElementById('myChart4'))
      // 绘制图表
      myChart4.setOption({

        title: {
          //   text: '使用状态统计图',
          //   textStyle: {
          //     color: '#f6f2f2'
          //   },
          //   left: 'bottom'
        },
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['数量', 'U盘', '移动硬盘', '光盘', '软盘', '闪存盘', '磁带', '笔记本'],
            ['单位1', 12, 20, 25, 20, 18, 35, 16],
            ['单位2', 22, 10, 23, 10, 10, 15, 26],
            ['单位3', 32, 40, 15, 25, 28, 20, 36]
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [
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
</style>