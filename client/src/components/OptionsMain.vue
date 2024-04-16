<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18nStore } from '@/stores/i18n.js'
import { useDataStore } from '@/stores/data.js'
import { useVarStore } from '@/stores/var.js'
import { DatePicker } from 'v-calendar';
// import { create } from 'cypress/types/lodash';
import 'v-calendar/dist/style.css'; //HAY QUE LLAMAR ASI A LOS ESTILOS

const i18n = useI18nStore();
const data = computed(() => useDataStore().get('search', i18n.language));
const varStore = useVarStore();


// date picker
const date = ref(new Date());
var range = ref({
  start: new Date(),
  end: new Date(),
});
const selectAttribute = ref({ dot: true });
const dragValue = ref(null);
// const selectedColor = ref('rgb(168, 62, 19)');
const selectedColor = ref('orange');
const selectDragAttribute = computed(() => ({
  popover: {
    visibility: 'hover',
    isInteractive: false,
  },
}));

var peopleCount = ref(1)

function decrement() {
      if (peopleCount.value > 1) {
        peopleCount.value--;
      }
    }

    function increment() {
      if (peopleCount.value < 5) {
        peopleCount.value++;
      }
    }

const activities = [
  { label: 'Kid Friendly', value: 'kid_friendly', selected: false, count: 0  },
  { label: 'Museums', value: 'museums', selected: false, count: 0   },
  { label: 'Historical', value: 'historical', selected: false, count: 0   },
  { label: 'Shopping', value: 'shopping', selected: false, count: 0   },
]

const activities2 = [
  { label: 'Outdoor Adventures', value: 'outdoor_adventures', selected: false, count: 0   },
  { label: 'Art & Cultural', value: 'art_cultural', selected: false, count: 0   },
  { label: 'Amusement Parks', value: 'amusement_parks', selected: false, count: 0  },
]

function getActivities() {
    var array = []
    for (const activity in activities)
    {
        if(activity.selected == true)
        array.push = activity.label
    }
    console.log(array)
}

function toggleRadio(id, spec) {
    // var main = document.getElementById(id)

    const activitiesArray = spec == 1 ? activities : activities2

    var pos = activitiesArray.findIndex(activity => activity.value === id)
    activitiesArray[pos].selected = !activitiesArray[pos].selected;
    console.log(activities)
    console.log(obtainSelected())
}

function obtainSelected() {
    var radios = document.getElementsByName('relationship');

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
    return null;
}

const months = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
];

var input_date = ref('Select a range date')
var btn_calendar = document.getElementById('btn_calendar');
document.addEventListener('DOMContentLoaded', function() {

    btn_calendar.addEventListener("click", () => {
        var start_m = months[range.value.start.getMonth()];
        var end_m = months[range.value.end.getMonth()];
        var start_d = range.value.start.getDate();
        var end_d = range.value.end.getDate();
        
        input_date.value = `${start_d} ${start_m} ~ ${end_d} ${end_m}`;
        console.log(input_date.value)
    });
});

function main() {
    trip()
    getActivities()
    varStore.changeVar('type', obtainSelected())
    varStore.changeVar('people', peopleCount.value)

    console.log(varStore.vars)
}

function trip() {
    var start_m = months[range.value.start.getMonth()]
    var end_m = months[range.value.end.getMonth()]
    var start_d = range.value.start.getDate()
    var end_d = range.value.end.getDate()
    
    var inputWrong = document.querySelector('.inputWrong')
    var actual = new Date()
    // falta year
    if((input_date.value == 'Select a range date' && end_d == actual.getDate() && end_m == months[actual.getMonth()]) || (end_d == start_d && end_m == start_m))
    {
        input_date.value = 'Select a range date'
        document.addEventListener('DOMContentLoaded', function(){
            inputWrong.style.color = 'black';
        })

    }   
    else if((actual.getDate() > range.value.start.getDate() && actual.getMonth() > range.value.start.getMonth()) || (actual.getDate() > range.value.start.getDate() && actual.getMonth() == range.value.start.getMonth()))
    {
        input_date.value = 'Select a valid range'
        inputWrong.style.color = 'red';
    }
    else
    {
        inputWrong.style.color = 'black';
        input_date.value = `${start_d} ${start_m} ~ ${end_d} ${end_m}`
    }
    console.log(input_date.value)
}

