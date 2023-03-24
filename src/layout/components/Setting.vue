<template>
	<Drawer v-model:visible="layoutSetting.open" class="custom-class" title="主题配置" placement="right">
		<Row :gutter="10">
			<Col :span="6" style="display: flex;align-items: center;">
			<label>按钮颜色：</label>
			</Col>
			<Col :span="18">
			<Input type="color" v-model:value="layoutSetting.color.primaryColor"
				@input="e => onColorChange('primaryColor', e)" />
			</Col>
		</Row>
	</Drawer>
</template>

<script setup lang="ts">
import {
	Drawer, Row, Col, Input,
	ConfigProvider
} from 'ant-design-vue';



const layoutSetting: any = reactive({
	open: false,
	color: {
		primaryColor: '#1890ff',
		errorColor: '#ff4d4f',
		warningColor: '#faad14',
		successColor: '#52c41a',
		infoColor: '#1890ff',
	}
})
const onColorChange = (type: string, e: any) => {
	Object.assign(layoutSetting.color, { [type]: e.target.value });
	ConfigProvider.config({
		theme: layoutSetting.color,
	});
};

const layoutSettingShow = ()=>{
	layoutSetting.open = true;
}

defineExpose({
	layoutSettingShow
})
</script>

<style scoped></style>