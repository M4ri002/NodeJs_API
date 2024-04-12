<script setup>
import arrow from '@/assets/img/right-arrow.png';
import box from '@/assets/img/box.png';
import { ref, computed, onMounted } from 'vue'
import { useI18nStore } from '@/stores/i18n.js'
import { useDataStore } from '@/stores/data.js'
const i18n = useI18nStore();
const Screen = ref(null);
const size = ref(false);
const data = computed(() => useDataStore().get('search', i18n.language));

onMounted(() => {
    Screen.value = window.innerWidth;
    if (Screen.value <= 750) {
        size.value = true;
    } else {
        size.value = false;
    }
});

window.addEventListener('resize', () => {
    Screen.value = window.innerWidth;
    if (Screen.value <= 750) {
        size.value = true;
    } else {
        size.value = false;
    }
});
</script>

<template>
    <div id="content">
        <div id="box" :class="{ 'fit-area': size }">
            <img id="arrow" :src="arrow" alt="flecha">
            <input type="text" name="" id="txt" :placeholder="data.txt1" />
            <div id="generate" :class="{ 'fit': size }">
                <p v-html="data.txt2" v-if="!size && Screen >= 600"></p><img id="imgbox" :src="box" alt="cubo">
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.fit {
    width: 20px !important;
    height: 20px !important;
}

.fit-area {
    min-width: 200px !important;
}

* {
    margin: 0;
    padding: 0;
    text-decoration: none;
    list-style: none;
}

#content {
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: 1;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    #box {
        margin: 0px 0 0 0;
        position: relative;
        border-radius: 30px;
        border: 1px solid rgba(255, 255, 255, 0.477);
        max-width: 600px;
        height: 50px;
        background-color: #00000078;
        transition: .5s ease;

        @media screen and (max-width: 1200px) {
            width: 50vw !important;
        }

        #arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 13px;
            width: 17px;
        }

        #txt {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 40px;
            height: 60%;
            width: 90%;
            background-color: transparent;
            border: none;
            color: white;
            display: flex;
            align-items: center;
            font-size: 14px;
            outline: none;
            font-weight: 100;
            overflow-y: hidden;
        }

        #generate {
            transition: transform .5s ease;
            transition: box-shadow .3s ease;
            font-weight: 400;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 10px;
            padding: 5px 10px;
            width: 120px;
            background-color: white;
            border-radius: 30px;
            border: 1px solid white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            white-space: nowrap;

            #imgbox {
                transition: transform .7s ease;
                transform-origin: center;
                width: 20px;
            }

            &:hover {
                cursor: pointer;
                box-shadow: inset 0 0 7px 0px rgb(75, 75, 75);
                #imgbox {
                    transform: rotateZ(180deg);
                }
            }
        }
    }

    @media screen and (max-width: 450px) {
        #box {
            min-width: 80% !important;
            transform: translateY(-100%);
        }

        #arrow {
            width: 15px !important;

        }
    }

    @media screen and (max-width: 900px) {
        #box {
            width: 60vw !important;
        }

        #txt {
            width: 60% !important;

        }

        #arrow {
            width: 15px !important;

        }
    }

    @media screen and (min-width: 1200px) {

        #box {
            margin: 50px 0 0 0;
            width: 550px !important;
        }

        #txt {
            font-size: 17px !important;

        }

        #generate {
            font-size: 17px !important;
            width: 140px !important;
        }

        #imgbox {
            width: 20px !important;
        }
    }

    @media screen and (min-height: 900px) {
        transform: translateY(-10%);

    }
}
</style>