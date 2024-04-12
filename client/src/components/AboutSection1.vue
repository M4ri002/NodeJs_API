<script setup>
import { onMounted, onUpdated, ref, computed } from 'vue'
import { useI18nStore } from '@/stores/i18n.js'
import { useDataStore } from '@/stores/data.js'
import { useVarStore } from '@/stores/var.js'
// -----------------------------------------------------------
const i18n = useI18nStore();
const dataStore = useDataStore();
const varStore = useVarStore();

const data = computed(() => dataStore.get('aboutSection1', i18n.language))
// -----------------------------------------------------------
const hiddenHeight = ref(null)

const updateHeight = () => {
    //obtener height div
    var divHeight = document.querySelector('.sec1').offsetHeight
    //depende el width se le suma un top u otro
    //top deberia en < 700 es 70, pero al ser pequeno no queda bien, se me suma 10
    window.innerWidth < 700 ? divHeight += 80 : divHeight += 90
    //cambiamos el valor del store
    varStore.changeVar('height', divHeight)
    //coger el valor del store
    var height = varStore.vars.height;
    //modificar el height del hidden 
    hiddenHeight.value.style.height = ref(height + 'px').value;
}
onMounted(() => {
    updateHeight()
    window.addEventListener('resize', updateHeight);
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
        top: 90px; //was 50
        right: 0;
        width: 100%;
        // padding: 60px 0 0 0;-> arreglar
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
            // padding: 0.75vw 0;
            color: rgb(168, 62, 19);
            font-style: oblique;
            font-size: 22px;
        }
        p.bottom-title{
            padding: 26px 0;
            font-size: 16px;
            font-weight: 400;
            color: rgb(53, 23, 6);
        }
    }
    @media screen and (max-width: 700px)
    {
        section.sec1{
            top: 70px;
            h1.title{
                font-size: 9vw;
            }
            p.mid-title{
                padding: 0.75vw 0;
                font-size: 3.5vw;
            }
            p.bottom-title{
                font-size: 3.1vw;
                padding: 3vw 0;
                // padding: ;
            }
        }
    }
</style>