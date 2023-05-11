<template>
  <AppHeader />
  <router-view />
  <footer />
</template>

<script setup>
import AppHeader from './components/AppHeader.vue';

</script>

<style lang="scss" scoped>
.background {
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