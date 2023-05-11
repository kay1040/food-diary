<template>
  <div class="form-container">
    <form class="auth-form" @submit.prevent="handleSubmit" v-if="isLoginForm">
      <h2>LOG IN</h2>
      <input type="text" placeholder="Email Address" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <button class="login-btn">LOG IN</button>
      <a class="toggle-from" @click="isLoginForm = !isLoginForm">Create Account</a>
    </form>
    <form class="auth-form" @submit.prevent="handleSubmit" v-if="!isLoginForm">
      <h2>SIGN UP</h2>
      <input type="text" placeholder="Email Address" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <input type="password" placeholder="Repeat Password" v-model="passwordConfirmation">
      <button class="login-btn">SIGN UP</button>
      <a class="toggle-from" @click="isLoginForm = !isLoginForm">Already have an account?</a>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const isLoginForm = ref(true)
const handleSubmit = (e) => {
  router.push({ name: 'user' })
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
    width: 30%;
    height: 50%;
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
      border-radius: 4px;
      font-weight: bold;
      cursor: pointer;
    }

    .login-btn {
      color: #fff;
      background-color:#697785;
      margin-bottom: 12px;
    }

    .toggle-from {
      color: #697785;
      cursor: pointer;
    }
  }
}
</style>