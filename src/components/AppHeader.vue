<template>
  <header :style="{ backgroundColor: isShowHeaderColor ? '#697785' : '' }">
    <div class="logo">
      <a class="unselectable" href="/">Food Diary</a>
    </div>
    <div class="user" v-if="isShowUserIcon">
      <el-icon>
        <UserFilled />
      </el-icon>
    </div>
  </header>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const isShowHeaderColor = ref(true)
const isShowUserIcon = ref(true)

watchEffect(() => {
  const path = router.currentRoute.value.path
  if (path === '/' || path === '/auth-form') {
    isShowHeaderColor.value = false
    isShowUserIcon.value = false
  } else {
    isShowHeaderColor.value = true
    isShowUserIcon.value = true
  }
})

</script>
<style lang="scss" scoped>
header {
  width: 100%;
  position: absolute;
  z-index: 999;
  height: 70px;
  line-height: 70px;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;

  .logo {
    font-weight: bold;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);

    a {
      z-index: 9999;
      color: #fff;
      font-size: 26px;
    }
  }
  .user {
    color: #fff;
    cursor: pointer;
  }
}

</style>