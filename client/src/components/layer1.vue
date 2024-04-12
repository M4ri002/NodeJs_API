<script setup>
import { computed } from 'vue'
import { useI18nStore } from '@/stores/i18n.js'
import { useDataStore } from '@/stores/data.js'
const i18n = useI18nStore();
const data = computed(() => useDataStore().get('layer1', i18n.language));
</script>

<template>
    <div id="content">
        <div id="txtbox">
            <h1 v-html="data.txt1"></h1>
            <h2 v-html="data.txt2"></h2>
            <!-- <p v-html="data.txt3"></p> -->
        </div>
    </div>
</template>


<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    text-decoration: none;
    list-style: none;
    transition: .3s ease;
}

#content {
    width: 100%;
    height: 100vh;
    z-index: 1;
    position: absolute;
    display: flex;
    align-items: center;


    #txtbox {
        transform: translateY(-130%);
        width: 90%;
        margin: 0 auto;
        background-color: transparent;
        color: white;
        text-align: center;
        line-height: 1.2;
        text-shadow: 1px 1px 1px rgb(125, 125, 125);
        // white-space: nowrap;

        h1 {
            font-size: 3.4vw;

        }

        h2 {
            font-size: 2.5vw;
            color: grey;
        }

        p {
            color: rgb(255, 255, 255);
            margin-top: 30px;
            font-size: 1.5vw;
            font-weight: 200;
        }

    }

    @media screen and (max-width: 450px) {
        #txtbox {
            transform: translateY(-200%);

        }
        #txtbox h1 {
            font-size: 7vw!important;
        }

        #txtbox h2 {
            font-size: 5vw!important;
        }

        #txtbox p {
            font-size: 2vw;
        }
    }
    @media screen and (max-width: 900px) {
        #txtbox h1 {
            font-size: 30px;
        }

        #txtbox h2 {
            font-size: 22px;
        }

        #txtbox p {
            font-size: 2vw;
        }
    }

    @media screen and (min-width: 1200px) {

        #txtbox {
            line-height: normal;
            transform: translateY(-100%);

        }

        #txtbox h1 {
            font-size: 3.8vw;
        }

        #txtbox h2 {
            font-size: 3.3vw;
        }

        #txtbox p {
            font-size: 2vw;
        }
    }
    @media screen and (min-width: 1500px) {
        #txtbox h1 {
            font-size: 55px;
        }

        #txtbox h2 {
            font-size: 45px;
        }

        #txtbox p {
            font-size: 30px;
        }
    }

    @media screen and (min-width: 1920px) {
        
    }
    @media screen and (min-height: 900px) {
        transform: translateY(-10%);
        
    }
}</style>