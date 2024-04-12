<script setup>
import HeaderTeo from '@/components/HeaderTeo.vue'
import Section1 from '@/components/AboutSection1.vue'
import Section2 from '@/components/AboutSection2.vue'
import Section3 from '@/components/AboutSection3.vue'
import Section4 from '@/components/AboutSection4.vue'
import Section5 from '@/components/AboutSection5.vue'
import FooterTeo from '@/components/FooterTeo.vue'

</script>
<template>
  <section class="allComponents">
    <HeaderTeo/>
    <Section1/>
    <Section2/>
    <Section3 type="0"/>
    <Section4/>
    <Section5/>
    <Section3 type="1"/>
    <FooterTeo/>
  </section>
</template>

<style scoped lang="scss">
*{
  margin: 0;
  padding: 0;
}

</style>