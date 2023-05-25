<template>
  <el-calendar ref="calendar">
    <template #header="{ date }">
      <span>{{ date }}</span>
      <el-button-group>
        <el-button size="small" @click="selectDate('prev-month')">
          Previous Month
        </el-button>
        <el-button size="small" @click="selectDate('today')">Today</el-button>
        <el-button size="small" @click="selectDate('next-month')">
          Next Month
        </el-button>
      </el-button-group>
    </template>
    <template #date-cell="{ data }">
      <div class="content" @click="emits('selected-day', data.day)">
        <p>
          {{ data.day.split('-')[2] }}
        </p>
        <p class="calorie" v-if="props.foodsData.filter(item => item.date === data.day).length">
          {{ props.foodsData.find(item => item.date === data.day)?.totalCalories }} kcal
        </p>
      </div>
    </template>
  </el-calendar>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const value = ref(new Date())
const props = defineProps(['foods-data'])
const emits = defineEmits(['selected-day', 'selected-month'])

const calendar = ref()
const selectDate = (val) => {
  calendar.value.selectDate(val)
  emits('selected-month', val)
}

</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;

  .calorie {
    margin-top: 12px;
    font-size: 10px;
  }
}
</style>
