import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', () => {
  //------------------------------------------------
  const data = reactive({
    header:
    {
      es: {
        txt1: 'Producto',
        txt2: 'Contacto',
        txt3: 'Blog',
        txt4: 'Sobre nosotros',
        txt5: 'Inscribirse',
        txt6: 'Registrarse',
      },
      en: {
        txt1: 'Product',
        txt2: 'Contact',
        txt3: 'Blog',
        txt4: 'About',
        txt5: 'Login',
        txt6: 'Sign in',
      },
      links: {
        link1: '/product',
        link2: '/contact',
        link3: '/blog',
        link4: '/about',
        link5: '/login',
        link6: '/login',
      }
    },
    layer1:
    {
      es: {
        txt1: 'Transformando la Experiencia de Viaje',
        txt2: 'Encuentra el camino hacia tu viaje',
        txt3: 'Organiza tu viaje ideal con nosotros',
      },
      en: {
        txt1: 'Transforming the Travel Experience',
        txt2: 'Find the way to your journey',
        txt3: 'Organize your ideal trip with us',
      }
    },
    search:
    {
      es: {
        txt1: '¿Donde quieres ir de viaje?',
        txt2: 'Generar viaje',
      },
      en: {
        txt1: 'Where are you going to?',
        txt2: 'Generate trip'
      },
    },
    aboutSection1:
    {
      es: {
        span1: "Descubre tu",
        span2: "próxima aventura",
        txt1: "Selecciona y personaliza tu viaje",
        txt2: "Comienza tu viaje",
      },
      en: {
        span1: "Discover your",
        span2: "next adventure",
        txt1: "Select and customize your trip",
        txt2: "Start your journey",
      }
    },
    aboutSection3:
    {
      es: {
      type0 : {
        txt1: "Simplicidad en Accion",
        txt2: "Introduce un prompt, genera un plan de viaje",
        btn1: "Ver cómo",
      },
      type1 : {
        txt1: "Emprende la aventura",
        txt2: "El mundo te espera, descúbrelo",
        btn1: "Únete Ahora",
        btn2: "Saber más",
      },
    },
      en: {
        type0 : {
          txt1: "Simplicity in Action",
          txt2: "Enter a prompt, generate a travel plan",
          btn1: "See how",
        },
        type1 : {
          txt1: "Start the adventure",
          txt2: "The world awaits you, discover it",
          btn1: "Join Now",
          btn2: "Learn more"
        },
      },
    },
    aboutSection4:
    {
      es: {
        title1: "Propmt Inteligente",
        title2: "Aventuras a medida",
        title3: "Exploración mundial",
        title4: "Itinerarios instantáneos",
        txt1: "Tecnología que convierte palabras en itinerarios",
        txt2: "Personalice sus viajes con la creatividad de la IA",
        txt3: "Descubra destinos gracias a la inteligencia artificial",
        txt4: "Generar rápidamente planes para cualquier ayuda",
      },
      en: {
        title1: "Propmt Inteligence",
        title2: "Custom Adventures",
        title3: "Global Exploration",
        title4: "Instant Itinieraries",
        txt1: "Technology that turns words into itineraries",
        txt2: "Personalize your travel with AI creativity",
        txt3: "Discover destinations throught AI insights",
        txt4: "Quickly generate plans for any help",
      },
    },
    footerTeo: 
    {
      es: {
        txt1: "Todos los derechos reservados 2024",
      },
      en: {
        txt1: "All rights reserved 2024",
      }
    }
  })

  function get(section, language) {
    return data[section][language]
  }

  return {
    get
  }
})
