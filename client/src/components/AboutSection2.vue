<script setup>
import { computed } from 'vue'
import { useI18nStore } from '@/stores/i18n.js'
import { useDataStore } from '@/stores/data.js'
// -----------------------------------------------------------
const i18n = useI18nStore();
const dataStore = useDataStore();

const data = computed(() => dataStore.get('', i18n.language))
// -----------------------------------------------------------

</script>

<template>
    <div>
        <section class="sec2">
            <p>content available in future versions</p>
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
    section.sec2{
        position: relative;
        z-index: 3;
        width: 100%;
        background: #F5EFED;
        height: 55vh;
        overflow: hidden;
        border-radius: 25px 25px 0 0;
        box-shadow: 0px -1px 13px 2px rgba(0,0,0,0.2);
        // delete
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media screen and (max-width: 700px)
    {
        section.sec2{
            // height: 60vw;
            height: 70vw;
        }
    }
</style>