<script setup>
import { ref, computed } from 'vue'
import { decodeCredential } from 'vue3-google-login'
import { useRouter } from 'vue-router';
import axios from 'axios';

const mail = ref('');
const password = ref('');
const passwordType = ref('');
const TitleText = ref('Inicio de sesión');
const router = useRouter();
const dynamicImage = ref(null); //URL IMAGEN OJO
const change = ref(false);
const changeImageSource = () => {
   if (dynamicImage.value) {
      let src = dynamicImage.value.src;
      let type = passwordType.value.type;
      dynamicImage.value.src = src.includes('ver.png') ? dynamicImage.value.src = 'src/assets/img/oculto.png' : dynamicImage.value.src = 'src/assets/img/ver.png';
      type === 'password' ? passwordType.value.type = 'text' : passwordType.value.type = 'password';
   }
};

const toggleChange = (state) => {
   let currentState = change.value;
   currentState === state ? login() : change.value = state;
   !state ? TitleText.value = 'Inicio de sesión' : TitleText.value = 'Registrate';
};


const submitForm = () => {
   console.log("Enviado");
   // login(); // Llamar al método login para enviar el formulario
};

//------------------------- GOOGLE -------------------------------
const callback = (response) => {
   const userData = decodeCredential(response.credential)
   console.log("Handle the userData", userData)
}
//----------------------------------------------------------------


const login = async () => {
   try {
      const response = await axios.post('/server/login', { mail: mail.value, password: password.value });
      console.log("Log client login => ", response);
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
   <div id="section">
      <div id="content" :class="{ 'change-class': change }">
         <h1>{{ TitleText }}</h1>
         <div id="login">
            <form method="post" @submit.prevent="login" id="form" >
               <div id="google-log">
                  <GoogleLogin :callback="callback" prompt auto-login />
               </div>
               <div id="divider">
                  <div id="divider-text">0</div>
               </div>
               <div id="campo1">
                  <label for="form">Dirección de correo electrónico*</label>
                  <div id="input-container">
                     <input type="text" name="name" id="" placeholder="Email@email.com" v-model="mail" required>
                  </div>
               </div>
               <div id="campo2">
                  <label for="form">Contraseña*</label>
                  <div id="input-container">
                     <input type="password" name="password" ref="passwordType" placeholder="Contraseña" v-model="password" required>
                     <img src="@/assets/img/oculto.png" alt="" id="eye" @click="changeImageSource" ref="dynamicImage">
                  </div>
               </div>
               <div id="campo3">
                  <label for="form">Nombre*</label>
                  <div id="input-container">
                     <input type="text" name="name" id="name" placeholder="Nombre">
                  </div>
               </div>
               <div id="campo4">
                  <label for="form">Apellidos</label>
                  <div id="input-container">
                     <input type="text" name="surname" id="surname" placeholder="Apellidos">
                  </div>
               </div>
               <div id="submit">
                  <button type="submit" id="regis" form="form" @click.prevent="toggleChange(true)">Registrarse</button>
                  <button type="submit" id="log" form="form" @click.prevent="toggleChange(false)">Inciar sesión</button>
                  <button class="colorbox" @click="submitForm"></button>
               </div>
            </form>
         </div>
      </div>
   </div>
</template>


<style lang="scss" scoped>
.change-class{
   height: 640px!important;
   transition: height .3s ease!important;

   h1{
      // transform: rotateX(90deg);
   }

   #campo3{
      transform: translateX(0px)!important;
      transition: transform .5s ease .1s!important;
      // display: block!important;
   }
   #campo4{
      transform: translateX(0px)!important;
      transition: transform .5s ease .2s!important;
   }
   #submit{
      transform: translateY(0px)!important;
      transition: transform .5s ease !important; // 0.5s de delay

   }
   .colorbox{
      left: 0!important;
      background-color: #4969b4!important;
      box-shadow: 5px 0px 7px -1px rgba(0, 0, 0, 0.631372549) !important;
   }

}

#section {
   width: clamp(300px, 70vw, 600px); // ANCHO DEL LOGIN
   margin: 100px auto 0;

   #content {
      background-color: rgb(255, 255, 251);
      height: 550px; // ALTURA DEL LOGIN 
      border-radius: 20px;
      box-shadow: 3px 5px 11px -5px black;
      display: flex;
      align-items: center;
      flex-direction: column;
      transition: height .3s ease .3s;
      overflow: hidden;

      h1 {
         margin: 30px 0;
         // transition: transform .5s ease;
      }

      #login {
         height: 100%;
         width: 100%;
         display: flex;
         align-items: center;

         #form {
            width: 80%;
            margin: 0 auto;

            #campo1,
            #campo2,
            #campo3,
            #campo4 {
               margin: 20px 0;

               label {
                  display: block;
                  color: #676767;
                  font-weight: 300;
                  margin: 5px 0;
               }

               #input-container {
                  width: 100%;
                  display: flex;
                  background-color: white;
                  border: 1px solid #676767;
                  border-radius: 3px;
                  align-items: center;

                  input {
                     width: 100%;
                     background-color: transparent;
                     border: none;
                     padding: 10px 15px;

                     &:focus {
                        outline: none;
                        background-color: rgb(239, 239, 239);
                     }
                  }

                  #eye {
                     width: 25px;
                     height: 25px;
                     margin-right: 5px;
                     opacity: .5;

                     &:hover {
                        cursor: pointer;
                     }
                  }
               }
            }
            #campo3,
            #campo4{
               // display: none;
               transition: transform .3s ease;
               transform: translateX(600px);
               // transition: transform .3s ease .3s; // 0.3s de delay
               
            }

            #divider {
               display: block;
               margin: 1.5rem 0 1rem;
               position: relative;
               text-align: center;

               &::before {
                  background-color: #b5b3ad;
                  content: "";
                  height: .0625rem;
                  left: 0;
                  position: absolute;
                  top: 50%;
                  width: 100%;
               }

               #divider-text {
                  background-color: rgb(238, 238, 230);
                  color: #2e2e2e;
                  display: inline-block;
                  margin: 0 2.5rem;
                  padding: 0 .5rem;
                  position: relative;
                  font-size: 20px;
                  font-weight: 600;
               }
            }

            #submit {
               background: rgb(92, 99, 110);
               border: .5px solid rgb(50, 50, 50);
               height: 50px;
               border-radius: 10px;
               display: flex;
               justify-content: center;
               align-items: center;
               position: relative;
               overflow: hidden;
               margin: 40px 0;
               transform: translateY(-150px);
               transition: transform .3s ease .3s; // 0.3s de delay
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
                  border-radius: 10px;
                  transition: background-color .5s;
               }

               #regis {
                  z-index: 1;
                  background-color: transparent;
                  border-radius: 10px;
                  transition: background-color .5s;
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
         }
      }


   }
}

#google-log {
   border-radius: 5px;
   align-items: center;
   justify-content: center;
   padding: 0 10px;
   display: flex;
}
</style>