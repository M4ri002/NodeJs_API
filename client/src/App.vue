<script setup>
import { RouterView } from 'vue-router'
// import { RouterLink, RouterView } from 'vue-router';
localStorage.language = "es"; //Idioma por defecto
</script>
<template>
    <RouterView />
</template>
<style lang="scss">
@import "@/css/styles.scss";
// body {
// overflow-x: hidden;
// }</style>
