 <script setup>
import 'mapbox-gl/dist/mapbox-gl.css';
import HeaderComponent from '@/components/HeaderComponent.vue' //Importa el componente header
import MapBox from '@/components/mapbox.vue';
import layer1 from '@/components/layer1.vue';
import search from '@/components/search.vue';

</script>
<template>
  <section>
    <HeaderComponent/>
    <layer1/>
    <MapBox/>
    <search/>
    <!-- muestra el componente header en este componente pasandole un parametro (menu="1") -->
  </section>
</template>

<style scoped lang="scss">

*{
  margin: 0;
  padding: 0;
}

section{
  background-color: black; //Para que no pegue un flashazo blanco al cargar la home
  position: relative;
  height: 100vh;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  
}

</style>
