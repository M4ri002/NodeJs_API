<script setup>
//imports
import OptionsComponent from '@/components/OptionsComponent.vue' 

</script>
<template>
  <main class="container-fluid">
    <div>
      <OptionsComponent/>
    </div>
  </main>
</template>

<style lang="scss">
    @import "@/css/styles.scss";
    
    * {
      margin: 0;
      padding: 0;
    }
    main, html {
        background: rgb(227, 209, 202);
        padding: 0!important;
    }
</style>
