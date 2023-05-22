<template>
  <div class="profile">
    <div class="content">
      <div class="user-data" v-if="!isEdit">
        <div>E-mail: xxxx</div>
        <div>Gender: {{ user.userData.gender }}</div>
        <div>Age: {{ user.userData.age }}</div>
        <div>Height: {{ user.userData.height }} cm</div>
        <div>Weight: {{ user.userData.weight }} kg</div>
        <div>Activity Level: {{ user.userData.activityLevel }}</div>
        <div>BMR: {{ user.BMR }}</div>
        <div>TDEE: {{ user.TDEE }}</div>
        <button @click="isEdit = true">Edit</button>
      </div>
      <form v-if="isEdit" class="user-form">
        <div>
          <label for="gender">Gender: </label>
          <select name="gender" id="gender" v-model="formData.gender">
            <option value="" disabled>Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label for="age">Age: </label>
          <input name="age" id="age" type="text" v-model.number="formData.age">
        </div>
        <div>
          <label for="height">Height: </label>
          <input name="height" id="height" type="text" v-model.number="formData.height">
        </div>
        <div>
          <label for="weight">Weight: </label>
          <input name="weight" id="weight" type="text" v-model.number="formData.weight">
        </div>
        <div>
          <label for="activity">Activity Level: </label>
          <select name="activity" id="activity" v-model="formData.activityLevel">
            <option value="" disabled>Select</option>
            <option value="sedentary">Sedentary: office work, no exercise habits</option>
            <option value="lightly">Lightly: exercise 1-2 days/week</option>
            <option value="moderately">Moderately: exercise 3-5 days/week</option>
            <option value="heavy">Heavy: exercise 6-7 days/week</option>
            <option value="extremely">Extremely: athlete level, exercise 2 times a day</option>
          </select>
        </div>
        <div>
          <button @click.prevent="isEdit = false">Cancel</button>
          <button @click.prevent="handleSubmit">Submit</button>
        </div>
      </form>
    </div>

  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user'
const user = useUserStore()

const formData = { ...user.userData }

const isEdit = ref(false)

const handleSubmit = () => {
  user.updateUserData(formData)
  isEdit.value = false
}

</script>
<style  lang="scss" scoped>
.profile {
  padding-top: 50px;
  background-color: #ddd;
  height: 100vh;

  .content {
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