<template>
  <Dialog :dialog-visible="dialogVisible" :title="dialogTitle" :selected-food="selectedFood" @on-close="handleCloseDialog"
    @on-add="handleAddFood" @on-edit="handleEditFood" />
  <div class="user">
    <div class="calender">
      <Calendar @selected-day="getSelectedDay" :fake-data="fakeData" />
    </div>
    <div class="details" v-if="selectedDay">
      <div class="seleted-day">
        {{ selectedDay }}
        <el-icon class="add-btn" @click="handleShowAddDialog">
          <Plus />
        </el-icon>
      </div>
      <ul class="list">
        <li v-if="getFoodsDataBySelectedDay()" v-for="food in getFoodsDataBySelectedDay()" :key="food.id">
          <span>{{ food.name }} - {{ food.calories }} kcal</span>
          <span class="icon">
            <el-icon class="edit" @click="handleShowEditDialog(food.id)">
              <Edit />
            </el-icon>
            <el-icon class="delete" @click="handleDeleteFood(food.id)">
              <Delete />
            </el-icon>
          </span>
        </li>
      </ul>
      <div v-if="getFoodsDataBySelectedDay()"> Total Calories: {{ fakeData.find(item => item.date ===
        selectedDay)?.totalCalories }} kcal</div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { nanoid } from 'nanoid'
import Dialog from '../components/Dialog.vue'
import Calendar from '../components/Calendar.vue';

const fakeData = reactive([
  {
    id: '001',
    date: '2023-05-06',
    foods: [
      { id: '001', name: 'prok', calories: 280 },
      { id: '002', name: 'milk', calories: 320 },
      { id: '003', name: 'ice cream', calories: 240 },
    ],
    totalCalories: 840
  },
  {
    id: '002',
    date: '2023-05-07',
    foods: [
      { id: '004', name: 'steak', calories: 420 },
      { id: '005', name: 'soup', calories: 280 },
      { id: '006', name: 'cake', calories: 360 },
    ],
    totalCalories: 1060
  },
  {
    id: '003',
    date: '2023-05-08',
    foods: [
      { id: '007', name: 'potato', calories: 280 },
    ],
    totalCalories: 280
  },
  {
    id: '004',
    date: '2023-05-09',
    foods: [
      { id: '008', name: 'tomato', calories: 160 },
      { id: '009', name: 'egg', calories: 180 },
    ],
    totalCalories: 340
  },
])


const dialogVisible = reactive({ value: false })

let dialogTitle = ref('')

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');

const selectedDay = ref(`${year}-${month}-${day}`)

let selectedFood = reactive({});

const getSelectedDay = (day) => {
  selectedDay.value = day
}

const handleCloseDialog = () => {
  dialogVisible.value = false
}

const getFoodsDataBySelectedDay = () => {
  return fakeData.filter(item => item.date === selectedDay.value)[0]?.foods || null
}

const handleShowAddDialog = () => {
  dialogVisible.value = true
  dialogTitle.value = 'ADD FOOD'
}

const handleAddFood = (foodData) => {
  const date = selectedDay.value
  const index = fakeData.findIndex(item => item.date === date);
  const isExist = index !== -1;

  if (isExist) {
    fakeData[index].foods.push({ id: nanoid(), ...foodData })
    fakeData[index].totalCalories += foodData.calories
  } else {
    fakeData.push({
      id: nanoid(),
      date,
      foods: [
        { ...foodData },
      ],
      totalCalories: foodData.calories
    },)
  }
}

const handleShowEditDialog = (id) => {
  dialogVisible.value = true
  dialogTitle.value = 'EDIT FOOD'
  const date = selectedDay.value
  const index = fakeData.findIndex(item => item.date === date);
  selectedFood.id = fakeData[index].foods.find(item => item.id === id).id
  selectedFood.name = fakeData[index].foods.find(item => item.id === id).name
  selectedFood.calories = fakeData[index].foods.find(item => item.id === id).calories
}

const handleEditFood = (foodData) => {
  const date = selectedDay.value
  const index = fakeData.findIndex(item => item.date === date);
  const foodIndex = fakeData[index].foods.findIndex(item => item.id === foodData.id)
  fakeData[index].foods[foodIndex] = { ...foodData }
  fakeData[index].totalCalories = fakeData[index].totalCalories - selectedFood.calories + foodData.calories
}

const handleDeleteFood = (id) => {
  ElMessageBox({
    message: 'Are you sure to delete this food data?',
    type: 'warning',
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    showCancelButton: true,
    closeOnClickModal: false,
  }).then(() => {
    const date = selectedDay.value
    const index = fakeData.findIndex(item => item.date === date);
    fakeData[index].foods = fakeData[index].foods.filter(item => item.id !== id)
    ElMessage.success('Successfully deleted!');
  }).catch(() => {
    ElMessage.info('Deletion canceled!');
  });
}

</script>

<style lang="scss" scoped>
.user {
  background-color: #fff;
  background-image: none;
  display: flex;
  padding-top: 70px;

  @include mobile {
    flex-direction: column;
  }

  .calender {
    width: 80%;
    background-color: #fff;
    margin: 10px;

    @include mobile {
      width: 100%;
      margin: 0;
    }
  }

  .details {
    padding: 30px;
    background: #e3e8eb;
    width: 20%;
    min-height: 300px;

    @include mobile {
      width: 100%;
    }

    .seleted-day {
      text-align: center;

      .add-btn {
        margin-left: 8px;
        background-color: #fff;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 50%;
        border: none;
        font-size: 12px;
        cursor: pointer;
      }
    }

    .list {
      margin: 20px 0;


      li {
        padding: 6px 0;
        display: flex;
        justify-content: space-between;
        border-bottom: #555 1px solid;
        height: 40px;
        padding-top: 14px;
        
        .edit, .delete {
          margin-left: 10px;
          margin-top: 4px;
        }

      }
    }
  }
}
</style>