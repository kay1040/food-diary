<template>
  <div class="start">
    <div class="img"></div>
    <form class="form">
      <TypingEffect :text="steps[current].question" delay="80" :key="steps[current].question" class="question" />
      <div class="answer" :style="{ display: isShowAnswer }">
        <select v-model="steps[current].answer" v-if="current === 0">
          <option disabled value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input type="text" v-model.number="steps[current].answer" v-if="current === 1">
        <input type="text" v-model.number="steps[current].answer" v-if="current === 2">
        <input type="text" v-model.number="steps[current].answer" v-if="current === 3">
        <button class="btn" @click.prevent="handleNextStep">NEXT</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import TypingEffect from '../components/TypingEffect.vue';

const router = useRouter()
const isShowAnswer = ref('none')

let current = ref(0)
const steps = reactive([
  {
    question: 'What is your gender?',
    answer: '',
  },
  {
    question: 'What is your age?',
    answer: '',
  },
  {
    question: 'What is your height (unit: cm)?',
    answer: '',
  },
  {
    question: 'What is your weight (unit: kg)?',
    answer: '',
  },
])

const handleNextStep = () => {
  if (current.value < steps.length - 1) {
    current.value = current.value + 1
    isShowAnswer.value = 'none'
  } else {
    router.push({ name: 'user' })
  }
}

onMounted(() => {
  setTimeout(() => {
    isShowAnswer.value = 'block'
  }, steps[current.value].question.length * 80 + 1100);

})

watch(current, () => {

  setTimeout(() => {
    isShowAnswer.value = 'block'
  }, steps[current.value].question.length * 80 + 1100);
})

</script>

<style scoped lang="scss">
.start {
  height: 100vh;
  background-color: rgb(10, 30, 37);
  display: flex;

  @include mobile {
    display: block;
  }

  .img {
    height: 100%;
    width: 50%;
    background-image: url('/images/start-bg1.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    @include mobile {
      height: 50%;
      width: 100%;
    }
  }

  .form {
    color: #fff;
    height: 100%;
    width: 50%;
    height: 500px;
    padding: 0 8%;

    @include mobile {
      height: 50%;
      width: 100%;
      padding: 0 15%;
    }

    .question {
      font-size: 24px;
      margin-top: 200px;

      @include mobile {
        margin-top: 6rem;
      }
    }

    .answer {
      margin-top: 30px;

      select {
        width: 200px;
        height: 30px;
        font-size: 16px;
        border: none;
        border-radius: 4px;
      }

      input {
        width: 200px;
        height: 30px;
      }
    }



    .btn {
      margin-left: 30px;
      height: 30px;
      padding: 0 10px;
      border: none;
      border-radius: 4px;
      background-color: #fff;
      cursor: pointer;
    }
  }
}
</style>