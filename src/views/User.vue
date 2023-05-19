<template>
  <div class="user">
    <div class="userData" v-if="!isEdit">
      <div>Gender: {{ user.userData.gender }}</div>
      <div>Age: {{ user.userData.age }}</div>
      <div>Height: {{ user.userData.height }}</div>
      <div>Weight: {{ user.userData.weight }}</div>
      <div>Activity Level: {{ user.userData.activityLevel }}</div>
      <div>BMR: {{ user.BMR }}</div>
      <div>TDEE: {{ user.TDEE }}</div>
      <button @click="isEdit = true">Edit</button>
    </div>
    <form v-if="isEdit">
      <div>
        <label for="gender">Gender:</label>
        <select name="gender" id="gender" v-model="formData.gender">
          <option value="" disabled>Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label for="age">Age:</label>
        <input name="age" id="age" type="text" v-model.number="formData.age">
      </div>
      <div>
        <label for="height">Height:</label>
        <input name="height" id="height" type="text" v-model.number="formData.height">
      </div>
      <div>
        <label for="weight">Weight:</label>
        <input name="weight" id="weight" type="text" v-model.number="formData.weight">
      </div>
      <div>
        <label for="activity">Activity Level:</label>
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
</template>
<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user'
const user = useUserStore()

const formData = {
  gender: '',
  age: '',
  height: '',
  weight: '',
  activityLevel: '',
}

const isEdit = ref(false)

const handleSubmit = () => {
  user.updateUserData(formData)
  isEdit.value = false
}

</script>
<style  lang="scss" scoped>
.user {
  padding-top: 100px;

  div {
    margin: 0 auto;
    width: 800px;
    text-align: left;
    font-size: 20px;
    padding: 10px;
    color: #555;
  }
}
</style>