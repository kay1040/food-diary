<template>
  <header :style="{ backgroundColor: isShowHeaderColor ? '#697785' : '' }">
    <div class="logo">
      <a class="unselectable" href="/">Food Diary</a>
    </div>
  </header>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const uid = router.currentRoute.value.name
const isShowHeaderColor = ref(true)
watchEffect(() => {
  const path = router.currentRoute.value.path
  if (path === '/' || path === '/auth-form') {
    isShowHeaderColor.value = false
  } else {
    isShowHeaderColor.value = true
  }
})
console.log(uid);
</script>
<style lang="scss" scoped>
header {
  width: 100%;
  position: absolute;
  z-index: 999;
  height: 70px;
}

.logo {
  font-weight: bold;
  font-size: 32px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 10px 25px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);

  a {
    z-index: 9999;
    color: #fff;
  }
}
</style>