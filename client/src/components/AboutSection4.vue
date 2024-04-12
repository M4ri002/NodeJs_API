<script setup>
import { computed } from 'vue'
import { useI18nStore } from '@/stores/i18n.js'
import { useDataStore } from '@/stores/data.js'
// -----------------------------------------------------------
const i18n = useI18nStore();
const dataStore = useDataStore();

const data = computed(() => dataStore.get('aboutSection4', i18n.language))
// -----------------------------------------------------------

</script>

<template>
    <div>
        <section class="sec4">
            <div class="col">
                <span class="material-symbols-outlined">chat_bubble</span>
                <h5 v-html="data.title1"></h5>
                <p v-html="data.txt1"></p>
            </div>
            <div class="col">
                <span class="material-symbols-outlined">photo_camera</span>
                <h5 v-html="data.title2"></h5>
                <p v-html="data.txt2"></p>
            </div>
            <div class="col">
                <span class="material-symbols-outlined">globe</span>
                <h5 v-html="data.title3"></h5>
                <p v-html="data.txt3"></p>
            </div>
            <div class="col">
                <span class="material-symbols-outlined">battery_horiz_050</span>
                <h5 v-html="data.title4"></h5>
                <p v-html="data.txt4"></p>
            </div>
        </section>
    </div>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
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

    section.sec4{
        width: 100%;
        position: relative;
        z-index: 2;
        height: 180px;
        background: rgb(217, 192, 181);
        display: flex;
        // align-items: center;
        gap: 30px;
        justify-content: space-between;
        padding: 38px 28px;
        span{margin-left: 4px;}
        h5{
            margin-bottom: 10px;
            font-size: 19px;
        }
        p{
            font-size: 15px;
        }
        box-shadow: 0px 10px 13px -6px rgba(0,0,0,0.3);
        
    }
</style>