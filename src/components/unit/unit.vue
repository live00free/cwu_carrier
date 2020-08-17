<template>
<div>
	<el-card class="box-card">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>单位管理</el-breadcrumb-item>
		</el-breadcrumb>
	</el-card>
	<el-card>
		<el-tree :data="data" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false">
			<span class="custom-tree-node" slot-scope="{ node, data }">
				<span>{{ node.label }}</span>
				<span>
					<el-button type="text" size="mini" @click="() => append(data)">添加</el-button>
					<el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
				</span>
			</span>
		</el-tree>
	</el-card>

</div>
</template>

<script type="text/javascript">
	
</script>

<style lang="less" scoped>
	.box-card{
		height: 100%;
	}
</style>