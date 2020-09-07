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
                        <el-table-column prop="unit" label="载体类型" fixed width="150" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="fullname" label="领用人" width="150" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="username" label="单位" width="150" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="department" label="密级" width="150" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="phone" label="用途" width="150" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="secret" label="领用日期" width="150" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="userrole" label="品牌型号" width="150" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="userrole" label="产品序列号" width="150" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="userrole" label="使用情况" width="150" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="userrole" label="颜色" width="150" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="userrole" label="光驱情况" width="150" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="userrole" label="操作系统版本" width="150" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="userrole" label="系统安装日期" width="150" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="userrole" label="硬盘序列号" width="150" header-align="center" align="center"></el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-dialog title="载体录入" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed" center>
                <!-- 内容主体区域 -->
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="right" size="small">

                </el-form>
                <!-- 底部区域 -->
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addUser">确 定</el-button>
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
        return {
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
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        addDialogClosed() {
            this.$refs.addFormRef.resetFields()
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