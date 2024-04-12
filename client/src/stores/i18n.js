import {reactive, ref} from 'vue';
import {defineStore} from 'pinia';
import i18n from '@/stores/i18n.json';

export const useI18nStore = defineStore('i18n', () => {
  //------------------------------------------------
  const languages = reactive(i18n.languages);
  const dictionary = reactive(i18n.dictionary);
  const language = ref(get());

  //------------------------------------------------
  function _(text) {
    const index1 = dictionary.findIndex(item => item[0] === text);
    const index2 = languages.findIndex(item => item === language.value);
    if (index1 === -1 || index2 === -1) return text;
    return dictionary[index1][index2];
  }

  function set(lang) {
    if (languages.includes(lang)) language.value = lang;
    localStorage.setItem('language', language.value);
  }

  function get() {
    return localStorage.getItem('language') || languages[0];
  }

  return {
    _,
    languages,
    language,
    set,
    get,
  };
});
