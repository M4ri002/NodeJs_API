<!-- Este componente es el que gestiona los componentes de una pagina -->
<script setup>
import home from '@/components/home.vue'
// import Section2Component from '@/components/Section2Component.vue'
</script>
<template>
  <main>
    <div>
      <home/> <!--vemos que se importa el componente y se cargará en la home ya que asi lo hemos declarado en el js del archivo de router -->
    </div>
  </main>
</template>
<style lang="scss">
@import "@/css/styles.scss";
div {
}
</style>