</script>
<template>
    <main>
        <div class="title-h2">
            <h2>Plan your next adventure</h2>
        </div>
        <section class="section1">
            <h4>Place & dates</h4>
            <div>
                <input type="" :placeholder="varStore.vars.destiny == 'null' ? 'Select a destiny' : varStore.vars.destiny" class="destiny">
                <!-- <DatePicker v-model.range="range"/> -->
                <div>
                    <DatePicker :color="selectedColor" v-model.range="range" :popover="false" :select-attribute="selectAttribute" :drag-attribute="selectDragAttribute" @drag="dragValue = $event">
                        <template #day-popover="{ format }">
                            <div class="text-sm">
                                {{ format(dragValue ? dragValue.start : range.start, 'MMM D') }}
                                -
                                {{ format(dragValue ? dragValue.end : range.end, 'MMM D') }}
                            </div>
                        </template>
                        <template #default="{ togglePopover, inputEvents }">
                        <div class="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden calendar whole_calendar" id="whole_calendar">
                            <button
                            class="flex justify-center items-center px-2 bg-accent-100 hover:bg-accent-200 text-accent-700 border-r border-gray-300 dark:bg-gray-700 dark:text-accent-300 dark:border-gray-600 dark:hover:bg-gray-600 btn-calendar"
                            @click="() => togglePopover()" id="btn-calendar"
                            >
                            <!-- <IconCalendar class="w-5 h-5" /> -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar w-5 h-5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            </button>
                            <input
                            :value="input_date"
                            v-on="inputEvents"
                            class="flex-grow px-2 py-1 bg-white dark:bg-gray-700 inputWrong"
                            />
                        </div>
                        </template>
                    </DatePicker>
                </div>
                <!-- <customCalendar/> -->
                
            </div>
        </section>
        <section class="section2">
            <h4>Kind of Activities</h4>
            <div class="box">
                <ul>
                    <li v-for="activity in activities" :key="activity.value">
                        <input type="checkbox" v-model="activity.selected" :id="activity.value">
                        <label :id="activity.value" class="label" :for="activity.value" @click="toggleRadio(activity.value, 1)" >{{ activity.label }}</label>
                    </li>
                </ul>
                <ul>
                    <li v-for="activity in activities2" :key="activity.value">
                        <input type="checkbox" v-model="activity.selected" :id="activity.value">
                        <label :id="activity.value" class="label" :for="activity.value" @click="toggleRadio(activity.value, 1)" >{{ activity.label }}</label>
                    </li>
                </ul>
            </div>
        </section>
        <section class="section3">
            <h4>How many people is going?</h4>
            <div class="content3">
                <div class="c-0">
                    <p>{{ peopleCount }}</p>
                </div>
                <div class="c-1">
                    <p>People</p>
                    <div class="c-2">
                        <div class="box-btn">
                            <button @click="decrement">-</button>
                        </div>
                        <div class="box-btn">
                            <button @click="increment">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- HIDDEN DEPENDING OF PERSONS -->
        <section class="section4">
            <div class="box">
                <ul>
                    <li>
                        <input type="radio" id="couple" name="relationship" value="couple" checked>
                        <label class="label" for="couple">Couple</label>
                    </li>
                    <li>
                        <input type="radio" id="family" name="relationship" value="family">
                        <label class="label" for="family">Family</label>
                    </li>
                    <li>
                        <input type="radio" id="friends" name="relationship" value="friends">
                        <label class="label" for="friends">Friends</label>
                    </li>
                </ul>
            </div>
        </section>
        <div class="submit-btn">
            <input type="submit" value="Create New Trip" :on-click=" main()">
        </div>
    </main>
</template>

<style scoped lang="scss">
*{
  margin: 0;
  padding: 0;
  user-select: none;
}
:root{
    --color-brown: rgb(53, 23, 6);
    --color2: rgb(168, 62, 19);
    --color3: #CBB9B0;
}

main{
    width: 60%;
    // width: 700px;
    padding: 20px!important;
    background: white;
    // border: 1px solid black;
    margin: 0 auto;
    .title-h2{
        padding: 100px 0 50px 0;
        h2{
            // color: var(--color-brown);
            color: rgb(53, 23, 6);
            font-size: 35px;
            width: fit-content;
            margin: 0 auto;
        }
    }
    li{list-style: none;}
    h4{
        margin: 10px 2px;
    }
    .submit-btn{
        margin-top: 30px;
        width: 100%;
        display: flex;
        justify-content: center;
        input[type="submit"]{
            margin: 0 auto;
            padding: 8px 40px;
            border-radius: 10px;
            border: none;
        }
    }

    section{
        margin-top: 40px;
    }
    label{
        cursor: pointer;
        padding: 2px 0;
    }
    .section1{
        input{
            padding: 10px 5px;
            width: 250px;
        }
        div:nth-child(2){
            display: flex;
            flex-direction: column;
        }
        .destiny{
            width: 298px;
            padding: 12px;
            border-radius: 10px;
            outline: none;
            border: none;
            border: 1px  solid rgb(154, 152, 152);
        }
    }
    .section2, .section4{
        .box{
            ul{
                display: flex;
                width: 100%;
                margin: 16px 0;
                li{
                    span{margin-right: 6px;}
                    align-items: center;
                    justify-content: center;
                    margin: 0 6px;
                    // padding: 6px;
                    // border: 1px solid black;
                    border-radius: 6px;
                    display: flex;
                    flex: 1;
                    flex-basis: auto;
                }
            }
        }
    }

    input[type="radio"], input[type="checkbox"] {
        display: none;
    }

    input[type="checkbox"]:checked + .label, input[type="radio"]:checked + .label {
    // background-color: #007bff;
    // background-color: rgb(168, 62, 19);
    background: radial-gradient(circle, rgba(168,62,19,1) 0%, rgba(154,55,15,1) 100%);
    color: #fff;
    border-color: rgb(121, 38, 6);
    }

    // input[type="radio"] + .label{
    // background-color: green;
    // color: #fff;
    // border-color: #007bff;
    // }


    .label {
        display: inline-block;
        width: 100%;
        height: 100%;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .section3{
        width: 100%;
        .content3{
            max-width: 100%;
            display: flex;
            align-items: center;
            border-radius: 4px;
            border: 1px solid black;
            padding: 6px;
            .c-0{
                background-color: white;
                width: 3%;
                padding: 1px 3px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 10px;
                border-radius: 4px;
            }
            .box-btn{
                background: white;
                margin: 4px;
                width: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                button{
                    padding: 2px 4px;
                    width: 100%;
                    text-align: center;
                }
            }
            .c-1{
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                .c-2{
                    display: flex;
                }
            }
            }

    }
    .calendar{
        display: flex;
        margin-top: 20px;
        .btn-calendar{
            padding: 4px 12px;
        }
        svg{
            color: rgb(168, 62, 19);
        }
        button, input{
            border: none;
            outline: none;
            border: 1px  solid rgb(154, 152, 152);
        }
        button{
            border-radius: 10px 0 0 10px;
        }
        input{
            border-radius: 0 10px 10px 0;
            padding: 12px;
        }
    }
}

</style>