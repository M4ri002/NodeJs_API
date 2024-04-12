<script setup>
import { ref, onMounted } from 'vue';
import { useI18nStore } from '@/stores/i18n.js'
import Header from '@/components/HeaderComponent.vue'
import FooterTeo from '@/components/FooterTeo.vue'
import OptionsMain from '@/components/OptionsMain.vue'

</script>
<template>
  <section class="allComponents">
    <Header/>
    <OptionsMain />
    <!-- <FooterTeo/> -->
  </section>
</template>

<style scoped lang="scss">
*{
  margin: 0;
  padding: 0;
}

</style>