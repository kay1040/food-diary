<template>
  <Loading/>
  <div class="password">
    <div class="wrapper">
      <h3>Change Password</h3>
      <form class="password-form">
        <div class="details">
          <div>Current Password</div>
          <input name="current-password" id="current-password" type="password" v-model="currentPassword">
        </div>
        <div class="details">
          <div>New Password</div>
          <input name="new-password" id="new-password" type="password" v-model="newPassword">
        </div>
        <div class="details">
          <div>Confirm Password</div>
          <input name="confirm-password" id="confirm-password" type="password" v-model.number="confirmPassword">
        </div>
        <div class="btn-group">
          <button class="form-btn" @click.prevent="handleSubmit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Loading from '@/components/Loading.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLoadingStore } from '@/stores/loading'
import { useApiErrorHandler } from '@/hooks/useApiErrorHandler'
import api from '@/api/axios'

const router = useRouter()
const auth = useAuthStore()
const loading = useLoadingStore()

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const handleSubmit = async () => {
  try {
    loading.showLoading()
    if (newPassword.value === confirmPassword.value) {
      const userId = auth.userId
      await api.put('/user/password', {
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
  } finally {
    loading.closeLoading()
  }
}
</script>

<style  lang="scss" scoped>
.password {
  padding-top: 50px;
  background-color: #ddd;
  height: 100vh;

  .wrapper {
    width: 700px;
    background-color: #fff;
    margin: 30px auto;
    padding: 40px;
    border-radius: 5px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);

    @include mobile {
      width: 90%;
      margin: 1.2rem auto;
      padding: 1.6rem;
    }

    h3 {
      margin-bottom: 30px;
      color: #666;
    }

    .password-form {
      position: relative;

      .details {
        font-size: 14px;
        color: #555;
        display: flex;
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        div {
          width: 100%;
          height: 24px;
        }

        input {
          padding: 10px;
          width: 100%;
          height: 40px;
          font-size: 14px;
        }
      }

      .btn-group {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>