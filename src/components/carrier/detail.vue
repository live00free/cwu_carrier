<template>
  <div>
    <el-card>
      <el-page-header @back="goBack" content="详情页面">
      </el-page-header>
    </el-card>
    <el-card>
      <el-divider content-position="left">
        <el-tag type="success">{{carrierDTO.number}}详细信息</el-tag>
      </el-divider>
      <el-form :model="carrierDTO" label-width="110px" label-position="right" size="mini">
        <el-row :gutter="24">
          <el-col :span="16">
            <el-card shadow="never">
              <el-row :gutter="24">
                <el-col :span="8">
                  <el-form-item label="保密编号:">
                    <span>{{carrierDTO.number}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="使用情况:">
                    <span>{{carrierDTO.useState}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="设备类型:">
                    <span>{{carrierDTO.carrierType}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="8">
                  <el-form-item label="密级:">
                    <span>{{carrierDTO.secret}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="单位:">
                    <span>{{carrierDTO.unit}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="部门:">
                    <span>{{carrierDTO.department}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="8">
                  <el-form-item label="位置:">
                    <span>{{carrierDTO.useFor}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="购买日期:">
                    <span>{{spanDateFormater(carrierDTO.useDate)}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="品牌型号:">
                    <span>{{carrierDTO.product}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="8">
                  <el-form-item label="产品序列号:">
                    <span>{{carrierDTO.proSerial}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="责任人:" prop="fullName">
                    <span>{{carrierDTO.fullName}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="注册日期:" prop="zhuceDate">
                    <span>{{carrierDTO.zhuceDate}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24" :style="pcmesgshow">
                <el-col :span="8">
                  <el-form-item label="光驱:">
                    <span>{{carrierDTO.gqState}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="无线网卡:">
                    <span>{{carrierDTO.wkState}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="操作系统版本:">
                    <span>{{carrierDTO.systemVersion}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24" :style="pcmesgshow">
                <el-col :span="8">
                  <el-form-item label="蓝牙:">
                    <span>{{carrierDTO.lanYa}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="红外:">
                    <span>{{carrierDTO.hongWai}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="入网情况:">
                    <span>{{carrierDTO.networkSate}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24" :style="pcmesgshow">
                <el-col :span="8">
                  <el-form-item label="操作系统安装日期:" label-width="140px">
                    <span>{{spanDateFormater(carrierDTO.systemDate)}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="保密系统安装日期:" label-width="140px">
                    <span>{{spanDateFormater(carrierDTO.bmSysDate)}}</span>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row :gutter="24" :style="pcmesgshow">
                <el-col :span="12">
                  <el-form-item label="MAC地址:">
                    <span>{{carrierDTO.macAddress}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="硬盘序列号:">
                    <span>{{carrierDTO.ypSerial}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-form>
      <el-divider content-position="left">
        <el-tag type="success">{{carrierDTO.number}}修改记录</el-tag>
      </el-divider>
      <el-row :gutter="24">
        <el-col :span="24">
          <el-table :data="carrierlist" :header-cell-style="{background:'#d3e0def5',color:'#303133'}" style="width: 100%;height: 100%" border :highlight-current-row=true :row-style="{height:'50px'}" :cell-style="{padding:'0'}">
            <el-table-column prop="carrierId" label="ID" v-if="false" header-align="center" align="center"></el-table-column>
            <el-table-column prop="serial" label="序号" fixed width="50" header-align="center" align="center"></el-table-column>
            <el-table-column prop="updateUserName" label="修改者" fixed width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间" fixed width="160" :formatter="dateFormat" header-align="center" align="center"></el-table-column>
            <el-table-column prop="number" label="保密编号" fixed width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="carrierType" label="设备类型" fixed width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="fullName" label="责任人" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="unit" label="单位" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="department" label="部门" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="secret" label="密级" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="useFor" label="位置" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="useDate" label="购买日期" width="160" :formatter="dateFormater" header-align="center" align="center"></el-table-column>
            <el-table-column prop="zhuceDate" label="注册日期" width="150" :formatter="dateFormater" header-align="center" align="center"></el-table-column>
            <el-table-column prop="product" label="品牌型号" width="250" header-align="center" align="center"></el-table-column>
            <el-table-column prop="proSerial" label="产品序列号" width="150" header-align="center" align="center"></el-table-column>
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
    </el-card>

  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      carrierId: '',
      pageType: '',
      carrierDTO: {},
      pcmesgshow: "display:none;",
      carrierlist: []
    }
  },
  created () {
    this.carrierId = this.$route.query.carrierId;
    this.pageType = this.$route.query.page;
    this.getCarrierDetail();
    this.getCarrierHistorys();
  },
  methods: {
    async getCarrierDetail () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.get('carrier/main/carrierDetail/' + this.carrierId);
      if (res.code !== 200) {
        return this.$message.error(res.msg);
      }
      if (res.data.carrierType && res.data.carrierType == "笔记本电脑") {
        this.pcmesgshow = "display:block;";
      }
      this.carrierDTO = res.data;

    },
    async getCarrierHistorys () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.get('carrier/main/findHistoryCarriers/' + this.carrierId);
      if (res.code !== 200) {
        return this.$message.error(res.msg);
      }
      this.carrierlist = res.data.datas;

    },
    goBack () {
      if (this.pageType == "carrier") {
        this.$router.push('/home/carrier');
      } else if (this.pageType == "welcome") {
        this.$router.push('/home/welcome');
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
    spanDateFormater (daterc) {
      if (daterc != null) {
        const dateMat = new Date(daterc);
        const year = dateMat.getFullYear();
        const month = dateMat.getMonth() + 1;
        const day = dateMat.getDate();
        const hh = dateMat.getHours();
        const mm = dateMat.getMinutes();
        const ss = dateMat.getSeconds();
        const timeFormat = year + "-" + month + "-" + day;
        return timeFormat;
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
<style lang="less">
.el-form-item__label {
  color: #3c6aab !important;
}
</style>

