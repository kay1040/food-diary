<template>
  <AppHeader />
  <router-view />
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import useAutoLogout from './hooks/useAutoLogout';

useAutoLogout()

</script>