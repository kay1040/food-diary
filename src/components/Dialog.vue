<template>
  <el-dialog v-model="props.dialogVisible.value" :before-close="() => handleClose(formRef)" :width=dialogWidth
    :title="props.title">
    <span class="desc">
      You can click
      <el-icon>
        <Search />
      </el-icon>
      button to look up the calorie content of a food (per 100g / kcal), or enter it manually.
    </span>
    <el-form :model="foodData" class="form" ref="formRef">
      <el-form-item label="Food:" prop="name" :rules="[{ required: true, message: 'Name is required.' }]">
        <el-input v-model="foodData.name">
          <template #append>
            <el-button icon="Search" @click="handleSearch(foodData.name)" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="Calories:" prop="calories" :rules="[
        { required: true, message: 'Calories is required.' },
        { type: 'number', message: 'Calories must be a number.' }
      ]">
        <el-input v-model.number="foodData.calories" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel(formRef)">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit(formRef, foodData)">
          {{ props.title === 'ADD FOOD' ? 'ADD' : 'OK' }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
  
<script setup>
import axios from 'axios'
import { nanoid } from 'nanoid'
import { reactive, ref, watchEffect } from 'vue'
import { useLoadingStore } from '@/stores/loading'

const props = defineProps(['dialog-visible', 'title', 'selected-food'])
const emits = defineEmits(['on-close', 'on-add', 'on-edit'])

const loading = useLoadingStore()

const formRef = ref(null)

let dialogWidth = ref('60%')

if (window.matchMedia('(max-width: 768px)').matches) {
  dialogWidth.value = '90%'
}

const foodData = reactive({ id: '', name: '', calories: '' })

const handleSearch = async (food) => {
  try {
    loading.showLoading()
    const api_key = import.meta.env.VITE_SOME_USDA_API_KEY
    const response = await axios.get('https://api.nal.usda.gov/fdc/v1/foods/search', {
      params: {
        query: food,
        pageSize: 1,
        api_key,
      }
    })

    if (response.status === 200) {
      foodData.calories = response.data.foods[0].foodNutrients.filter(item => item.nutrientId === 1008)[0].value
    } else {
      throw Error(response.status)
    }
  } catch (error) {
    ElMessage({
      showClose: true,
      message: error.message,
      type: 'error'
    })
  } finally {
    loading.closeLoading()
  }
}

watchEffect(() => {
  Object.assign(foodData, props.selectedFood)
})

const handleSubmit = (formRef, foodData) => {
  formRef.validate(async (valid) => {
    if (valid) {
      if (props.title === 'ADD FOOD') {
        foodData.id = nanoid()
        emits('on-add', foodData)
      } else {
        emits('on-edit', foodData)
      }
      emits('on-close')
      formRef.resetFields()
    } else {
      ElMessage({
        showClose: true,
        message: 'Form cannot be empty!',
        type: 'error'
      })
    }
  })
}

const handleCancel = (formRef) => {
  formRef.resetFields()
  emits('on-close')
}

const handleClose = (formRef) => {
  if (!formRef) return
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      formRef.resetFields()
      emits('on-close')
    })
    .catch((error) => {
      ElMessage({
        showClose: true,
        message: error.message,
        type: 'error'
      })
    })
}

</script>
<style lang="scss" scoped>
.form {
  margin-top: 40px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
  