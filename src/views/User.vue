<template>
  <DiaLog :dialogVisible="dialogVisible" title="Add Food" @on-close="handleCloseDialog" @on-add="handleAddFood" />
  <div class="user">
    <div class="calender">
      <Calendar @selected-day="getSelectedDay" :fake-data="fakeData" />
    </div>
    <div class="details" v-if="selectedDay" >
      <div class="seleted-day">
        {{ selectedDay }}
        <el-icon class="add-btn" @click="dialogVisible.value = true">
          <Plus />
        </el-icon>
      </div>
      <ul>
        <li v-if="getFoodsDataBySelectedDay()" v-for="food in getFoodsDataBySelectedDay()" :key="food.name">
          {{ food.name }} - {{ food.calories }} kcal
        </li>
      </ul>
      <div v-if="getFoodsDataBySelectedDay()"> Total Calories: {{ fakeData.find(item => item.date === selectedDay)?.totalCalories }} kcal</div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import DiaLog from '../components/Dialog.vue'
import Calendar from '../components/Calendar.vue';

const fakeData = reactive([
  {
    id: '001',
    date: '2023-05-06',
    foods: [
      { name: 'prok', calories: 280 },
      { name: 'milk', calories: 320 },
      { name: 'ice cream', calories: 240 },
    ],
    totalCalories: 840
  },
  {
    id: '002',
    date: '2023-05-07',
    foods: [
      { name: 'steak', calories: 420 },
      { name: 'soup', calories: 280 },
      { name: 'cake', calories: 360 },
    ],
    totalCalories: 1060
  },
  {
    id: '003',
    date: '2023-05-08',
    foods: [
      { name: 'potato', calories: 280 },
    ],
    totalCalories: 280
  },
  {
    id: '004',
    date: '2023-05-09',
    foods: [
      { name: 'tomato', calories: 160 },
      { name: 'egg', calories: 180 },
    ],
    totalCalories: 340
  },
])

const dialogVisible = reactive({ value: false })

const selectedDay = ref('')
const getSelectedDay = (day) => {
  selectedDay.value = day
}

const handleCloseDialog = () => {
  dialogVisible.value = false
}

const getFoodsDataBySelectedDay = () => {
  return fakeData.filter(item => item.date === selectedDay.value)[0]?.foods || null
}


const handleAddFood = (foodData) => {
  const index = fakeData.findIndex(item => item.date === selectedDay.value);
  const isExist = index !== -1;
  console.log(isExist);

  if (isExist) {
    console.log(fakeData[index].foods);
    fakeData[index].foods.push(foodData)
    fakeData[index].totalCalories += foodData.calories
  } else {
    fakeData.push({
      id: fakeData.at(-1) + 1,
      date: selectedDay,
      foods: [
        { ...foodData },
      ],
      totalCalories: foodData.calories
    },)
  }
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

    ul {
      margin: 20px 0;

      li {
        padding: 6px 0;
      }
    }
  }
}
</style>