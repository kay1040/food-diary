<template>
  <Dialog :dialog-visible="dialogVisible" :title="dialogTitle" :selected-food="selectedFood" @on-close="handleCloseDialog"
    @on-add="handleAddFood" @on-edit="handleEditFood" />
  <div class="food-diary">
    <div class="calender">
      <Calendar @selected-day="getSelectedDay" @selected-month="getSelectedMonth" :foods-data="userFoodsData" />
    </div>
    <div class="details" v-if="selectedDay">
      <div>
        <div class="seleted-day">
          {{ selectedDay }}
          <el-icon class="add-btn" @click="handleShowAddDialog">
            <Plus />
          </el-icon>
        </div>
        <ul class="list">
          <li v-if="getFoodsDataBySelectedDay()" v-for="food in getFoodsDataBySelectedDay()" :key="food.id">
            <span>{{ food.name }} - {{ food.calories }} kcal</span>
            <span>
              <el-icon class="icon" @click="handleShowEditDialog(food.id)">
                <Edit />
              </el-icon>
              <el-icon class="icon" @click="handleDeleteFood(food.id)">
                <Delete />
              </el-icon>
            </span>
          </li>
        </ul>
      </div>
      <div v-if="getFoodsDataBySelectedDay()">
        <div class="calories">
          <span>Total calories</span>
          <span>{{ userFoodsData.find(item => item.date === selectedDay)?.totalCalories }} kcal</span>
        </div>
        <div class="calories">
          <span>Remaining calories</span>
          <span>{{ user.TDEE - userFoodsData.find(item => item.date === selectedDay)?.totalCalories }} kcal</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import Dialog from '../components/Dialog.vue'
import Calendar from '../components/Calendar.vue'
import { useUserStore } from '../stores/user'
import { useAuthStore } from '../stores/auth'
import { useApiErrorHandler } from '../hooks/useApiErrorHandler'

const user = useUserStore()
const auth = useAuthStore()

const dialogVisible = reactive({ value: false })

let dialogTitle = ref('')

const currentDate = new Date()
let year = currentDate.getFullYear()
let month = String(currentDate.getMonth() + 1).padStart(2, '0')
const day = String(currentDate.getDate()).padStart(2, '0')

const selectedDay = ref(`${year}-${month}-${day}`)

let userFoodsData = ref([])

const fetchUserFoodsData = async () => {
  try {
    const userId = auth.userId
    const res = await axios.get(`http://127.0.0.1:3000/api/food/${userId}/${year}/${month}`)
    userFoodsData.value = res.data.foodRecords
    userFoodsData.value.forEach(item => {
      item.date = item.date.toString().split("T")[0]
    })
  } catch (error) {
    useApiErrorHandler(error)
  }
}

onMounted(() => {
  fetchUserFoodsData()
})

let selectedFood = reactive({});

const getSelectedDay = (day) => {
  selectedDay.value = day
}

const getSelectedMonth = (val) => {
  switch (val) {
    case 'next-month':
      if (month === '12') {
        month = '01'
        year = year + 1
      } else {
        month = (month * 1 + 1).toString().padStart(2, '0')
      }
      selectedDay.value = `${year}-${month}-01`
      break
    case 'prev-month':
      if (month === '01') {
        month = '12'
        year = year - 1
      } else {
        month = (month * 1 - 1).toString().padStart(2, '0')
      }
      selectedDay.value = `${year}-${month}-01`
      break
    case 'today':
      month = String(currentDate.getMonth() + 1).padStart(2, '0')
      year = currentDate.getFullYear()
      selectedDay.value = `${year}-${month}-${day}`
      break
  }
  fetchUserFoodsData()
}

const handleCloseDialog = () => {
  dialogVisible.value = false
}

const getFoodsDataBySelectedDay = () => {
  return userFoodsData.value.filter(item => item.date === selectedDay.value)[0]?.foods || null
}

const handleShowAddDialog = () => {
  dialogVisible.value = true
  dialogTitle.value = 'ADD FOOD'
  selectedFood.id = ''
  selectedFood.name = ''
  selectedFood.calories = ''
}

const handleAddFood = async (foodData) => {
  const date = selectedDay.value
  const userId = auth.userId

  try {
    await axios.post('http://127.0.0.1:3000/api/food/', {
      userId,
      date,
      foods: [
        { ...foodData },
      ],
      totalCalories: foodData.calories
    })
    fetchUserFoodsData()
  } catch (error) {
    useApiErrorHandler(error)
  }
}

const handleShowEditDialog = (id) => {
  dialogVisible.value = true
  dialogTitle.value = 'EDIT FOOD'
  const date = selectedDay.value
  const index = userFoodsData.value.findIndex(item => item.date === date);
  selectedFood.id = userFoodsData.value[index].foods.find(item => item.id === id).id
  selectedFood.name = userFoodsData.value[index].foods.find(item => item.id === id).name
  selectedFood.calories = userFoodsData.value[index].foods.find(item => item.id === id).calories
}

const handleEditFood = async (foodData) => {
  try {
    const date = selectedDay.value
    const index = userFoodsData.value.findIndex(item => item.date === date)
    const foodIndex = userFoodsData.value[index].foods.findIndex(item => item.id === foodData.id)
    userFoodsData.value[index].foods[foodIndex] = { ...foodData }
    const recordId = userFoodsData.value[index]._id
    const foods = userFoodsData.value[index].foods
    const totalCalories = userFoodsData.value[index].totalCalories - selectedFood.calories + foodData.calories
    await axios.put(`http://127.0.0.1:3000/api/food/${recordId}`, { foods, totalCalories })
    fetchUserFoodsData()
  } catch (error) {
    useApiErrorHandler(error)
  }
}

const handleDeleteFood = async (id) => {
  try {
    await ElMessageBox({
      message: 'Are you sure to delete this food data?',
      type: 'warning',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
      closeOnClickModal: false,
    })
    const date = selectedDay.value
    const index = userFoodsData.value.findIndex(item => item.date === date)
    const recordId = userFoodsData.value[index]._id
    const foods = userFoodsData.value[index].foods.filter(item => item.id !== id)
    const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0)
    await axios.put(`http://127.0.0.1:3000/api/food/${recordId}`, { foods, totalCalories })
    fetchUserFoodsData()
    ElMessage.success('Successfully deleted!')
  } catch (error) {
    ElMessage.info('Deletion canceled!')
  }
}
</script>

<style lang="scss" scoped>
.food-diary {
  background-color: #fff;
  background-image: none;
  display: flex;
  padding-top: 50px;

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
    background: #ddd;
    width: 20%;
    min-height: 300px;
    min-width: 360px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

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
        padding: 6px;
        display: flex;
        justify-content: space-between;
        border-bottom: #555 1px solid;
        height: 40px;
        padding-top: 14px;

        .icon {
          margin-left: 10px;
          margin-top: 4px;
          cursor: pointer;

          &:hover {
            color: #697785;
          }
        }
      }
    }

    .calories {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>