<template>
  <div :style="{ backgroundColor: steps[current].backgroundColor, overflow: 'hidden' }">
    <Transition name="fade-slide-down-up" appear>
      <div v-show="isShowNextStep" class="start">
        <div class="img" :style="{ backgroundImage: steps[current].backgroundImage }"></div>
        <el-form :model="formData" class="form" ref="formRef" :rules="rules"
          :style="{ backgroundColor: steps[current].backgroundColor }">
          <div>
            <div class="question">{{ steps[current].question }}</div>
            <div class="answer">
              <el-form-item prop="gender">
                <el-select v-model="formData.gender" v-if="current === 0" placeholder="Select" size="large">
                  <el-option label="Male" value="male" />
                  <el-option label="Female" value="female" />
                </el-select>
              </el-form-item>
              <el-form-item prop="age">
                <el-input v-model.number="formData.age" v-if="current === 1" size="large" placeholder="Please Input" />
              </el-form-item>
              <el-form-item prop="height">
                <el-input v-model.number="formData.height" v-if="current === 2" size="large" placeholder="Please Input">
                  <template #append>cm</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="weight">
                <el-input v-model.number="formData.weight" v-if="current === 3" size="large" placeholder="Please Input">
                  <template #append>kg</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="activityLevel">
                <el-select v-model="formData.activityLevel" v-if="current === 4" placeholder="Select" size="large">
                  <el-option label="Sedentary: office work, no exercise habits" value="sedentary" />
                  <el-option label="Lightly: exercise 1-2 days/week" value="lightly" />
                  <el-option label="Moderately: exercise 3-5 days/week" value="moderately" />
                  <el-option label="Heavy: exercise 6-7 days/week" value="heavy" />
                  <el-option label="Extremely: athlete level, exercise 2 times a day" value="extremely" />
                </el-select>
              </el-form-item>
              <button v-show="isShowPrevBtn" class="prev btn" @click.prevent="handlePrevStep">
                <el-icon>
                  <Back />
                </el-icon>
              </button>
              <button class="next btn" @click.prevent="handleNextStep(formRef)">
                <el-icon>
                  <Right />
                </el-icon>
              </button>
            </div>
          </div>
        </el-form>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import { useApiErrorHandler } from '@/hooks/useApiErrorHandler'
import api from '@/api/axios'

const router = useRouter()
const user = useUserStore()
const auth = useAuthStore()

const isShowNextStep = ref(true)
const isShowPrevBtn = ref(false)

let current = ref(0)
const steps = reactive([
  {
    question: 'What is your gender?',
    backgroundImage: 'url("/images/start-bg1.jpg")',
    backgroundColor: '#0a1e25',
    prop: 'gender'
  },
  {
    question: 'What is your age?',
    backgroundImage: 'url("/images/start-bg2.jpg")',
    backgroundColor: '#281b08',
    prop: 'age'
  },
  {
    question: 'What is your height?',
    backgroundImage: 'url("/images/start-bg3.jpg")',
    backgroundColor: '#444c41',
    prop: 'height'
  },
  {
    question: 'What is your weight?',
    backgroundImage: 'url("/images/start-bg4.jpg")',
    backgroundColor: '#12161a',
    prop: 'weight'
  },
  {
    question: 'What is your activity level?',
    backgroundImage: 'url("/images/start-bg5.jpg")',
    backgroundColor: '#111e0d',
    prop: 'activityLevel'
  },
])

const formRef = ref(null)

const formData = reactive({
  gender: '',
  age: '',
  height: '',
  weight: '',
  activityLevel: '',
})

const rules = reactive({
  gender: [
    { required: true, message: 'Please select gender' },
  ],
  age: [
    { required: true, message: 'Please input age'},
    { type: 'number', message: 'Age must be a number'}
  ],
  height: [
    { required: true, message: 'Please input height'},
    { type: 'number', message: 'Height must be a number'}
  ],
  weight: [
    { required: true, message: 'Please input weight'},
    { type: 'number', message: 'Weight must be a number'}
  ],
  activityLevel: [
    { required: true, message: 'Please select activity level'},
  ],
})

const handlePrevStep = () => {
  if (current.value > 0) {
    isShowNextStep.value = false
    setTimeout(() => {
      current.value = current.value - 1
      isShowNextStep.value = true
    }, 200)
  }
}

const handleNextStep = async (formRef) => {
  if (current.value < steps.length - 1) {
    await formRef.validateField(steps[current.value].prop, (valid) => {
      if (valid) {
        isShowNextStep.value = false
        setTimeout(() => {
          current.value = current.value + 1
          isShowNextStep.value = true
        }, 200)
      } else {
        return
      }
    })
  } else {
    await formRef.validateField('activityLevel', async (valid) => {
      if (valid) {
        try {
          const userId = auth.userId
          user.updateUserInfo(formData)
          await api.post('/user', { userId, ...user.userInfo })
          router.push({ name: 'userInfo' })
        } catch (error) {
          useApiErrorHandler(error)
        }
      } else {
        return
      }
    })
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
      color: #333;
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