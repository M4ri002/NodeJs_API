<script setup>
import { computed } from 'vue'
import { useI18nStore } from '@/stores/i18n.js'
import { useDataStore } from '@/stores/data.js'
// -----------------------------------------------------------
const i18n = useI18nStore();
const dataStore = useDataStore();

const data = computed(() => dataStore.get('footerTeo', i18n.language))
// -----------------------------------------------------------

</script>

<template>
    <div>
        <footer>
            <div class="col1">
                <h6>AIVOY</h6>
                <p v-html="data.txt1"></p>
            </div>
            <div class="col2">
                    <span class="material-symbols-outlined">nest_thermostat_gen_3</span>
                    <span class="material-symbols-outlined">nest_thermostat_gen_3</span>
                    <span class="material-symbols-outlined">nest_thermostat_gen_3</span>
            </div>
        </footer>
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

    footer{
        // width: 100%;
        position: relative;
        z-index: 1;
        height: 5vh;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid black;
        .col1{
            p{
                font-size: 13px;
            }
        }
    }
</style>