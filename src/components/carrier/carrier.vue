<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>载体管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card shadow="never">
      <el-form :inline="true" :model="queryInfo" class="demo-form-inline" size="mini" ref="selectFormRef">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="使用情况">
              <el-select v-model="queryInfo.useState" placeholder="使用情况">
                <el-option label="在用" value="在用"></el-option>
                <el-option label="停用" value="停用"></el-option>
                <!-- <el-option label="转借" value="转借"></el-option> -->
              </el-select>
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
                <el-option label="照相机" value="照相机"></el-option>
                <el-option label="录音笔" value="录音笔"></el-option>
                <el-option label="打印机" value="打印机"></el-option>
                <el-option label="复印机" value="复印机"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="密级">
              <el-select v-model="queryInfo.secret" placeholder="密级">
                <el-option label="公开" value="公开"></el-option>
                <el-option label="内部" value="内部"></el-option>
                <el-option label="秘密" value="秘密"></el-option>
                <el-option label="机密" value="机密"></el-option>
                <el-option label="绝密" value="绝密"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="责任人">
              <el-input v-model="queryInfo.fullName" placeholder="责任人"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getCarrierList" plain icon="el-icon-search">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="resetCarrierList" plain icon="el-icon-refresh-left">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-divider class="el-divider--horizontal2"></el-divider>
      <el-row style="margin-bottom:5px" :gutter="24">
        <el-col :span="12" :offset="12">
          <el-button type="primary" plain @click="addDialogVisible = true" icon="el-icon-circle-plus">新建</el-button>
          <el-button type="primary" plain icon="el-icon-edit" @click="editCarrierWd" :disabled="limit.updateCarrier">修改</el-button>
          <el-button type="primary" plain icon="el-icon-delete" @click="deleteCarrier" :disabled="limit.deleteCarrier">删除</el-button>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              更多操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-upload2" command="a">批量导入</el-dropdown-item>
              <el-dropdown-item icon="el-icon-download" command="b">批量导出</el-dropdown-item>
              <el-dropdown-item icon="el-icon-video-pause" command="c">停用</el-dropdown-item>
              <!-- <el-dropdown-item icon="el-icon-share" command="d">转借</el-dropdown-item> -->
              <el-dropdown-item icon="el-icon-right" command="e">移交</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table :data="carrierlist" :header-cell-style="{background:'#d3e0def5',color:'#303133'}" ref="multipleTable" style="width: 100%;height: 100%" border :highlight-current-row=true :row-style="{height:'50px'}" :cell-style="{padding:'0'}">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="carrierId" label="ID" v-if="false" header-align="center" align="center"></el-table-column>
            <el-table-column prop="serial" label="序号" fixed width="50" header-align="center" align="center"></el-table-column>
            <el-table-column prop="number" label="保密编号" fixed width="150" header-align="center" align="center">
              <template slot-scope='scope'>
                <router-link v-bind:to="{path:'/home/detail',query:{carrierId:scope.row.carrierId,page:'carrier'}}">{{scope.row.number}}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="carrierType" label="载体类型" fixed width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="fullName" label="责任人" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="unit" label="单位" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="department" label="部门" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="secret" label="密级" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="useFor" label="位置" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="useDate" label="领用日期" width="150" :formatter="dateFormater" header-align="center" align="center"></el-table-column>
            <el-table-column prop="product" label="品牌型号" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="proSerial" label="产品序列号" width="250" header-align="center" align="center"></el-table-column>
            <el-table-column prop="useState" label="使用情况" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="gqState" label="光驱情况" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="wkState" label="无线网卡情况" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="systemVersion" label="操作系统版本" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="systemDate" label="系统安装日期" width="160" :formatter="dateFormat" header-align="center" align="center"></el-table-column>
            <el-table-column prop="ypSerial" label="硬盘序列号" width="250" header-align="center" align="center"></el-table-column>
            <el-table-column prop="networkSate" label="入网情况" width="250" header-align="center" align="center"></el-table-column>
            <el-table-column prop="creatorName" label="创建者" width="150" header-align="center" align="center"></el-table-column>
            <el-table-column prop="creatorDate" label="创建时间" width="160" :formatter="dateFormat" header-align="center" align="center"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-pagination @current-change="handleCurrentChange" background :page-size="queryInfo.pageSize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-row>
      <el-dialog title="载体录入" :visible.sync="addDialogVisible" width="45%" @close="addDialogClosed" center>
        <!-- 内容主体区域 -->
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="right" size="small">
          <el-card shadow="never">
            <el-row :gutter="24">
              <el-col :span="10" :offset="1">
                <el-form-item label="保密编号" prop="number">
                  <el-input v-model="addForm.number">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item label="使用情况" prop="useState">
                  <el-select v-model="addForm.useState" placeholder="请选择">
                    <el-option v-for="item in usestateoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="10" :offset="1">
                <el-form-item label="载体类型" prop="carrierType">
                  <el-select v-model="addForm.carrierType" placeholder="请选择" @change="elcardStyle()">
                    <el-option v-for="item in carriertypeoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item label="密级" prop="secret">
                  <el-select v-model="addForm.secret" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="10" :offset="1">
                <el-form-item label="单位" prop="unit">
                  <el-select v-model="addForm.unit" placeholder="请选择">
                    <el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item label="部门" prop="department">
                  <el-input v-model="addForm.department">
                    <el-button slot="append" icon="el-icon-s-home" @click="openSelectDp"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="10" :offset="1">
                <el-form-item label="位置" prop="useFor">
                  <el-input v-model="addForm.useFor"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item label="领用日期" prop="useDate">
                  <el-date-picker v-model="addForm.useDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="10" :offset="1">
                <el-form-item label="品牌型号" prop="product">
                  <el-input v-model="addForm.product"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item label="产品序列号" prop="proSerial">
                  <el-input v-model="addForm.proSerial"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="10" :offset="1">
                <el-form-item label="责任人" prop="fullName">
                  <el-input v-model="addForm.fullName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
          <el-card shadow="never" :style="pcmesgshow">
            <el-row :gutter="24">
              <el-col :span="10" :offset="1">
                <el-form-item label="光驱" prop="gqState">
                  <el-radio-group v-model="addForm.gqState">
                    <el-radio label="有"></el-radio>
                    <el-radio label="无"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item label="无线网卡" prop="wkState">
                  <el-radio-group v-model="addForm.wkState">
                    <el-radio label="有"></el-radio>
                    <el-radio label="无"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="10" :offset="1">
                <el-form-item label="操作系统版本" prop="systemVersion">
                  <el-input v-model="addForm.systemVersion"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item label="系统安装日期" prop="systemDate">
                  <el-date-picker v-model="addForm.systemDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="10" :offset="1">
                <el-form-item label="硬盘序列号" prop="ypSerial">
                  <el-input v-model="addForm.ypSerial"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item label="入网情况" prop="networkSate">
                  <el-select v-model="addForm.networkSate" placeholder="请选择">
                    <el-option v-for="item in networkSateOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCarrier">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改对话框 -->
      <el-dialog title="载体信息修改" :visible.sync="editDialogVisible" width="45%" @close="editDialogClosed" center>
        <!-- 内容主体区域 -->
        <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="100px" label-position="right" size="mini">
          <el-card shadow="never">
            <el-row :gutter="24">
              <el-col :span="10" :offset="1">
                <el-form-item label="保密编号" prop="number">
                  <el-input v-model="editForm.number">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item label="使用情况" prop="useState">
                  <el-select v-model="editForm.useState" placeholder="请选择">
                    <el-option v-for="item in usestateoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="10" :offset="1">
                <el-form-item label="载体类型" prop="carrierType">
                  <el-select v-model="editForm.carrierType" placeholder="请选择" @change="elcardStyle()">
                    <el-option v-for="item in carriertypeoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item label="密级" prop="secret">
                  <el-select v-model="editForm.secret" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="10" :offset="1">
                <el-form-item label="单位" prop="unit">
                  <el-select v-model="editForm.unit" placeholder="请选择">
                    <el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item label="部门" prop="department">
                  <el-input v-model="editForm.department">
                    <el-button slot="append" icon="el-icon-s-home" @click="openSelectDpedit"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="10" :offset="1">
                <el-form-item label="位置" prop="useFor">
                  <el-input v-model="editForm.useFor"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item label="领用日期" prop="useDate">
                  <el-date-picker v-model="editForm.useDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="10" :offset="1">
                <el-form-item label="品牌型号" prop="product">
                  <el-input v-model="editForm.product"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item label="产品序列号" prop="proSerial">
                  <el-input v-model="editForm.proSerial"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="10" :offset="1">
                <el-form-item label="责任人" prop="fullName">
                  <el-input v-model="editForm.fullName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
          <el-card shadow="never" :style="pcmesgshow">
            <el-row :gutter="24">
              <el-col :span="10" :offset="1">
                <el-form-item label="光驱" prop="gqState">
                  <el-radio-group v-model="editForm.gqState">
                    <el-radio label="有"></el-radio>
                    <el-radio label="无"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item label="无线网卡" prop="wkState">
                  <el-radio-group v-model="editForm.wkState">
                    <el-radio label="有"></el-radio>
                    <el-radio label="无"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="10" :offset="1">
                <el-form-item label="操作系统版本" prop="systemVersion">
                  <el-input v-model="editForm.systemVersion"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item label="系统安装日期" prop="systemDate">
                  <el-date-picker v-model="editForm.systemDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="10" :offset="1">
                <el-form-item label="硬盘序列号" prop="ypSerial">
                  <el-input v-model="editForm.ypSerial"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item label="入网情况" prop="networkSate">
                  <el-select v-model="editForm.networkSate" placeholder="请选择">
                    <el-option v-for="item in networkSateOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-form>

        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editCarrier">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="载体批量导入" :visible.sync="uploadDialogVisible" width="30%" @close="uploadDialogClosed" center>
        <el-card shadow="never">
          <el-divider content-position="left">
            <el-tag type="success">导入模板下载</el-tag>
          </el-divider>
          <el-link type="primary" :underline="false" :href="fileURL" download="载体批量导入模板.xlsx" target="_blank">点击此链接下载载体批量导入模板</el-link>
          <el-divider content-position="left">
            <el-tag type="success">上传excel文件</el-tag>
          </el-divider>
          <el-upload class="upload-demo" ref="upload" drag :action="actionUrl" :auto-upload="false" :headers="myHeaders" :multiple="false" :before-upload="beforeUpload" :on-change="handleChange">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击选择文件</em></div>
            <div class="el-upload__tip" slot="tip">请上传.xslx格式的excel文件</div>
          </el-upload>
        </el-card>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="uploadDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitUpload">确 定</el-button>
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
      <el-dialog title="设置借用者" :visible.sync="borrowDialogVisible" width="40%" @close="borrowDialogClosed" center>
        <!-- 内容主体区域 -->
        <el-form :model="borrowForm" :rules="borrowFormRules" ref="borrowFormRef" label-width="100px" label-position="right" size="small">
          <el-card shadow="never">
            <el-row :gutter="24">
              <el-col :span="18" :offset="3">
                <el-form-item label="借用者" prop="userName">
                  <el-input v-model="borrowForm.userName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="borrowDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="borrow">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="设置移交接收人" :visible.sync="transferDialogVisible" width="40%" @close="transferDialogClosed" center>
        <!-- 内容主体区域 -->
        <el-form :model="transferForm" :rules="transferFormRules" ref="transferFormRef" label-width="100px" label-position="right" size="small">
          <el-card shadow="never">
            <el-row :gutter="24">
              <el-col :span="18" :offset="3">
                <el-form-item label="移交接收人" prop="userName">
                  <el-input v-model="transferForm.userName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="transferDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="transfer">确 定</el-button>
        </span>
      </el-dialog>
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
      borrowForm: { datas: [], userName: '' },
      borrowDialogVisible: false,
      transferForm: { datas: [], userName: '' },
      transferDialogVisible: false,
      fileURL: '载体批量导入模板.xlsx',
      actionUrl: this.$http.defaults.baseURL + '/carrier/main/importCarriers',
      editForm: {},
      total: 0,
      unitData: [],
      addFormRules: {
        carrierType: [
          { required: true, message: '请选择载体类型', trigger: 'blur' },
        ],
        secret: [
          { required: true, message: '请选择密级', trigger: 'blur' },
        ],
        useState: [
          { required: true, message: '请选择使用情况', trigger: 'blur' },
        ],
        fullName: [
          { required: true, message: '请输入责任人', trigger: 'blur' },
        ],
        unit: [
          { required: true, message: '请选择单位', trigger: 'blur' },
        ],
        product: [
          { required: true, message: '请输入品牌型号', trigger: 'blur' },
        ],
        gqState: "",
        ypSerial: "",
        wkState: "",
        ypSize: ""
      },
      borrowFormRules: {
        userName: [{ required: true, message: '请输入借用者姓名', trigger: 'blur' }]
      },
      transferFormRules: {
        userName: [{ required: true, message: '请输入移交接收人', trigger: 'blur' }]
      },
      pcmesgshow: "display:none;",
      carrierlist: [],
      addDialogVisible: false,
      editDialogVisible: false,
      uploadDialogVisible: false,
      selectdp: '',
      selectDepartmentDV: false,
      addForm: {
        serial: '',
        number: '',
        carrierType: '',
        fullName: '',
        useName: '',
        unit: '',
        department: '',
        secret: '',
        useFor: '',
        useDate: '',
        product: '',
        proSerial: '',
        useState: '',
        gqState: '',
        wkState: '',
        systemVersion: '',
        systemDate: '',
        ypSerial: '',
        networkSate: ''
      },
      carriertypeoptions: [{
        value: 'U盘',
        label: 'U盘'
      }, {
        value: '移动硬盘',
        label: '移动硬盘'
      }, {
        value: '光盘',
        label: '光盘'
      }, {
        value: '软盘',
        label: '软盘'
      }, {
        value: '闪存盘',
        label: '闪存盘'
      }, {
        value: '磁带',
        label: '磁带'
      }, {
        value: '笔记本电脑',
        label: '笔记本电脑'
      }, {
        value: '台式机',
        label: '台式机'
      }, {
        value: '照相机',
        label: '照相机'
      }, {
        value: '录音笔',
        label: '录音笔'
      }, {
        value: '打印机',
        label: '打印机'
      }, {
        value: '复印机',
        label: '复印机'
      }
      ],
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
      usestateoptions: [{
        value: '在用',
        label: '在用'
      }, {
        value: '停用',
        label: '停用'
      }],
      networkSateOptions: [{
        value: '单机',
        label: '单机'
      }, {
        value: '联军网',
        label: '联军网'
      }, {
        value: '联内网',
        label: '联内网'
      }, {
        value: '联互联网',
        label: '联互联网'
      }
      ],
      unitOptions: [],
      fileList: [],
      limit: { updateCarrier: false, deleteCarrier: false },
      myHeaders: { Authorization: window.sessionStorage.getItem('token') }
    }
  },
  created () {
    this.getCarrierList();
    this.getUserUnits();
    this.getUserLimit();
  },
  methods: {
    async getCarrierList () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.post('carrier/main/findAllCarriers', this.queryInfo)
      if (res.code !== 200) {
        return this.$message.error('获取载体列表失败！');
      }
      this.carrierlist = res.data.datas;
      this.total = res.data.total;
    },
    async getUserLimit () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.get('carrier/user/userLimit')
      if (res.code !== 200) {
        return this.$message.error('获取用户列表失败！');
      }
      this.limit = res.data;
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
    async getUserUnits () {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      const { data: res } = await this.$http.get('carrier/unit/findAllUnits')
      if (res.code !== 200) {
        return this.$message.error('获取部门列表失败！');
      }
      this.unitOptions = res.data;
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage;
      this.getCarrierList();
    },
    addDialogClosed () {
      this.$refs.addFormRef.resetFields();
      this.pcmesgshow = "display:none;";
    },
    borrowDialogClosed () {
      this.$refs.borrowFormRef.resetFields();
    },
    transferDialogClosed () {
      this.$refs.transferFormRef.resetFields();
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
    editDialogClosed () {
      this.$refs.editFormRef.resetFields();
      this.pcmesgshow = "display:none;";
    },
    uploadDialogClosed () {
      //   this.$refs.editFormRef.resetFields();
    },
    addCarrier () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 可以发起添加用户的网络请求
        this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
        const { data: res } = await this.$http.post('carrier/main/createCarrier', this.addForm)
        if (res.code == 500) {
          return this.$message.error(res.msg);
        }
        if (res.code == 200) {
          this.$message.success('载体录入成功！');
          // 隐藏添加用户的对话框
          this.addDialogVisible = false;
          // 重新获取用户列表数据
          this.getCarrierList();
        }
      })
    },
    elcardStyle () {
      if (this.addForm.carrierType && (this.addForm.carrierType == "笔记本电脑" || this.addForm.carrierType == "台式机")) {
        this.pcmesgshow = "display:block;";
        this.addFormRules.gqState = [
          { required: true, message: '请选择光驱情况', trigger: 'blur' },
        ];
        this.addFormRules.ypSerial = [
          { required: true, message: '请输入硬盘序列号', trigger: 'blur' },
        ];
        this.addFormRules.wkState = [
          { required: true, message: '请选择网卡情况', trigger: 'blur' },
        ];
      } else {
        this.pcmesgshow = "display:none;";
        this.addFormRules.ypSize = "";
        this.addFormRules.gqState = "";
        this.addFormRules.ypSerial = "";
        this.addFormRules.wkState = "";
      }
    },
    async deleteCarrier () {
      let selections = this.$refs.multipleTable.selection;
      if (selections.length === 0) {
        this.$message.error('请勾选需要删除的数据！')
      } else {
        const confirmResult = await this.$confirm(
          `此操作将永久删除${selections.length}条数据, 是否继续?`,
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
        this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
        const { data: res } = await this.$http.post('carrier/main/deleteCarrier', selections);

        if (res.code == 500) {
          return this.$message.error(res.msg);
        }
        this.$message.success('删除成功！');
        this.getCarrierList();
      }
    },
    editCarrierWd () {
      let selections = this.$refs.multipleTable.selection;
      if (selections.length == 0) {
        this.$message.error('请勾选需要修改的数据！')
      } else if (selections.length > 1) {
        this.$message.error('请勾选单条数据进行修改！')
      } else if (selections.length == 1) {
        this.editForm = selections[0];
        this.editDialogVisible = true;
        if (this.editForm.carrierType && (this.editForm.carrierType == "笔记本电脑" || this.editForm.carrierType == "台式机")) {
          this.pcmesgshow = "display:block;";
          this.addFormRules.gqState = [
            { required: true, message: '请选择光驱情况', trigger: 'blur' },
          ];
          this.addFormRules.ypSerial = [
            { required: true, message: '请输入硬盘序列号', trigger: 'blur' },
          ];
          this.addFormRules.wkState = [
            { required: true, message: '请选择网卡情况', trigger: 'blur' },
          ];
        } else {
          this.pcmesgshow = "display:none;";
          this.addFormRules.ypSize = "";
          this.addFormRules.gqState = "";
          this.addFormRules.ypSerial = "";
          this.addFormRules.wkState = "";
        }
      }
    },
    editCarrier () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 可以发起添加用户的网络请求
        this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
        const { data: res } = await this.$http.put('carrier/main/editCarrier/' + this.editForm.carrierId, this.editForm)
        if (res.code == 500) {
          return this.$message.error(res.msg);
        }
        if (res.code == 200) {
          this.$message.success('载体修改成功！');
          // 隐藏添加用户的对话框
          this.editDialogVisible = false;
          // 重新获取用户列表数据
          this.getCarrierList();
        }
      })
    },
    async handleCommand (command) {
      let selections = this.$refs.multipleTable.selection;
      if (command == "a") {
        this.uploadDialogVisible = true;
      } else if (command == "b") {
        this.downLoadCarriers(selections);
      } else if (command == "c") {
        this.stopCarriers(selections);
      } else if (command == "d") {
        this.borrowDialogVisible = true;
        this.borrowForm.datas = selections;
      } else if (command == "e") {
        this.transferDialogVisible = true;
        this.transferForm.datas = selections;
      }
    },
    async transfer () {
      if (this.transferForm.datas.length == 0) {
        return this.$message.error('请勾选需要移交的载体数据！');
      }
      this.$refs.transferFormRef.validate(async valid => {
        if (!valid) return
        this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
        const { data: res } = await this.$http.post('carrier/main/transferCarrier', this.transferForm);
        if (res.code == 500) {
          return this.$message.error(res.msg);
        }
        this.$message.success('设置移交成功！');
        this.transferDialogVisible = false;
        this.getCarrierList();
      })
    },
    async borrow () {
      if (this.borrowForm.datas.length == 0) {
        return this.$message.error('请勾选需要转借的载体数据！');
      }
      this.$refs.borrowFormRef.validate(async valid => {
        if (!valid) return
        this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
        const { data: res } = await this.$http.post('carrier/main/borrowCarrier', this.borrowForm);
        if (res.code == 500) {
          return this.$message.error(res.msg);
        }
        this.$message.success('设置转借成功！');
        this.borrowDialogVisible = false;
        this.getCarrierList();
      })
    },
    async stopCarriers (selections) {
      if (selections.length == 0) {
        this.$message.error('请勾选需要设置停用的载体数据！')
      } else {
        const confirmResult = await this.$confirm(
          `此操作将停用该载体, 是否继续?`,
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
          return this.$message.info('已取消停用！')
        } else {
          this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
          const { data: res } = await this.$http.post('carrier/main/stopCarrier', selections);
          if (res.code == 500) {
            return this.$message.error(res.msg);
          }
          this.$message.success('设置停用成功！');
          this.getCarrierList();
        }
      }
    },
    async downLoadCarriers (selections) {
      this.$http.defaults.headers.common["Authorization"] = window.sessionStorage.getItem('token');
      this.$http({
        method: "post",
        url: "carrier/main/downLoadCarriers",
        data: selections,
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
    submitUpload (file, fileList) {
      this.$refs.upload.submit();
      this.$message.success("导入成功");
      this.uploadDialogVisible = false;
      location.reload();
    },
    beforeUpload (file) {
      if (file.size / 1024 / 1024 > 5) {
        this.$message.warning('上传文件不超过5M')
        return false
      }
      var ext = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = ext === 'xlsx';
      if (!extension) {
        this.$message.warning('上传文件格式只能为xlsx')
        return false
      }
    },
    handleChange (file, fileList) {
      this.fileList = fileList;
    }
  }
}
</script>
<style lang="less" scoped>
.el-button--primary {
  height: 25px;
  padding: 0;
  line-height: 25px;
  width: 120px;
}

.el-input__inner {
  width: 250px;
  height: 25px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  margin-left: 25px;
}

.el-icon-arrow-down {
  font-size: 10px;
}

.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.el-divider--horizontal2 {
  margin: 8px 0;
}
.el-input--mini {
  width: 150px;
}
.el-select--mini {
  width: 180px;
}
</style>
