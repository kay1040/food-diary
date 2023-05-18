<template>
  <div :style="{ backgroundColor: steps[current].backgroundColor }">
    <Transition name="fade">
      <div v-show="isShowNextStep" class="start">
        <div class="img" :style="{ backgroundImage: steps[current].backgroundImage }"></div>
        <form class="form" :style="{ backgroundColor: steps[current].backgroundColor }">
          <TypingEffect :text="steps[current].question" delay="50" :key="steps[current].question" class="question" />
          <Transition name="fade">
            <div class="answer" v-show="isShowAnswer">
              <el-select v-model="steps[current].answer" v-if="current === 0" placeholder="Select" size="large">
                <el-option label="Male" value="male" />
                <el-option label="Female" value="female" />
              </el-select>
              <el-input v-model.number="steps[current].answer" v-if="current === 1" size="large"
                placeholder="Please Input" />
              <el-input v-model.number="steps[current].answer" v-if="current === 2" size="large"
                placeholder="Please Input" />
              <el-input v-model.number="steps[current].answer" v-if="current === 3" size="large"
                placeholder="Please Input" />
              <el-select v-model="steps[current].answer" v-if="current === 4" placeholder="Select" size="large">
                <el-option label="Extremely inactive" value="extremely-inactive" />
                <el-option label="Sedentary" value="sedentary" />
                <el-option label="Moderately active" value="moderately-active" />
                <el-option label="Vigorously active" value="vigorously-active" />
                <el-option label="Extremely active" value="extremely-active" />
              </el-select>
              <ul v-if="current === 4" class="desc">
                <li>Extremely inactive: Cerebral palsy patient.</li>
                <li>Sedentary: Office worker getting little or no exercise.</li>
                <li>Moderately active: Construction worker or person running one hour daily.</li>
                <li>Vigorously active: Agricultural worker (non mechanized) or person swimming two hours daily.</li>
                <li>Extremely active: Competitive cyclist.</li>
              </ul>
              <button v-show="isShowPrevBtn" class="prev btn" @click.prevent="handlePrevStep">
                <el-icon>
                  <Back />
                </el-icon>
              </button>
              <button class="next btn" @click.prevent="handleNextStep">
                <el-icon>
                  <Right />
                </el-icon>
              </button>
            </div>
          </Transition>
        </form>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import TypingEffect from '../components/TypingEffect.vue';
import { useUserStore } from '../stores/user'

const router = useRouter()
const user = useUserStore()

const isShowNextStep = ref(true);
const isShowAnswer = ref(false)
const isShowPrevBtn = ref(false)

let current = ref(0)
const steps = reactive([
  {
    question: 'What is your gender?',
    answer: '',
    backgroundImage: 'url("/images/start-bg1.jpg")',
    backgroundColor: '#0a1e25',
  },
  {
    question: 'What is your age?',
    answer: '',
    backgroundImage: 'url("/images/start-bg2.jpg")',
    backgroundColor: '#281b08',
  },
  {
    question: 'What is your height (unit: cm)?',
    answer: '',
    backgroundImage: 'url("/images/start-bg3.jpg")',
    backgroundColor: '#444c41'
  },
  {
    question: 'What is your weight (unit: kg)?',
    answer: '',
    backgroundImage: 'url("/images/start-bg4.jpg")',
    backgroundColor: '#12161a'
  },
  {
    question: 'What is your activity level?',
    answer: '',
    backgroundImage: 'url("/images/start-bg5.jpg")',
    backgroundColor: '#111e0d'
  },
])

const handlePrevStep = () => {
  if (current.value > 0) {
    isShowAnswer.value = false
    isShowNextStep.value = false;
    setTimeout(() => {
      current.value = current.value - 1
      isShowNextStep.value = true;
    }, 300)
  }
}

const handleNextStep = async () => {
  if (current.value < steps.length - 1) {
    isShowAnswer.value = false
    isShowNextStep.value = false;
    setTimeout(() => {
      current.value = current.value + 1
      isShowNextStep.value = true;
    }, 300)
  } else {
    user.gender = steps[0].answer
    user.age = steps[1].answer
    user.height = steps[2].answer
    user.weight = steps[3].answer
    user.activityLevel = steps[4].answer
    router.push({ name: 'user' })
  }
}

onMounted(() => {
  setTimeout(() => {
    isShowAnswer.value = true
  }, steps[current.value].question.length * 60 + 500)
})

watch(current, (newVal) => {
  setTimeout(() => {
    isShowAnswer.value = true
  }, steps[newVal].question.length * 60 + 500)
  if (newVal > 0) {
    isShowPrevBtn.value = true
  } else {
    isShowPrevBtn.value = false
  }
})

</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

:deep(*) {
  box-shadow: none;
  --el-input-focus-border: none;
  --el-input-focus-border-color: none;
  --el-select-input-focus-border-color: none;
}

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

      :deep(.el-select) {
        width: 240px;

        @include mobile {
          width: 100%;
        }
      }

      :deep(.el-input) {
        @include mobile {
          width: 100%;
        }
      }

      .desc {
        margin-top: 20px;

        li {
          margin-top: 8px;
        }
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
      padding-top: 5px;
      height: 30px;
      width: 45px;
      border: none;
      border-radius: 4px;
      background-color: #fff;
      font-size: 20px;
      cursor: pointer;
    }
  }
}
</style>