<template>
  <div class="home background">
    <div class="container">
      <TypingEffect :text="title" delay="50" class="title" />
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
let buttonVisible = ref('hidden')

const goToStart = () => {
  router.push({ name: 'auth-form' })
}

onMounted(() => {
  setTimeout(() => {
    buttonVisible.value = 'visible';
  }, title.length * 50 + 2000);

})
</script>

<style lang="scss" scoped>
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
      font-size: 36px;

      @include mobile {
        padding: 0 1.5rem;
        font-size: 1.5rem;
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