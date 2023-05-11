<template>
  <div class="home background">
    <div class="container">
      <h1 class="title">
        <span v-text="text"></span>
        <span :style="{ visibility: cursorVisible }" class="blinking-cursor">|</span>
      </h1>
      <button :style="{ visibility: buttonVisible }" class="btn unselectable" @click="goToStart">
        START
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import router from '../router';
const title = "Healthy eating is a journey, not a destination.\nLet's enjoy the ride!"
let text = ref('');
let cursorVisible = ref('visible')
let buttonVisible = ref('hidden')

const goToStart = () => {
  router.push({ name: 'auth-form' })
}

onMounted(() => {
  let i = 0;
  const timer = setInterval(() => {
    text.value += title[i++];
    if (i === title.length) {
      clearInterval(timer);
      cursorVisible.value = 'hidden'
      setTimeout(() => {
        buttonVisible.value = 'visible';
      }, 500);
    }
  }, 50);
})
</script>

<style lang="scss" scoped>

@keyframes cursor-blink {
  from, to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.home {
  width: 100%;
  height: 100%;
  height: 100vh;

  @include mobile {
    background-position: center center;
  }
  .container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 2;
    flex-flow: column;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(3px);

    .title {
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      white-space: pre-wrap;
      color: white;
      

      @include mobile {
        padding: 0 1.5rem;
        font-size: 1.5rem;
      }

      .blinking-cursor {
        animation: cursor-blink .7s infinite;
      }
    }

    .btn {
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      margin-top: 20px;
      font-size: 20px;
      color: #000;
      font-weight: bold;
      letter-spacing: 3px;
      border: none;
      border-radius: 10px;
      padding: 10px 30px;
      background-color: #fff;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      transition: all .3s;

      &:hover {
        transform: scale(1.2);
      }
    }
  }
}
</style>