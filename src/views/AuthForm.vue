<template>
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
import axios from 'axios';
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const isLoginForm = ref(true)

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const auth = useAuthStore()

const handleSubmit = async () => {
  if (isLoginForm.value) {
    // login 
    try {
      console.log('email', email.value);
      console.log('password', password.value);
      const res = await axios.post('http://127.0.0.1:3000/api/login', { email: email.value, password: password.value })
      // const res = await axios.post('http://localhost:1337/api/auth/local', { identifier: email.value, password: password.value }) // use strapi
      const token = res.data.token
      const user = res.data.email
      console.log(res);
      console.log(token);
      auth.login(token, user)
      router.push({ name: 'userInfo' })
    } catch (error) {
      console.log(error);
      if (error.response) {
        ElMessage({
          showClose: true,
          message: error.response.data.message,
          type: 'error'
        })
      } else {
        ElMessage({
          showClose: true,
          message: error.message,
          type: 'error'
        })
      }
    }

  } else {
    // signup
    try {
      if (password.value === confirmPassword.value) {
        await axios.post('http://127.0.0.1:3000/api/signup', { email: email.value, password: password.value })
        router.push({ name: 'start' })
      } else {
        throw new Error('Password and Confirm Password does not match!')
      }
    } catch (error) {
      if (error.response) {
        ElMessage({
          showClose: true,
          message: error.response.data.message,
          type: 'error'
        })
      } else {
        ElMessage({
          showClose: true,
          message: error.message,
          type: 'error'
        })
      }
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
  backdrop-filter: blur(3px);

  .auth-form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
    max-width: 400px;
    padding: 60px;
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
      width: 280px;
      padding: 15px 15px;
      margin-bottom: 12px;
      border: 1px solid #ddd;
    }

    button {
      font-size: 16px;
      width: 280px;
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