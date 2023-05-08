<script setup>
import { onMounted, ref } from 'vue'
const title = "Healthy eating is a journey, not a destination.\nLet's enjoy the ride!"
let text = ref('');
let buttonVisible = ref('hidden')

onMounted(() => {
  let i = 0;
  const timer = setInterval(() => {
    text.value += title[i++];
    if (i === title.length) {
      clearInterval(timer);
      setTimeout(() => {
        buttonVisible.value = 'visible';
      }, 500);
    }
  }, 50);
})
</script>

<template>
  <div class="home">
    <div class="container">
      <h1 class="title">
        <span v-text="text"></span>
        <span></span>
      </h1>
      <button :style="{ visibility: buttonVisible }" class="btn">START</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@mixin mobile {
  @media(max-width:768px) {
    @content;
  }
}

.home {
  width: 100%;
  height: 100%;
  background-image: url('/images/background.jpg');
  background-size: cover;

  @include mobile {
    background-position: center center;
  }

  .container {
    height: auto;
    padding: 50px 20px;
    max-width: 1000px;
    width: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    line-height: 2;
    flex-flow: column;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);

    .title {
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      white-space: pre-wrap;
      color: white;

      @include mobile {
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

      &:hover {
        background-color: rgba(255, 255, 255, 0.8);
      }
    }
  }
}
</style>