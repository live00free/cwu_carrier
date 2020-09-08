<template>
    <div>
        <el-card>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>载体管理</el-breadcrumb-item>
            </el-breadcrumb>
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
            <el-row style="margin-bottom:5px">
                <el-col :span="12" :offset="15">
                    <el-button type="primary" plain @click="addDialogVisible = true" icon="el-icon-circle-plus">新建</el-button>
                    <el-button type="primary" plain icon="el-icon-edit">修改</el-button>
                    <el-button type="primary" plain icon="el-icon-delete">删除</el-button>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            更多操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-upload2">批量导入</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-download">批量导出</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-video-pause">停用</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-share">转借</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-right">移交</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-delete">销毁</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-table :data="carrierlist" style="width: 100%;height: 100%" border :highlight-current-row=true :row-style="{height:'50px'}" :cell-style="{padding:'0'}">
                        <el-table-column type="selection" width="55"></el-table-column>
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
            <el-dialog title="载体录入" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed" center>
                <!-- 内容主体区域 -->
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="right" size="mini">
                    <el-card shadow="never">
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="编号" prop="number">
                                    <el-input placeholder="自动生成" v-model="addForm.number" :disabled="true">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="使用情况" prop="usestate">
                                    <el-select v-model="addForm.usestate" placeholder="请选择">
                                        <el-option v-for="item in usestateoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="载体类型" prop="carriertype">
                                    <el-select v-model="addForm.carriertype" placeholder="请选择" @change="elcardStyle()">
                                        <el-option v-for="item in carriertypeoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="密级" prop="secret">
                                    <el-select v-model="addForm.secret" placeholder="请选择">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="领用人" prop="fullname">
                                    <el-input v-model="addForm.fullname"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="单位" prop="unit">
                                    <el-cascader v-model="addForm.unit" :options="unitoptions" :show-all-levels="false"></el-cascader>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="用途" prop="usefor">
                                    <el-input v-model="addForm.usefor"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="领用日期" prop="usedate">
                                    <el-date-picker v-model="addForm.usedate" type="date" placeholder="选择日期"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="品牌型号" prop="product">
                                    <el-input v-model="addForm.product"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="产品序列号" prop="proserial">
                                    <el-input v-model="addForm.proserial"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="容量" prop="size">
                                    <el-input v-model="addForm.size"><template slot="append">G</template></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="颜色" prop="procolor">
                                    <el-input v-model="addForm.procolor"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-card>
                    <el-card shadow="never" :style="pcmesgshow">
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="光驱情况" prop="gqstate">
                                    <el-radio-group v-model="addForm.gqstate">
                                        <el-radio label="有"></el-radio>
                                        <el-radio label="无"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="无线网卡情况" prop="wkstate">
                                    <el-radio-group v-model="addForm.wkstate">
                                        <el-radio label="有"></el-radio>
                                        <el-radio label="无"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="操作系统版本" prop="systemversion">
                                    <el-input v-model="addForm.systemversion"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="系统安装日期" prop="systemdate">
                                    <el-date-picker v-model="addForm.systemdate" type="date" placeholder="选择日期"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="硬盘序列号" prop="ypserial">
                                    <el-input v-model="addForm.ypserial"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="硬盘容量" prop="ypsize">
                                    <el-input v-model="addForm.ypsize"><template slot="append">G</template></el-input>
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
        </el-card>
        <el-card>
        </el-card>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        var checkSize = (rule, value, cb) => {
            // 验证容量的正则表达式
            const regSize = /^\d+$/
            if (regSize.test(value)) {
                return cb()
            }
            cb(new Error('容量为数字'))
        }
        return {
            formInline: {
                user: '',
                region: '',
                miji: '',
                usage: ''
            },
            addFormRules: {
                size: [
                    { required: true, message: '请输入容量', trigger: 'blur' },
                    { validator: checkSize, trigger: 'blur' }
                ],
                carriertype: [
                    { required: true, message: '请选择载体类型', trigger: 'blur' },
                ],
                secret: [
                    { required: true, message: '请选择密级', trigger: 'blur' },
                ],
                usestate: [
                    { required: true, message: '请选择使用情况', trigger: 'blur' },
                ],
                fullname: [
                    { required: true, message: '请输入领用人', trigger: 'blur' },
                ],
                unit: [
                    { required: true, message: '请选择单位', trigger: 'blur' },
                ],
                product: [
                    { required: true, message: '请输入品牌型号', trigger: 'blur' },
                ],
                gqstate: "",
                ypserial: "",
                wkstate: "",
                ypsize: ""
            },
            pcmesgshow: "display:none;",
            carrierlist: [],
            addDialogVisible: false,
            addForm: {
                serial: '',
                number: '',
                carriertype: '',
                fullname: '',
                unit: '',
                secret: '',
                usefor: '',
                usedate: '',
                product: '',
                proserial: '',
                size: '',
                usestate: '',
                procolor: '',
                gqstate: '',
                wkstate: '',
                systemversion: '',
                systemdate: '',
                ypserial: '',
                ypsize: ''
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
            }],
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
            }, {
                value: '转借',
                label: '转借'
            }, {
                value: '移交',
                label: '移交'
            }, {
                value: '销毁',
                label: '销毁'
            }],
            unitoptions: [{
                value: '单位1',
                label: '单位1',
                children: [{
                    value: '部门一',
                    label: '部门一',
                }, {
                    value: '部门二',
                    label: '部门二',
                }]
            }, {
                value: '单位2',
                label: '单位2',
                children: [{
                    value: '部门一',
                    label: '部门一',
                }, {
                    value: '部门二',
                    label: '部门二',
                }]
            }]
        }
    },
    methods: {
        async getCarrierList() {
            console.info(111);
        },
        onSubmit() {
            console.log('submit!');
        },
        addDialogClosed() {
            this.$refs.addFormRef.resetFields();
            this.pcmesgshow = "display:none;";
        },
        addCarrier() {
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return
                // 可以发起添加用户的网络请求
                const { data: res } = await this.$http.post('users', this.addForm)

                if (res.meta.status !== 201) {
                    this.$message.error('载体录入失败！')
                }

                this.$message.success('载体录入成功！')
                // 隐藏添加用户的对话框
                this.addDialogVisible = false
                // 重新获取用户列表数据
                this.getCarrierList()
            })
        },
        elcardStyle() {
            var checkSize = (rule, value, cb) => {
                // 验证容量的正则表达式
                const regSize = /^\d+$/
                if (regSize.test(value)) {
                    return cb()
                }
                cb(new Error('容量为数字'))
            }
            if (this.addForm.carriertype && this.addForm.carriertype == "笔记本电脑") {
                this.pcmesgshow = "display:block;";
                this.addFormRules.ypsize = [
                    { required: true, message: '请输入硬盘容量', trigger: 'blur' },
                    { validator: checkSize, trigger: 'blur' }
                ];
                this.addFormRules.gqstate = [
                    { required: true, message: '请选择光驱情况', trigger: 'blur' },
                ];
                this.addFormRules.ypserial = [
                    { required: true, message: '请输入硬盘序列号', trigger: 'blur' },
                ];
                this.addFormRules.wkstate = [
                    { required: true, message: '请选择网卡情况', trigger: 'blur' },
                ];
            }else{
                this.pcmesgshow = "display:none;";
                this.addFormRules.ypsize ="";
                this.addFormRules.gqstate ="";
                this.addFormRules.ypserial ="";
                this.addFormRules.wkstate ="";
            }
        }
    }
}
</script>
<style lang="less" scoped>
.el-button--primary {
    height: 25px;
    padding: 0;
    line-height: 25px;
    width: 100px;
}

.el-input__inner {
    width: 250px;
    height: 25px;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    margin-left: 25px;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
}
</style>