<template>
  <el-calendar v-model="value">
    <template #date-cell="{ data }">
      <div class="content" @click="emits('selected-day', data.day)">
        <p>
          {{ data.day.split('-')[2] }}
        </p>
        <p class="calorie" v-if="props.fakeData.filter(item => item.date === data.day).length">
          {{ props.fakeData.find(item => item.date === data.day)?.totalCalories }} kcal
        </p>
      </div>
    </template>
  </el-calendar>
</template>

<script setup>
import { ref,defineEmits } from 'vue'
const value = ref(new Date())


const props = defineProps(['fake-data'])
const emits = defineEmits(['selected-day'])





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
