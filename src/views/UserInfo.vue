<template>
  <Loading />
  <div class="user-info" v-show="!loading.isLoading">
    <div class="wrapper">
      <h3>User Information</h3>
      <div class="user-data" v-if="!isEdit">
        <div class="details">
          <div>E-mail</div>
          <div>{{ userData.email }}</div>
        </div>
        <div class="details">
          <div>Gender</div>
          <div>{{ userData.userInfo?.gender }}</div>
        </div>
        <div class="details">
          <div> Age</div>
          <div>{{ userData.userInfo?.age }}</div>
        </div>
        <div class="details">
          <div>Height</div>
          <div>{{ userData.userInfo?.height }}cm</div>
        </div>
        <div class="details">
          <div>Weight</div>
          <div>{{ userData.userInfo?.weight }}kg</div>
        </div>
        <div class="details">
          <div>Activity Level</div>
          <div>{{ userData.userInfo?.activityLevel }}</div>
        </div>
        <div class="details">
          <div>BMR</div>
          <div>{{ user.BMR }}</div>
        </div>
        <div class="details">
          <div>TDEE</div>
          <div>{{ user.TDEE }}</div>
        </div>
        <div class="btn-group">
          <button class="form-btn" @click="isEdit = true">Edit</button>
        </div>
      </div>
      <form v-if="isEdit" class="user-form">
        <div class="details">
          <div>Gender</div>
          <select name="gender" id="gender" v-model="formData.gender">
            <option value="" disabled>Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="details">
          <div>Age</div>
          <input name="age" id="age" type="text" v-model.number="formData.age">
        </div>
        <div class="details">
          <div>Height</div>
          <input name="height" id="height" type="text" v-model.number="formData.height">
        </div>
        <div class="details">
          <div>Weight</div>
          <input name="weight" id="weight" type="text" v-model.number="formData.weight">
        </div>
        <div class="details">
          <div>Activity Level</div>
          <select name="activity" id="activity" v-model="formData.activityLevel">
            <option value="" disabled>Select</option>
            <option value="sedentary">Sedentary: office work, no exercise habits</option>
            <option value="lightly">Lightly: exercise 1-2 days/week</option>
            <option value="moderately">Moderately: exercise 3-5 days/week</option>
            <option value="heavy">Heavy: exercise 6-7 days/week</option>
            <option value="extremely">Extremely: athlete level, exercise 2 times a day</option>
          </select>
        </div>
        <div class="btn-group">
          <button class="form-btn" @click.prevent="isEdit = false">Cancel</button>
          <button class="form-btn" @click.prevent="handleSubmit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Loading from '@/components/Loading.vue'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import { useLoadingStore } from '@/stores/loading'
import { useApiErrorHandler } from '@/hooks/useApiErrorHandler'
import api from '@/api/axios'

const user = useUserStore()
const auth = useAuthStore()


const userId = auth.userId
const loading = useLoadingStore()
let userData = ref({})
let formData = ref({})

const fetchUserData = async () => {
  try {
    loading.showLoading()
    const res = await api.get(`/user/${userId}`)
    userData.value = res.user
    formData.value = { ...userData.value.userInfo }
    user.updateUserInfo(formData.value)
  } catch (error) {
    useApiErrorHandler(error)
  } finally {
    loading.closeLoading()
  }
}

onMounted(() => {
  fetchUserData()
})

const isEdit = ref(false)

const handleSubmit = async () => {
  try {
    if (userData.value.userInfo) {
      await api.put(`/user/${userId}`, { ...formData.value })
    } else {
      await api.post('/user', { userId, ...formData.value })
    }
    user.updateUserInfo(formData.value)
    fetchUserData()
    isEdit.value = false
  } catch (error) {
    useApiErrorHandler(error)
  }
}

</script>

<style  lang="scss" scoped>
.user-info {
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

    .user-data,
    .user-form {
      position: relative;

      .details {
        font-size: 16x;
        color: #555;
        display: flex;

        div {
          width: 200px;
          height: 40px;
        }
      }

      .btn-group {
        display: flex;
        justify-content: center;
        align-items: center;

      }
    }

    .user-form {
      .details {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        font-size: 14px;

        div {
          width: 100%;
          height: 24px;
        }

        input,
        select {
          padding: 10px;
          width: 100%;
          height: 40px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>