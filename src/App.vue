<script setup>
import AppHeader from './components/AppHeader.vue';
</script>
<template>
  <div id="app">
    <AppHeader />
    <router-view />
    <footer />
  </div>
</template>
<style lang="scss" scoped>
#app {
  height: 100vh;
  background-image: url('/images/background-home.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;

  @include mobile {
    background-position: center center;
  }

}
</style>