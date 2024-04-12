// archivo store.js

// import { start } from '@popperjs/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useVarStore = defineStore('varStore', () => {
    var vars = ref({
        height: 10,

        //** USER OPTIONS **
        destiny: "null",
        date: [null, null],
        activities: [],
        people : 1,
        type: "null"
    });
    const changeVar = (toChange, newValue) => {
        vars.value[toChange] = newValue;
    }
    return {
        vars,
        changeVar,
    }
    
});
