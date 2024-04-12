<script setup>
import { defineProps, computed } from 'vue'
import { useI18nStore } from '@/stores/i18n.js'
import { useDataStore } from '@/stores/data.js'
// -----------------------------------------------------------
const i18n = useI18nStore();
const dataStore = useDataStore();

const data = computed(() => dataStore.get('aboutSection3', i18n.language))
// -----------------------------------------------------------
const { type } = defineProps(['type']);
// -----------------------------------------------------------

</script>

<template>
    <div>
        <section class="sec3" :class="{ sec3bottom : type == 1 }">
            <div class="col1">
                <h3 v-if="type == 0" v-html="data.type0.txt1"></h3>
                <h3 v-else :class="{ biggerh3 : type == 1 }" v-html="data.type1.txt1"></h3>

                <p v-if="type == 0" v-html="data.type0.txt2"></p>
                <p v-else v-html="data.type1.txt2"></p>
                
                <div v-if="type == 1" class="btns">
                    <button class="type1 btn-filled"><a href="" v-html="data.type1.btn1"></a></button>
                    <button class="type1"><a href="" v-html="data.type1.btn2"></a></button>
                </div>
                <button v-else><a href="" v-html="data.type0.btn1" ></a></button>
            </div>
            <div class="col2">
                <div class="img">
                    <img v-if="type == 1" src="" alt="foto/">
                    <img v-else src="" alt="foto/">
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
    * {
        margin: 0;
        padding: 0;
        text-decoration: none;
        list-style: none;
        font-family: 'Geologica','sans-serif';
    }

    .material-symbols-outlined {
        font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
    }
    section.sec3bottom{
        border-radius: 0 0 25px 25px!important;
    }
    section.sec3{
        width: 100%;
        position: relative;
        z-index: 2;
        height: 380px;
        background: #F3ECE9;
        // z-index: 1;
        padding: 35px;
        display: flex;
        .col1{
            width: 65%;
            height: 100%;
            padding-right: 35px;
            .btns{
                width: 100%;
                display: flex;
                flex-direction: row;
                gap: 15px;
            }
            .biggerh3{font-size: 33px;}
            .type1{
                width: 100%;
                border: 1px solid white; 
            }
            .btn-filled{
                background: rgb(168, 62, 19);
                border: none;
            }
            h3{
                margin-top: 60px;
                color: rgb(53, 23, 6);
            }
            p{
                margin: 10px 0;
                font-size: 16px;
                color: rgb(168, 62, 19);
            }
            a{color: rgb(53, 23, 6);}
            button{
                margin-top: 10px;
                padding: 8px 30px;
                background: none;
                border:1px solid rgb(53, 23, 6);
                border-radius:5px;
            }
        }
        .col2{
            width: 45%;
            height: 100%;
            padding: 5px 0;
            .img{
                width: 100%;
                height: 100%;
                background: rgb(176, 167, 167);
                border-radius: 20px;
            }
        }
    }
</style>