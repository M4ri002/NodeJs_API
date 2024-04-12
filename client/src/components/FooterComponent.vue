<script setup>
import { useI18nStore } from '@/stores/i18n.js'
// -----------------------------------------------------------
const i18n = useI18nStore();
// -----------------------------------------------------------
</script>
<template>
  <footer>
    <ul>
      <li>
        <a href="#" v-html="i18n._('es-fot-1')"></a>
      </li>
      <li>
        <a href="#" v-html="i18n._('es-fot-2')"></a>
      </li>
      <li>
        <a href="#" v-html="i18n._('es-fot-3')"></a>
      </li>
    </ul>
  </footer>
</template>
<style scoped lang="scss">
@import "@/css/styles.scss";
// footer {
//   @include baseText;
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   width: 100vw;
//   padding: 2vh 0 4vh;
//   background-color: $color2;
//   @media (max-width: $mobile) {
//     position: relative;
//   }
//   ul {
//     margin: 0;
//     padding: 0 1em;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     @media (max-width: $mobile) {
//       flex-direction: column;
//     }
//     li {
//       padding: 0 10px;
//       list-style: none;
//       a {
//         color: $color1;
//       }
//     }
//   }
// }
</style>
