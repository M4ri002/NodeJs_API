<script setup>
import { ref, computed } from 'vue'
import { useI18nStore } from '@/stores/i18n.js'
import { useDataStore } from '@/stores/data.js'
import logo from '@/assets/img/logo.png';
import mobilMenu from '@/components/mobileMenu.vue';
import traduction from '@/components/traduction.vue'

const i18n = useI18nStore();
const dataStore = useDataStore();
const data = computed(() => dataStore.get('header', i18n.language));
const links = computed(() => dataStore.get('header', 'links'));
const CountData = computed(() => Object.keys(data.value).length);
const Maxelements = 4;

</script>

<template>
   <mobilMenu />
   <header>
      <div class="logo">
         <a href="/"><img :src="logo" alt="logo"></a>
      </div>
      <ul id="col1">
          <li v-for="(key, index) in Math.min(CountData, Maxelements)" :key="index">  
            <a :href="links['link' + key]" v-html="data['txt' + key]"></a>
         </li>
      </ul>
      <ul id="col2">
         <traduction id="traduction" />
         <li v-for="(key, index) in Math.max(0, CountData - Maxelements)" :key="index"> 
            <a :href="links['link' + (CountData - index)]" v-html="data['txt' + (CountData - index)]"></a>
         </li>
      </ul>
   </header>
</template>

<style scoped lang="scss">
@import "@/css/styles.scss";

* {
   margin: 0;
   padding: 0;
   text-decoration: none;
   list-style: none;
}

a {
   font-size: 15px;
   font-weight: 200;
   color: white;

}

header {
   transition: transform 0.5s ease;
   position: fixed;
   z-index: 2;
   top: 0;
   width: 100%;
   max-width: 1920px;
   display: flex;
   height: auto;
   padding: 10px 0;
   justify-content: space-between;

   .logo {
      position: relative;
      margin-left: 40px;
      margin-bottom: 10px;
   }

   .logo img {
      height: 80px;
   }

   ul {
      display: flex;
      width: 100%;
      align-items: center;
      text-align: center;


      li {
         white-space: nowrap; //Evita el salto de linea
         width: 100px;
         text-align: center;
      }
   }


   #col1 {
      width: 100%;
      justify-content: flex-start;

      a {
         position: relative;
         transition: color 0.3s;

         &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -2px;
            width: 0;
            height: 2px;
            background-color: rgb(255, 255, 255);
            transition: width 0.3s;
         }

         &:hover::after {
            width: 100%;
         }
      }

      li {
         &:first-child {
            margin-left: 40px;
         }
      }
   }

   #col2 {
      justify-content: flex-end;

      #traduction {
         margin-right: 20px;
      }

      li {
         margin-right: 40px;
      }

      #register {
         background-color: rgb(240, 240, 240);
         color: black;
         margin-right: 80px;
      }

      a {
         border: 0.1px solid rgba(255, 255, 255, 0.295);
         padding: 10px 20px;
         border-radius: 30px;
      }
   }

   // Ocultar header fuera de la pantalla cuando la pantalla sea más pequeña
   @media screen and (max-width: 1199px) {
      transform: translateX(100%);
   }

}
</style>
