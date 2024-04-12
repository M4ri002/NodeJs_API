<script setup>
console.log("ESTAS EN bienvenido CLIENTE");

import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const checkSession = async () => {
    try {
        const response = await axios.get('/session');
        console.log("Log client bienvenido=> ",response);
        if (response.status === 200) {
            router.push('/bienvenido'); // Redirige al usuario a la página de inicio
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        if (error.response && error.response.status === 401) {
            console.log('La sesión ha caducado, redirigiendo al formulario de inicio de sesión...');
            router.push('/login'); // Redirige al usuario al formulario de inicio de sesión
        }
        // Manejar otros errores de red o del servidor
    }
};

checkSession();



</script>



<template>
    <div>
        <h1>Bienvenido 👋</h1>
    </div>
</template>

<style lang="scss" scoped>

</style>