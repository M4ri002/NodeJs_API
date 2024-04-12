<script setup>
import { onMounted, ref, computed } from 'vue'
import { useI18nStore } from '@/stores/i18n.js'
import { useDataStore } from '@/stores/data.js'
// -----------------------------------------------------------
const i18n = useI18nStore();
const dataStore = useDataStore();

const data = computed(() => dataStore.get('aboutSection1', i18n.language))
// -----------------------------------------------------------
const hiddenHeight = ref(null)

onMounted(() => {
    hiddenHeight.value.style.height = ref('407px').value;
})
</script>

<template>
    <section class="sec1">
        <h1 class="title">
            <span class="t-part" v-html="data.span1"></span>
            <span class="t-part" v-html="data.span2"></span>
        </h1>
        <p class="mid-title" v-html="data.txt1"></p>
        <p class="bottom-title" v-html="data.txt2"></p>
    </section>
    <div class="hidden-comp" ref="hiddenHeight"></div>
</template>

<style lang="scss" scoped>    
    * {
        margin: 0;
        padding: 0;
        text-decoration: none;
        list-style: none;
        font-family: 'Geologica','sans-serif';
    }
    // a{color: black;}
    .hidden-comp{
        width: 100%;
        z-index: 1;
        overflow: hidden;
    }
    section.sec1{
        position: fixed;
        overflow: hidden;
        z-index: 1;
        top: 60px;
        right: 0;
        width: 100%;
        padding: 70px 0 0 0;
        // background:green;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        h1.title, p.mid-title, p.bottom-title{width: fit-content !important;}
        h1.title{
            font-size: 70px;
            display: flex;
            flex-direction: column;
            color: rgb(53, 23, 6);
        }
        p.mid-title{
            padding: 4px 0;
            color: rgb(168, 62, 19);
            font-style: oblique;
            font-size: 18px;
        }
        p.bottom-title{
            padding: 26px 0;
            font-size: 16px;
            font-weight: 400;
            color: rgb(53, 23, 6);
        }
    }
</style>