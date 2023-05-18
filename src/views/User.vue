<template>
  <div>
    <div>{{ user.gender }}</div>
    <div>{{ user.age }}</div>
    <div>{{ user.height }}</div>
    <div>{{ user.weight }}</div>
    <div>{{ user.activityLevel }}</div>
  </div>
</template>
<script setup>
import { useUserStore } from '../stores/user'
const user = useUserStore()

</script>
<style scoped>
div {
  text-align: center;
  font-size: 20px;
  padding-top: 100px;
  color: #555;
}
</style>