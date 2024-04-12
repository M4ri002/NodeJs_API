<script setup>
// import { zipObject } from 'cypress/types/lodash';
import { ref, onMounted } from 'vue';
import logo from '@/assets/img/logo.png';
const this_header = ref(null)

onMounted(() => {
  var height = this_header.value.offsetHeight;
//   console.log('Altura del header:', height);
});
</script>



<template>
    <header ref="this_header">
        <div class="logo">
            <img :src="logo" alt="img-logo">
        </div>
        <ul class="col1">
            <li><a href="">Inicio</a></li>
            <li><a href="">Destinos</a></li>
            <li><a href="">Experiencias</a></li>
        </ul>
        <ul class="col2">
            <button><a href="">Explora Ahora</a></button>
        </ul>
    </header>
</template>

<!-- <select>
    <option selected>es</option>
    <option>en</option>
</select> -->

<style lang="scss" scoped>    
    * {
        margin: 0;
        padding: 0;
        text-decoration: none;
        list-style: none;
        font-family: 'Geologica','sans-serif';
    }
    a{color: black;}
    
    header{
        position: fixed;
        top: 0;
        right: 0;
        padding: 8px;
        height: 60px;
        width: 100%;
        // background: black;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid black;
        .col1, .col2 {display: flex;}
        .col1{
            li{
                padding: 0 25px;
            }
        }
        .col2{
            height: 100%;
            button{
                padding: 0 10px;
                background: none;
                border:1px solid black;
                border-radius:5px;
            }
        }
    }
    
</style>