<script setup>
import { useRouter } from 'vue-router';
import axios from 'axios';
import Header from '@/components/HeaderComponent.vue'
import Section1 from '@/components/AboutSection1.vue'
import Section2 from '@/components/AboutSection2.vue'
import Section3 from '@/components/AboutSection3.vue'
import Section4 from '@/components/AboutSection4.vue'
import Section5 from '@/components/AboutSection5.vue'
import FooterTeo from '@/components/FooterTeo.vue'

console.log("ESTAS EN bienvenido CLIENTE");
const router = useRouter();

const checkSession = async () => {
    try {
        const response = await axios.get('/session');
        console.log("Log client bienvenido=> ",response);
        if (response.status === 200) {
            router.push('/about'); // Redirige al usuario a la página de inicio
        } else if (response.status === 500){
          router.push('/login');
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
  <section class="allComponents">
    <Header/>
    <Section1/>
    <Section2/>
    <Section3 type="0"/>
    <Section4/>
    <Section5/>
    <Section3 type="1"/>
    <FooterTeo/>
  </section>
</template>

<style scoped lang="scss">
*{
  margin: 0;
  padding: 0;
}

</style>