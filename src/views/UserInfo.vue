<template>
  <div class="user-info">
    <div class="wrapper">
      <div class="user-data" v-if="!isEdit">
        <div class="details">
          <div class="title">E-mail: </div>
          <div>{{ userData.email }}</div>
        </div>
        <div class="details">
          <div class="title">Gender: </div>
          <div>{{ userData.userInfo?.gender }}</div>
        </div>
        <div class="details">
          <div class="title"> Age: </div>
          <div>{{ userData.userInfo?.age }}</div>
        </div>
        <div class="details">
          <div class="title">Height: </div>
          <div>{{ userData.userInfo?.height }} cm</div>
        </div>
        <div class="details">
          <div class="title">Weight: </div>
          <div>{{ userData.userInfo?.weight }} kg</div>
        </div>
        <div class="details">
          <div class="title">Activity Level: </div>
          <div>{{ userData.userInfo?.activityLevel }}</div>
        </div>
        <div class="details">
          <div class="title">BMR: </div>
          <div>{{ user.BMR }}</div>
        </div>
        <div class="details">
          <div class="title">TDEE: </div>
          <div>{{ user.TDEE }}</div>
        </div>
        <div class="btn-group">
          <button class="form-btn" @click="isEdit = true">Edit</button>
        </div>
      </div>
      <form v-if="isEdit" class="user-form">
        <div class="details">
          <div class="title">E-mail: </div>
          <div>{{ userData.email }}</div>
        </div>
        <div class="details">
          <div class="title"><label for="gender">Gender: </label></div>
          <div>
            <select name="gender" id="gender" v-model="formData.gender">
              <option value="" disabled>Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div class="details">
          <div class="title"><label for="age">Age: </label></div>
          <div><input name="age" id="age" type="text" v-model.number="formData.age"></div>
        </div>
        <div class="details">
          <div class="title"><label for="height">Height: </label></div>
          <div><input name="height" id="height" type="text" v-model.number="formData.height"></div>
        </div>
        <div class="details">
          <div class="title"><label for="weight">Weight: </label></div>
          <div><input name="weight" id="weight" type="text" v-model.number="formData.weight"></div>
        </div>
        <div class="details">
          <div class="title"><label for="activity">Activity Level: </label></div>
          <div>
            <select name="activity" id="activity" v-model="formData.activityLevel">
              <option value="" disabled>Select</option>
              <option value="sedentary">Sedentary: office work, no exercise habits</option>
              <option value="lightly">Lightly: exercise 1-2 days/week</option>
              <option value="moderately">Moderately: exercise 3-5 days/week</option>
              <option value="heavy">Heavy: exercise 6-7 days/week</option>
              <option value="extremely">Extremely: athlete level, exercise 2 times a day</option>
            </select>
          </div>
        </div>
        <div class="details">
          <div class="title">BMR: </div>
          <div>-</div>
        </div>
        <div class="details">
          <div class="title">TDEE: </div>
          <div>-</div>
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
import axios from 'axios'
import { useUserStore } from '../stores/user'
import { useAuthStore } from '../stores/auth'
import { useApiErrorHandler } from '../hooks/useApiErrorHandler'

const user = useUserStore()
const auth = useAuthStore()

const userId = auth.userId
const token = auth.token
const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

let userData = ref({})
let formData = ref({})

const fetchUserData = async () => {
  try {
    const res = await axios.get(`http://127.0.0.1:3000/api/user/${userId}`, config)
    userData.value = res.data.user
    formData.value = { ...userData.value.userInfo }
    user.updateUserInfo(formData.value)
  } catch (error) {
    useApiErrorHandler(error)
  }
}

onMounted(() => {
  fetchUserData()
})

const isEdit = ref(false)

const handleSubmit = async () => {
  try {
    user.updateUserInfo(formData.value)
    await axios.put(`http://127.0.0.1:3000/api/user/${userId}`, { ...formData.value })
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

    .user-data,
    .user-form {
      position: relative;
      padding-bottom: 60px;
      .details {
        font-size: 16x;
        color: #555;
        display: flex;

        .title {
          text-align: right;
        }

        div {
          padding: 8px;
          width: 150px;
          height: 40px;
        }

      }
      .btn-group {
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
  }
}
</style>