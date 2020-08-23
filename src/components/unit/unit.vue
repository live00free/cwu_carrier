<template>
    <div>
        <el-card>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>单位管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-card>
        <el-card>
            <el-row style="height: ">
                <el-col :span="8">
                    <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false">
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
    </div>
</template>
<script type="text/javascript">
let id = 1000;
export default {
    data() {
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
            data: JSON.parse(JSON.stringify(data))
        }
    },

    methods: {
        append(data) {
            const newChild = { id: id++, label: 'testtest', children: [] };
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push(newChild);
        },

        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },

        renderContent(h, { node, data, store }) {
            return (
                <span class="custom-tree-node">
				<span>{node.label}</span>
				<span>
				<el-button size="medium" type="text" on-click={ () => this.append(data) }>Append</el-button>
				<el-button size="medium" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
				</span>
				</span>);
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
</style>