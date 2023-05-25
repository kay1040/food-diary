<template>
  <div class="password">
    <div class="wrapper">
      <form class="password-form">
        <div>
          <label for="current-password">Current Password: </label>
          <input name="current-password" id="current-password" type="password" v-model="currentPassword">
        </div>
        <div>
          <label for="new-password">New Password: </label>
          <input name="new-password" id="new-password" type="password" v-model="newPassword">
        </div>
        <div>
          <label for="confirm-password">Confirm Password: </label>
          <input name="confirm-password" id="confirm-password" type="password" v-model.number="confirmPassword">
        </div>
        <div>
          <button @click.prevent="handleSubmit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useApiErrorHandler } from '../hooks/useApiErrorHandler'

const router = useRouter()
const auth = useAuthStore()
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const handleSubmit = async () => {
  try {
    console.log(newPassword.value , confirmPassword.value)
    if (newPassword.value === confirmPassword.value) {
      
      const userId = auth.userId
      await axios.put('http://127.0.0.1:3000/api/user/password', {
        userId,
        currentPassword: currentPassword.value,
        newPassword: newPassword.value
      })
      ElMessage.success('Password updated successfully!')
      router.push({ name: 'food-diary' })
    } else {
      throw new Error('New Password and Confirm Password does not match!')
    }
  } catch (error) {
    useApiErrorHandler(error)
  }
}
</script>

<style  lang="scss" scoped>
.password {
  padding-top: 50px;
  background-color: #ddd;
  height: 100vh;

  .wrapper {
    width: 800px;
    background-color: #fff;
    margin: 30px auto;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);

    @include mobile {
      width: 90%;
      margin: 1.2rem auto;
    }

    .password-form {
      div {
        text-align: left;
        font-size: 16x;
        padding: 8px;
        color: #555;
      }

    }
  }


}
</style>