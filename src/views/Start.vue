<template>
  <div class="start">
    <div class="img" :style="{ backgroundImage: steps[current].backgroundImage }"></div>
    <form class="form" :style="{ backgroundColor: steps[current].backgroundColor }">
      <TypingEffect :text="steps[current].question" delay="60" :key="steps[current].question" class="question" />
      <div class="answer" :style="{ display: isShowAnswer }">
        <select v-model="steps[current].answer" v-if="current === 0">
          <option disabled value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input type="text" v-model.number="steps[current].answer" v-if="current === 1">
        <input type="text" v-model.number="steps[current].answer" v-if="current === 2">
        <input type="text" v-model.number="steps[current].answer" v-if="current === 3">
        <select v-model="steps[current].answer" v-if="current === 4">
          <option disabled value="">Select</option>
          <option value="extremely-inactive">Extremely inactive</option>
          <option value="sedentary">Sedentary</option>
          <option value="moderately-active">Moderately active</option>
          <option value="vigorously-active">Vigorously active</option>
          <option value="extremely-active">Extremely active</option>
        </select>
        <div v-if="current === 4" class="desc">
          <p>Extremely inactive: Cerebral palsy patient</p>
          <p>Sedentary: Office worker getting little or no exercise</p>
          <p>Moderately active: Construction worker or person running one hour daily</p>
          <p>Vigorously active: Agricultural worker (non mechanized) or person swimming two hours daily</p>
          <p>Extremely active: Competitive cyclist</p>
        </div>
        <button v-show="isShowPrevBtn" class="prev btn" @click.prevent="handlePrevStep">PREV</button>
        <button class="next btn" @click.prevent="handleNextStep">NEXT</button>
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
const isShowPrevBtn = ref(false)

let current = ref(0)
const steps = reactive([
  {
    question: 'What is your gender?',
    answer: '',
    backgroundImage: 'url("/images/start-bg1.jpg")',
    backgroundColor: '#0A1E25'
  },
  {
    question: 'What is your age?',
    answer: '',
    backgroundImage: 'url("/images/start-bg2.jpg")',
    backgroundColor: '#281B08'
  },
  {
    question: 'What is your height (unit: cm)?',
    answer: '',
    backgroundImage: 'url("/images/start-bg3.jpg")',
    backgroundColor: '#444C41'
  },
  {
    question: 'What is your weight (unit: kg)?',
    answer: '',
    backgroundImage: 'url("/images/start-bg4.jpg")',
    backgroundColor: 'rgb(18, 22, 26)'
  },
  {
    question: 'What is your activity level?',
    answer: '',
    backgroundImage: 'url("/images/start-bg5.jpg")',
    backgroundColor: 'rgb(17, 30, 13)'
  },
])



const handlePrevStep = () => {
  if (current.value > 0) {
    current.value = current.value - 1
    isShowAnswer.value = 'none'
  }
}

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
  }, steps[current.value].question.length * 60 + 1200)
})

watch(current, (newVal) => {
  setTimeout(() => {
    isShowAnswer.value = 'block'
  }, steps[current.value].question.length * 80 + 1100)
  if (newVal > 0) {
    isShowPrevBtn.value = true
  } else {
    isShowPrevBtn.value = false
  }
})

</script>

<style scoped lang="scss">
.start {
  height: 100vh;
  display: flex;

  @include mobile {
    flex-direction: column;
  }

  .img {
    height: 100%;
    width: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    @include mobile {
      min-height: 50%;
      width: 100%;
      background-position: bottom;
    }
  }

  .form {
    color: #fff;
    height: 100%;
    width: 50%;
    padding: 0 10%;
    position: relative;

    @include mobile {
      width: 100%;
      padding: 0 15%;
      background-color: #ddd;
    }

    .question {
      font-size: 24px;
      margin-top: 45%;

      @include mobile {
        margin-top: 4rem;
      }
    }

    .answer {
      margin-top: 30px;
      padding-bottom: 150px;

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

    .prev {
      left: 50px;

      @include mobile {
        left: 1.6rem;
      }
    }

    .next {
      right: 50px;

      @include mobile {
        right: 1.6rem;
      }
    }

    .btn {
      position: absolute;
      bottom: 50px;
      height: 30px;
      width: 80px;
      border: none;
      border-radius: 4px;
      background-color: #fff;
      font-weight: bold;
      cursor: pointer;

      @include mobile {
        height: 2rem;
        width: 5rem;
        bottom: 1.6rem;
      }


    }
  }
}
</style>