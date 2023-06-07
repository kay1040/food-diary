<template>
  <Loading/>
  <div class="background">
    <div class="form-container">
      <form class="auth-form" @submit.prevent="handleSubmit" v-if="isLoginForm">
        <h2>LOG IN</h2>
        <input type="email" placeholder="Email Address" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <button class="login-btn">LOG IN</button>
        <p class="toggle-from">Don't have an account yet? <span @click="isLoginForm = !isLoginForm">Create one.</span></p>
      </form>
      <form class="auth-form" @submit.prevent="handleSubmit" v-if="!isLoginForm">
        <h2>SIGN UP</h2>
        <input type="email" placeholder="Email Address" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <input type="password" placeholder="Confirm Password" v-model="confirmPassword">
        <button class="login-btn">SIGN UP</button>
        <p class="toggle-from">Already have an account? <span @click="isLoginForm = !isLoginForm">Login in.</span></p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Loading from '@/components/Loading.vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import { useLoadingStore } from '@/stores/loading'
import { useApiErrorHandler } from '@/hooks/useApiErrorHandler'
import api from '@/api/axios'

const router = useRouter()
const isLoginForm = ref(true)
const isNewUser = ref(false)

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const auth = useAuthStore()
const user = useUserStore()
const loading = useLoadingStore()

const handleSubmit = async () => {
  if (isLoginForm.value) {
    // login 
    try {
      loading.showLoading()
      const res = await api.post('/user/login', { email: email.value, password: password.value })
      const token = res.token
      const userId = res.userId
      auth.login(token, userId)

      if (isNewUser.value) {
        router.push({ name: 'start' })
        isNewUser.value = false
      } else {
        try {
          const res = await api.get(`/user/${userId}`)
          user.updateUserInfo(res.user.userInfo)
          router.push({ name: 'food-diary' })
        } catch (error) {
          useApiErrorHandler(error)
        } finally {
          loading.closeLoading()
        }
      }

    } catch (error) {
      useApiErrorHandler(error)
    } finally {
      loading.closeLoading()
    }
  } else {
    // signup
    isNewUser.value = true
    try {
      loading.showLoading()
      if (password.value === confirmPassword.value) {
        await api.post('/user/signup', { email: email.value, password: password.value })
        ElMessage.success('Signup successful. Please log in again!')
        isLoginForm.value = true
      } else {
        throw new Error('Password and Confirm Password does not match!')
      }
    } catch (error) {
      useApiErrorHandler(error)
    } finally {
      loading.closeLoading()
    }
  }
}
</script>
<style lang="scss" scoped >
.form-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  .auth-form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
    max-width: 400px;
    padding: 70px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

    @include mobile {
      width: 85%;
    }

    h2 {
      font-size: 32px;
      color: #555;
      margin-bottom: 20px;
    }

    input {
      font-size: 16px;
      width: 240px;
      padding: 15px 15px;
      margin-bottom: 12px;
      border: 1px solid #ddd;
    }

    button {
      font-size: 16px;
      width: 240px;
      padding: 15px 0;
      border: none;
      font-weight: bold;
      cursor: pointer;
    }

    .login-btn {
      color: #fff;
      background-color: #697785;
      margin-bottom: 12px;
    }

    .toggle-from {
      width: 280px;
      text-align: center;
      color: #697785;
      font-size: 12px;

      span {
        cursor: pointer;
        color: #248cf3;
      }
    }
  }
}
</style>