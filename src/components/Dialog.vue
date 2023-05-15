<template>
  <el-dialog v-model="props.dialogVisible.value" :before-close="handleClose" :width=dialogWidth>
    <el-form :inline="true" :model="foodData" class="form">
      <span class="desc">You can click <el-icon>
          <Search />
        </el-icon> to look up the calorie content of a food (per 100g / kcal), or enter it manually.</span>
      <el-form-item label="Food:">
        <el-input v-model="foodData.name" @change="handleSearch(foodData.name)"
          :rules="[{ required: true, message: 'Name is required' }]" />
        <el-icon>
          <Search />
        </el-icon>
      </el-form-item>
      <el-form-item label="Calories:">
        <el-input v-model="foodData.calories" :rules="[{ required: true, message: 'Calories is required' }]" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit">
          ADD
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
  
<script setup>
import axios from 'axios'
import { reactive, ref } from 'vue';

const props = defineProps(['dialogVisible'])
const emits = defineEmits(['on-close', 'on-add'])

let dialogWidth = ref('60%')
if (window.matchMedia('(max-width: 768px)').matches) {
  dialogWidth.value = '90%';
}

const foodData = reactive({ name: '', calories: '' })

const handleSearch = async (food) => {
  console.log(food);
  try {
    const response = await axios.get('https://api.nal.usda.gov/fdc/v1/foods/search', {
      params: {
        query: food,
        pageSize: 1,
        api_key: 'DmWhzKnBqyxW1AiNe30edfTuhAHNniA14hxWHMs3'
      }
    })
    console.log(response);
    if (response.status === 200) {
      foodData.calories = response.data.foods[0].foodNutrients.filter(item => item.nutrientId === 1008)[0].value
      console.log(foodData.calories);
    } else {
      throw Error(response.status)
    }

  } catch (error) {
    console.log(error);
  }
}

const handleSubmit = () => {
  if (foodData.name.trim() !== '' && foodData.calories.trim() !== '') {
    emits('on-close')
    emits('on-add', foodData)
    foodData.name = ''
    foodData.calories = ''
  } else {
    ElMessage({
      showClose: true,
      message: 'Form cannot be empty!',
      type: 'error'
    })
  }

}

const handleClose = (done) => {
  foodData.name = ''
  foodData.calories = ''
  emits('on-close')
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch((error) => {
      console.log(error);
    })

    // ElMessageBox({
    //     title: '提示', //MessageBox 标题
    //     message: '是否确定删除当前项?', //MessageBox 消息正文内容
    //     confirmButtonText: '确定', //确定按钮的文本内容
    //     cancelButtonText: '取消', //取消按钮的文本内容
    //     showCancelButton: true, //是否显示取消按钮
    //     closeOnClickModal: false, //是否可通过点击遮罩关闭
    //     type: 'warning', //消息类型，用于显示图标
    // }).then(() => {
    //     ElMessage.success('删除成功!');
    // }).catch(() => {
    //     ElMessage.info('已取消删除!');
    // });
}

</script>
<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;

  .desc {
    margin-bottom: 20px;
  }
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
  