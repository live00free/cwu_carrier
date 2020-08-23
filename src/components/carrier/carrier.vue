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
                            <el-button type="primary" @click="onSubmit" plain>查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row style="margin-bottom: 5px;">
                <el-col :span="12" :offset="13">
                    <el-button type="primary" plain>载体录入</el-button>
                    <el-button type="primary" plain>信息修改</el-button>
                    <el-button type="primary" plain>删除</el-button>
                    <el-button type="primary" plain>批量导入</el-button>
                    <el-button type="primary" plain>批量导出</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-table :data="userlist" style="width: 100%;height: 100%" border :highlight-current-row=true :row-style="{height:'50px'}" :cell-style="{padding:'0'}">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="serial" label="序号" fixed width="50" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="fullname" label="领用人" fixed width="150" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="username" label="单位" fixed width="150" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="department" label="密级" fixed width="150" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="unit" label="载体类型" fixed width="150" header-align="center" align="center"></el-table-column>
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
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
}
</script>
<style lang="less" scoped>
.el-button--primary {
    height: 30px;
    padding: 0;
    line-height: 30px;
    width: 100px;
}

.el-input__inner {
    width: 250px;
    height: 25px;
}
</style>