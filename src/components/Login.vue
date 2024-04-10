<template>
  <form @submit.prevent="login">
    <input type="email" v-model="mail" placeholder="Correo electrónico" required>
    <input type="password" v-model="password" placeholder="Contraseña" required>
    <button type="submit">Iniciar sesión</button>
  </form>
</template>

<script setup>
console.log("ESTAS EN LOGIN CLIENTE");

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const mail = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post('/server/login', { mail: mail.value, password: password.value });
    console.log("Log client login => ",response);
    if (response.status === 200) {
      router.push('/bienvenido'); // Redirige al usuario a la página de inicio
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
