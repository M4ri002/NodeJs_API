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
        <section class="sec5">
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

    section.sec5{
        width: 100%;
        position: relative;
        z-index: 1;
        height: 70vw;
        background: #F3ECE9;
        display: flex;
        border-bottom: 1px solid black;
        // delete
        justify-content: center;
        align-items: center;
    }

    @media screen and (max-width: 600px)
    {
        section.sec5{
            height: 90vw;
        }
    }
</style>