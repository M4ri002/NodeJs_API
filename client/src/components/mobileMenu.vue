<script setup>
import { ref, computed } from 'vue'
import { useI18nStore } from '@/stores/i18n.js'
import { useDataStore } from '@/stores/data.js'
import traduction from '@/components/traduction.vue'

const i18n = useI18nStore();
const data = computed(() => useDataStore().get('header', i18n.language));
const links = computed(() => useDataStore().get('header', 'links'));
const CountData = ref(Object.keys(data.value).length); //Cuenta cuantos elementos hay dentro del objeto
const menu = ref(false);
const size = ref(window.innerWidth);


window.addEventListener('resize', () => {
   if (window.innerWidth <= 1200) {
      size.value = true;
   } else {
      size.value, menu.value = false;
   }
});

function toggleMenu() {
   menu.value = !menu.value;

}
</script>

<template>
   <div>
      <div id="desp" @click="toggleMenu">
         <img src="" alt="">=
      </div>
      <traduction id="Mtraduction" />
      <div id="menu" :class="{ 'desplegar': menu }" v-if="size <= 1200">
         <div id="menu-content">
            <nav id="nav">
               <ul id="col1">
                  <li v-for="(key, index) in CountData" :key="index">
                     <a :href="links['link' + key]" v-html="data['txt' + key]"></a>
                  </li>
               </ul>
            </nav>
         </div>
      </div>
   </div>
</template>


<style lang="scss" scoped>
* {
   text-decoration: none;
   color: white;
   list-style: none;
   margin: 0;
   padding: 0;
}

.desplegar {
   height: 100vh !important;
   transition: height .4s ease !important;

   #menu-content {
      transform: translateY(-30px) !important;
      transition-delay: .3s !important;

   }
}

#desp {
   position: fixed;
   color: white;
   z-index: 999;
   right: 30px;
   top: 15px;
   font-size: 30px;
   transform: translateX(500px);
   transition: transform .5s ease;
   cursor: pointer;

   @media screen and (max-width: 1199px) {
      transform: translateX(0px);
      transition-delay: .3s;
   }
}

#Mtraduction {
   position: fixed;
   z-index: 999;
   left: 30px;
   top: 20px;
   transform: translateX(-500px);
   transition: transform .5s ease;


   @media screen and (max-width: 1199px) {
      transform: translateX(0px);
      transition-delay: .3s;
   }
}

#menu {
   transition: height .5s ease;
   transition-delay: .4s;
   position: absolute;
   z-index: 2;
   background-color: rgb(67, 67, 86);
   box-shadow: 0 0 0 0 black;
   height: 0vh;
   width: 100vw;
   overflow: hidden;

   #menu-content {
      transition: .5s ease;
      transform: translateY(700px);
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      li {
         padding: 20px 0;
         text-align: center;
         font-size: 20px;

         @media screen and (max-width: 500px) {
            font-size: 15px;
         }

         a {
            position: relative;
            transition: color 0.3s;
            font-weight: 100;

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

         &:nth-last-child(-n+2) {
            border: 0.1px solid rgba(255, 255, 255, 0.295);
            display: inline-block;
            padding: 10px 20px;
            border-radius: 30px;
            margin: 10px 20px;
         }

         &:last-child {
            background-color: rgb(240, 240, 240);

            a {
               color: black;
               font-weight: 300;
            }
         }
      }
   }
}</style>