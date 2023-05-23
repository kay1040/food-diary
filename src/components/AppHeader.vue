<template>
  <header :style="{ backgroundColor: isShowHeaderColor ? '#697785' : '' }">
    <div class="logo">
      <a href="/">Food Diary</a>
    </div>
    <div class="user" v-if="isShowUserIcon">
      <el-icon @click.stop="isShowUserMenu = !isShowUserMenu">
        <UserFilled />
      </el-icon>
      <ul class="user-menu" v-if="isShowUserMenu" @click.stop>
        <li><a href="/user/food-diary">Food diary</a></li>
        <li><a href="/user/information">User Information</a></li>
        <li><a href="/user/password">Change Password</a></li>
        <li><a href="/">Log out</a></li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const isShowHeaderColor = ref(true)
const isShowUserIcon = ref(true)
const isShowUserMenu = ref(false)

watchEffect(() => {
  const path = router.currentRoute.value.path
  if (path === '/' || path === '/auth-form' || path === '/start') {
    isShowHeaderColor.value = false
    isShowUserIcon.value = false
  } else {
    isShowHeaderColor.value = true
    isShowUserIcon.value = true
  }
})

watchEffect(() => {
  if (isShowUserMenu.value) {
    document.body.addEventListener('click', () => {
      isShowUserMenu.value = false
    })
  }
})

</script>
<style lang="scss" scoped>
header {
  width: 100%;
  z-index: 999;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  position: absolute;

  .logo {
    font-weight: bold;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);

    a {
      z-index: 9999;
      color: #fff;
      font-size: 24px;
    }
  }

  .user {
    color: #fff;
    position: relative;
    margin-top: 4px;

    i {
      cursor: pointer;
    }

    .user-menu {
      color: #555;
      font-size: 12px;
      position: absolute;
      top: 40px;
      right: 0;
      width: 220px;
      padding: 12px 0;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
      z-index: 999;

      li {
        height: 40px;
        line-height: 40px;
        padding: 0 30px;     

        a {
          display: inline-block;
          width: 100%;
          font-size: 16px;
        }

        &:hover {
          background-color: #eee;

        }
      }
    }
  }
}
</style>