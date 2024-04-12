<script setup>
import { ref, onMounted } from 'vue'
import { useI18nStore } from '@/stores/i18n.js'
const i18n = useI18nStore();
const defaultLanguage = localStorage.language ? localStorage.language : "es";
const selectedLanguage = ref(defaultLanguage);

function changeLang(event) {
    i18n.set(event.target.value);
}
</script>

<template>
    <div>
        <select @change="changeLang" v-model="selectedLanguage">
            <option v-for="(lang, index) in i18n.languages" :key="index" :value="lang">{{ lang }}</option>
        </select>
    </div>
</template>



<style lang="scss" scoped>
select {
    line-height: 10px;
    border: 0.1px solid rgba(255, 255, 255, 0.295);
    padding: 5px 5px;
    border-radius: 30px;
    background-color: transparent;
    color: white;

    &:hover {
        cursor: pointer;
    }
}

option {
    background-color: black;

    &:hover {
        cursor: pointer;
    }
}
</style>