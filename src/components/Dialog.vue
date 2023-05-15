<template>
  <el-dialog v-model="props.dialogVisible.value" width="50%" :before-close="handleClose">
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item label="Food:">
        <el-input v-model="formData.food" />
      </el-form-item>
      <el-form-item label="Calories:">
        <el-input v-model="formData.calories" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('on-close')">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit">
          ADD
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
  
<script setup>
import { ElMessageBox } from 'element-plus'

const props = defineProps(['dialogVisible'])
const emit = defineEmits(['on-close'])

// https://platform.fatsecret.com/api/Default.aspx?screen=rapiref2&method=foods.search

const formData = { food: '', calories: '' }

const handleSubmit = () => {
  emit('on-close')
}

const handleClose = () => {
  emit('on-close')
  // ElMessageBox.confirm('Are you sure to close this dialog?')
  //   .then(() => {
  //     done()
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
}

</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.demo-form-inline {
  display: flex;
  flex-direction: column;
}
</style>
  