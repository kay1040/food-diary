<template>
  <AppHeader />
  <router-view />
  <footer />
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import useAutoLogout from './hooks/useAutoLogout';

useAutoLogout()

</script>