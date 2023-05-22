<template>
  <div :style="{ backgroundColor: steps[current].backgroundColor, overflow: 'hidden' }">
    <Transition name="fade-slide-down-up" appear>
      <div v-show="isShowNextStep" class="start">
        <div class="img" :style="{ backgroundImage: steps[current].backgroundImage }"></div>
        <form class="form" :style="{ backgroundColor: steps[current].backgroundColor }">
          <div>
            <div class="question">{{ steps[current].question }}</div>
            <div class="answer">
              <el-select v-model="steps[current].answer" v-if="current === 0" placeholder="Select" size="large">
                <el-option label="Male" value="male" />
                <el-option label="Female" value="female" />
              </el-select>
              <el-input v-model.number="steps[current].answer" v-else-if="current === 1" size="large"
                placeholder="Please Input" />
              <el-input v-model.number="steps[current].answer" v-else-if="current === 2" size="large"
                placeholder="Please Input">
                <template #append>cm</template>
              </el-input>
              <el-input v-model.number="steps[current].answer" v-else-if="current === 3" size="large"
                placeholder="Please Input">
                <template #append>kg</template>
              </el-input>
              <el-select v-model="steps[current].answer" v-else-if="current === 4" placeholder="Select" size="large">
                <el-option label="Sedentary: office work, no exercise habits" value="sedentary" />
                <el-option label="Lightly: exercise 1-2 days/week" value="lightly" />
                <el-option label="Moderately: exercise 3-5 days/week" value="moderately" />
                <el-option label="Heavy: exercise 6-7 days/week" value="heavy" />
                <el-option label="Extremely: athlete level, exercise 2 times a day" value="extremely" />
              </el-select>
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
          </div>
        </form>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const user = useUserStore()

const isShowNextStep = ref(true);
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
    question: 'What is your height?',
    answer: '',
    backgroundImage: 'url("/images/start-bg3.jpg")',
    backgroundColor: '#444c41'
  },
  {
    question: 'What is your weight?',
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
    isShowNextStep.value = false;
    setTimeout(() => {
      current.value = current.value - 1
      isShowNextStep.value = true;
    }, 200)
  }
}

const handleNextStep = async () => {
  if (current.value < steps.length - 1) {
    isShowNextStep.value = false;
    setTimeout(() => {
      current.value = current.value + 1
      isShowNextStep.value = true;
    }, 200)
  } else {
    user.userData.gender = steps[0].answer
    user.userData.age = steps[1].answer
    user.userData.height = steps[2].answer
    user.userData.weight = steps[3].answer
    user.userData.activityLevel = steps[4].answer
    router.push({ name: 'profile' })
  }
}

watch(current, (newVal) => {
  if (newVal > 0) {
    isShowPrevBtn.value = true
  } else {
    isShowPrevBtn.value = false
  }
})

</script>

<style scoped lang="scss">
.fade-slide-down-up-enter-active {
  animation: fade-slide-down-up-enter 0.5s;
}

.fade-slide-down-up-leave-active {
  animation: fade-slide-down-up-leave 0.5s;
}

@keyframes fade-slide-down-up-enter {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-slide-down-up-leave {
  0% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
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
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    @include mobile {
      width: 100%;
      padding: 0 3rem;
    }

    .question {
      font-size: 24px;
    }

    .answer {
      margin-top: 30px;
      padding-bottom: 100px;

      :deep(.el-select) {
        width: 100%;
      }

      :deep(.el-input) {
          width: 100%;
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
      @include mobile {
        bottom: 1.6rem;
      }
    }
  }
}
</style>