<script setup>
//imports
import AboutComponent from '@/components/AboutComponent.vue' 

</script>
<template>
  <main class="container-fluid">
    <div>
      <AboutComponent/>
    </div>
  </main>
</template>

<style lang="scss">
    @import "@/css/styles.scss";
    
    * {
      margin: 0;
      padding: 0;
    }
    main {
        background: rgb(227, 209, 202);
        padding: 0!important;
    }
</style>
