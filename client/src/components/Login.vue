<script setup>
import { ref, computed } from 'vue'
import { decodeCredential } from 'vue3-google-login'
import { useRouter } from 'vue-router';
import axios from 'axios';

const mail = ref('');
const password = ref('');
const router = useRouter();
const change = ref(false);
const isAnimating = ref(false);
const text = ref("Iniciar Sesión");
var rootElement = document.documentElement;
var AnimationTime = 0.5; //Aqui ponemos la velocidad de la animación
rootElement.style.setProperty('--AnimationTime', AnimationTime + 's'); //Esto es para poder poner una variable de js en css

const titleClasses = computed(() => ({
   'animate__animated': true,
   'animate__flipOutX': isAnimating.value,
   'animate__flipInX': !isAnimating.value
}));

function toggle(val) {
   change.value = val;
   isAnimating.value = true;
   setTimeout(() => {
      isAnimating.value = false;
   }, AnimationTime * 1000);
   setTimeout(() => {
      val ? text.value = "Registrarse" : text.value = "Iniciar Sesión";
   }, AnimationTime * 1000);
}

const callback = (response) => {
   // decodeCredential will retrive the JWT payload from the credential
   const userData = decodeCredential(response.credential)
   console.log("Handle the userData", userData)
}

const login = async () => {
  try {
    const response = await axios.post('/server/login', { mail: mail.value, password: password.value });
    console.log("Log client login => ",response);
    if (response.status === 200) {
      router.push('/about'); // Redirige al usuario a la página de inicio
    } else if (response.status === 401) {
      console.log('La sesión ha caducado, redirigiendo al formulario de inicio de sesión...');
      router.push('/login'); // Redirige al usuario al formulario de inicio de sesión
    } else {
      console.error('Inicio de sesión fallido:', response.data.message);
      // Manejar otros casos de inicio de sesión fallido
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    // Manejar errores de red o del servidor
  }
};
</script>
<!-- VOLVER A CREAR LOGIN (MEJOR HECHO) -->
<template>
   <div>
      <div id="section">
         <div id="login">
            <div id="content" :class="{ 'animate-content': change }">
               <div id="title">
                  <h1 :class="titleClasses">
                     {{ text }}
                  </h1>
               </div>
               <form @submit.prevent="login" id="form" :class="{ 'form-Animation': change }">
                  <div class="input-line">
                     <input type="email" id="email" placeholder="Email..." v-model="mail" required>
                  </div>
                  <div class="input-line">
                     <input type="password" id="password" placeholder="Contraseña..." v-model="password" required>
                  </div>
                  <div class="input-line regist">
                     <input type="text" id="password" placeholder="Nombre...">
                  </div>
                  <div class="input-line regist">
                     <input type="text" id="password" placeholder="Apellido...">
                  </div>
               </form>
               <div id="submit">
                  <button type="submit" id="regis" form="form" @click.prevent="toggle(true)">Registrarse</button>
                  <button type="submit" id="log" form="form" @click.prevent="toggle(false)">Inciar sesión</button>
                  <div class="colorbox" :class="{ 'colorbox-tranform': change }"></div>
               </div>
               <div id="google-log">
                  <GoogleLogin :callback="callback" prompt auto-login />
               </div>
               <button type="submit" form="form">Validar datos prueba</button>
            </div>
         </div>
         <div id="register"></div>
      </div>
   </div>
</template>


<style lang="scss" scoped>
.animate-content {
   max-height: 500px !important;
}

.animate__animated {
   --animate-duration: var(--AnimationTime);
}

.form-Animation {
   height: 265px !important;
   transition-delay: .2s !important;

   .regist {
      transform: translateX(0px) !important;
      transition-delay: .3s !important;

   }
}

.colorbox-tranform {
   left: 0% !important;
   background-color: #3D5998 !important;
   box-shadow: 5px 0px 7px -1px rgba(0, 0, 0, 0.631372549) !important;
}

#section {
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 100vh;
   position: relative;
   background-color: rgba(0, 0, 0, 0.142);
   z-index: 1;

   #login {
      padding: 80px 20px;
      width: 400px;
      border-radius: 10px;
      position: relative;
      box-shadow: 0 0 12px -3px #00000084;
      background-color: #efefeff4;
      overflow: hidden;

      #content {
         width: 90%;
         margin: auto;
         height: 100%;

         #title {
            text-align: center;
            position: relative;
            transition: transform .3s ease, opacity .2s ease;

            h1 {
               // padding: 60px 0 0 0;
               color: #333333;
               font-size: 50px;
               font-weight: bold;
            }
         }

         #form {
            text-align: center;
            margin: 0 0 60px 0;
            position: relative;
            height: 100px;
            transition: height .3s ease;
            transition-delay: .3s;

            &:after {
               content: '';
               background-color: rgb(164, 126, 36);
               width: 100%;
               height: 2px;
               position: absolute;
               top: -20px;
               left: 0;
            }

            .regist {
               transform: translateX(150%);
               transition: .3s ease;
            }

            .input-line {
               background: rgb(231, 189, 138);
               box-shadow: inset 0 0 0 2px rgb(201, 134, 0);
               // background: linear-gradient(180deg, #6e6e6e 0%, #828282 56%, #a1a1a1 100%);
               margin: 40px 0 0 0;
               border: 1px solid rgba(255, 255, 255, 0.708);
               height: 40px;
               border-radius: 13px;
               display: flex;
               justify-content: center;
               align-items: center;

               input {
                  width: 80%;
                  height: 100%;
                  border: none;
                  background-color: transparent;
                  font-size: 18px;
                  color: #000000;
                  outline: none;

                  &::placeholder {
                     font-weight: 100;
                  }
               }
            }


         }

         #submit {
            background: rgb(92, 99, 110);
            // background: linear-gradient(180deg, rgba(52, 61, 73, 1) 0%, rgba(50, 61, 73, 1) 56%, rgba(37, 45, 52, 1) 100%);
            border: 1px solid rgb(0, 0, 0);
            height: 40px;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            // overflow: hidden;
            align-items: center;
            position: relative;

            &:before {
               content: '';
               background-color: rgb(164, 126, 36);
               width: 100%;
               height: 2px;
               position: absolute;
               top: -20px;
               left: 0;
            }

            button {
               border: none;
               height: 100%;
               width: 50%;
               font-size: 15px;
               color: white;

               &:hover {
                  cursor: pointer;
               }
            }

            #log {
               background-color: transparent;
               z-index: 1;

            }

            #regis {
               z-index: 1;
               background-color: transparent;
            }

            .colorbox {
               transition: .5s ease;
               width: 50%;
               background-color: #228B22;
               border-radius: 10px;
               left: 50%;
               top: 0;
               height: 100%;
               position: absolute;
               box-shadow: -5px 0px 7px 2px #000000a1;

            }
         }

         #google-log {
            background-color: rgb(201, 134, 0);
            border-radius: 5px;
            height: 40px;
            width: 40%;
            margin: 20px auto 0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 10px;
            box-shadow: 2px 2px 5px -1px black;
         }
      }
   }
}
</style>