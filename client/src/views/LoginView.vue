<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import login from '@/components/Login.vue';
import MapBox from '@/components/mapbox.vue';
import bgImage from '@/assets/img/bg-login.jpg'
</script>

<template>
    <div id="body">
        <HeaderComponent/>
        <login/>
    </div>
</template>


<style lang="scss" scoped>
#body{
    // background-color: white;
    height: 100vh;
    width: 100%;
    background-image: url('@/assets/img/bg-login.jpg');
    background-position: center;
    background-size: cover;
}
</style>