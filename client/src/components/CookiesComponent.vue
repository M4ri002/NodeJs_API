<script setup>
import { ref, onMounted } from 'vue'
//------------------------------------------------
const cookies = ref(null)
const analiticas = ref(true)
const gtm = defineProps(['gtm']);

onMounted(() => {
  cookies.value = new Cookies(gtm)
  cookies.value.init()
})

//------------------------------------------------
class Cookies {
  constructor(gtm) {
    this._gtm = gtm
    this._cookiesAllowed = false
  }

  init() {
    this._cookiesAllowed = localStorage.getItem('cookies') === 'true'
    this.initAllowCookies()
  }

  initAllowCookies() {
    this._cookiesAllowed = document.cookie.includes('consent=1')
    // console.log(`[z][gdpr:${this._cookiesAllowed}]`)
    this.askCookies(!this._cookiesAllowed, false)
    if (this._cookiesAllowed) {
      const cookies = document.cookie.split(';')
      const gdpr = cookies.find(cookie => cookie.trim().startsWith('consent='))
      const consent = gdpr ? gdpr.split('=')[1] : '00'
      // console.log(`[z][analytics:${consent[1]}]`)
      analiticas.value = consent[1] === '1'
      this.allowCookies(this._cookiesAllowed, consent, consent[1] === '1')
    }
  }

  initAllowCookiesClick() {
    this.allowCookies(true, '', analiticas.value)
  }

  initAllowAllCookiesClick() {
    this.allowCookies(true, '', true)
  }

  initDisallowAllCookiesClick() {
    this.allowCookies(true, '', false)
  }

  askCookies(ask, full) {
    if (ask) {
      document.getElementById('cajaCookies').style.display = 'block'
      if (full) document.getElementById('masCookies').checked = true
    } else {
      document.getElementById('cajaCookies').style.display = 'none'
      document.getElementById('floatCookies').style.display = 'block'
    }
  }

  allowCookies(allow, consent, analytics) {
    this._cookiesAllowed = allow
    this.askCookies(false, false)
    const consent_ = this.saveCookiesAllowed(allow, consent, analytics)
    if (consent_[1] === '1') {
      this.addTagManager()
      window.dataLayer = window.dataLayer || []
      // console.log(`[z][event:consent]`)
      window.dataLayer.push({ 'event': 'consent' })
    }
  }

  saveCookiesAllowed(allow, consent, analytics) {
    let consent_ = (allow) ? '1' : '0'
    if (consent === '') consent = '00'
    /** analytics */
    consent_ += (analytics) ? '1' : consent[1]
    document.cookie = `consent=${consent_}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`
    localStorage.setItem('cookies', consent_)
    // console.log(`[z][consent:${consent_}]`)
    analiticas.value = consent_[1] === '1'
    return [consent_[0], consent_[1]]
  }

  addTagManager() {
    // console.log(`[z][gtag:${this._gtm}]`);
    (function(w, d, s, l, i) {
      w[l] = w[l] || []
      w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      })
      var f = d.getElementsByTagName(s)[0], j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : ''
      j.async = true
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
      f.parentNode.insertBefore(j, f)
    })(window, document, 'script', 'dataLayer', this._gtm)
  }
}
</script>
<template>
  <div id="popupCookies">
    <div id="floatCookies">
      <button class="btn btn-small lite" @click="cookies.askCookies(true, true)">Gestionar cookies</button>
    </div>
    <div id="cajaCookies">
      <div id="contenedorCookies">
        <div>
          <p><strong>Esta web utiliza cookies:</strong> Utilizamos cookies y third party cookies para mejorar la web, medir la audiencia y mejorar la experiencia de usuario. Siempre puede cambiar sus preferencias o deshabilitarlo en la parte inferior de la página. Tenga en cuenta que parte de las cookies que utilizamos son esenciales para el funcionamiento de la página web. Accede a
            <label for="masCookies" id="botonInfoCookies">gestionar cookies</label>
            para más detalle.
          </p>
        </div>
        <div class="botonera">
          <button class="btn btn-small" @click="cookies.initAllowCookiesClick()">Aceptar</button>
          <button class="btn btn-small lite" @click="cookies.initDisallowAllCookiesClick()">Rechazar</button>
        </div>
      </div>
      <div class="checkbox" id="cajaMasInfo">
        <input id="masCookies" name="masCookies" type="checkbox">
        <div for="masCookies" id="infoCookies">
          <h3>Privacidad:</h3>
          <p>Nuestra página utiliza cookies y tecnologías similares como pixel tags y web beacons. Una cookie es un pequeño conjunto de datos que una página pide a su navegador que almacene en su ordenador o dispositivo móvil. Las Cookies permiten a la página "recordar" sus acciones o preferencias en el tiempo. De ese modo, cuando visite la página, las cookies pueden almacenar o encontrar información en su navegador, que puede estar relacionada con usted, sus preferencias y/o su dispositivo. Utilizamos cookies y third party cookies para mejorar la web, medir la audiencia, mejorar la experiencia y mostrar publicidad basada en su historial de búsqueda e intereses en esta página y en otras. Por ejemplo, las cookies nos permiten saber cuántos usuarios acceden o utilizan nuestro servicio, qué contenidos, productos y qué características interesan más a nuestros usuarios y cómo funciona nuestro servicio desde un punto de vista técnico.</p>
          <p>Haga click sobre los títulos de las diferentes categorías para gestionar sus preferencias de las cookies y descubra más acerca de las cookies y cómo las utilizamos. Recuerde que si no acepta ciertas cookies, puede repercutir en su experiencia en la página y servicios que podamos ofrecerle.</p>
          <p>Si tiene más preguntas acerca de cómo utilizamos las cookies, por favor contactenos en <a href="mailto:mail@zguillez.io">mail@zguillez.io</a>.</p>
          <div class="borderCookies">
            <h3>
              <div class="checkbox">
                <input checked disabled id="necesarias" name="necesarias" type="checkbox">
                <label for="necesarias">Cookies estrictamente necesarias</label>
              </div>
            </h3>
            <p>Estas cookies son estrictamente necesarias para el correcto funcionamiento de la página y no pueden deshabilitarse en nuestros sistemas. Estas cookies proporcionan funcionalidades primarias como la seguridad, gestión de la red y accesibilidad. No siempre procesamos datos personales cuando introducimos cookies necesarias. Cuando sí lo hacemos, seguimos las bases legales para procesarlos: son necesarios para el correcto funcionamiento y que usted pueda visualizar la página. Recuerde que usted puede configurar su navegador para que bloquee estas cookies, pero ello afectará las diferentes funciones de la página.</p>
          </div>
          <div class="borderCookies">
            <h3>
              <div class="checkbox">
                <input type="checkbox" id="analiticas" name="analiticas" v-model="analiticas">
                <label for="analiticas">Cookies de rendimiento</label>
              </div>
            </h3>
            <p>Estas cookies nos permiten mejorar la página recogiendo información de como usted usa la página. Esta información nos permite mejorar el rendimiento de la página, corregir errores y proporcionar una mejor experiencia del usuario. Por ejemplo, nos ayuda a entender cuánto tiempo pasa usted en la página,desde dónde está accediendo y nos permite además saber si es la primera vez que visita nuestra página o ya lo ha hecho con anterioridad, para poder identificar el número de unique visitors que recibimos.</p>
          </div>
          <div class="botonera">
            <button class="btn btn-small" @click="cookies.initAllowAllCookiesClick()">Aceptar todas las cookies</button>
            <button class="btn btn-small lite" @click="cookies.initDisallowAllCookiesClick()">Rechazar todas las cookies</button>
            <button class="btn btn-small lite" @click="cookies.initAllowCookiesClick()">Guardar configuración</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
$cookies_color1: #FFFFFF;
$cookies_color2: #404958;
$cookies_color3: #000000;
$cookies_color4: #08182A;
$cookies_color5: #1A3553;
$max_width: 1280px;
//------------------------------------------------
@mixin flexbox($align: center, $justify: center) {
  align-items: $align;
  display: flex;
  justify-content: $justify;
}
@mixin box($bg-color, $border-color) {
  background-color: $bg-color;
  border: 0.1em solid $border-color;
}
%common-text {
  color: $cookies_color3;
  font-family: sans-serif;
  font-size: 13px;
}
//------------------------------------------------
#popupCookies {
  h2, h3, p, strong, a, label {
    @extend %common-text;
    margin: 0;
  }
  a, label {
    text-decoration: underline;
    cursor: pointer;
  }
  #floatCookies, #cajaCookies {
    font-size: 12px;
    background-color: $cookies_color1;
    border: none;
    bottom: 0;
    box-shadow: 0 0 1em $cookies_color2;
    box-sizing: border-box;
    color: #545454;
    display: none;
    text-align: left;
    left: 0;
    padding: 1em;
    position: fixed;
    right: 0;
    max-height: 100vh;
    overflow-y: auto;
    z-index: 9999;
    h2, h3 {
      color: $cookies_color3;
      font-size: 13px;
      font-weight: bold;
      margin: 0;
    }
    p {
      color: $cookies_color3;
      margin-right: 1em;
      margin-bottom: 1em;
    }
    strong {
      color: $cookies_color3;
    }
    a {
      color: $cookies_color3;
      text-decoration: underline;
    }
    label {
      color: $cookies_color3;
      text-decoration: underline;
      font-weight: 700;
      cursor: pointer;
    }
    #contenedorCookies {
      @include flexbox(flex-end, justify);
      margin: 0 auto;
      max-width: $max_width;
      width: 100%;
    }
    #formCookies, #formCookies form {
      @include flexbox;
      border: 0.1em solid $cookies_color2;
      border-radius: .25rem;
    }
    .checkbox {
      position: relative;
      color: $cookies_color3;
    }
    .checkbox > input[type="checkbox"] {
      display: none;
    }
    .checkbox > label {
      cursor: pointer;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      font-weight: bold;
      letter-spacing: 1px;
      margin: 10px 0;
      padding-left: 1.5em;
      position: relative;
    }
    /*---caja checkbox--*/
    .checkbox > label:before {
      background-color: $cookies_color1;
      border: 0.1em solid $cookies_color2;
      border-radius: .25rem;
      content: "";
      display: block;
      height: 1em;
      left: 0;
      position: absolute;
      top: 0;
      width: 1em;
    }
    .checkbox > label#botonInfoCookies:before {
      display: none;
    }
    /*-----check checkbox-----*/
    input[name="necesarias"]:checked + label[for="necesarias"]:after,
    input[name="analiticas"]:checked + label[for="analiticas"]:after {
      border-bottom: 0.2em solid $cookies_color4;
      border-right: 0.2em solid $cookies_color4;
      content: "";
      display: block;
      height: 0.8em;
      left: 0.4em;
      position: absolute;
      top: 0;
      -ms-transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      width: 0.3em;
    }
    .botonera {
      display: flex;
      flex-direction: row;
    }
    .btn {
      background-color: $cookies_color4;
      color: $cookies_color1;
      font-weight: bold;
      border-radius: .25rem;
      cursor: pointer;
      display: inline-block;
      line-height: 1.5;
      padding: .375rem .75rem;
      text-align: center;
      text-transform: uppercase;
      transition: all 0.5s;
      user-select: none;
      vertical-align: middle;
      white-space: nowrap;
      border: 1px solid $cookies_color4;
      margin: 10px 10px 10px 0;
      font-size: 0.8em;
    }
    .btn:hover {
      background-color: $cookies_color5;
    }
    .btn.lite {
      background-color: $cookies_color1;
      color: $cookies_color4;
    }
    .btn.lite:hover {
      border: 1px solid $cookies_color5;
      color: $cookies_color5;
    }
    #infoCookies {
      background-color: $cookies_color1;
      height: 0;
      margin: 0 auto;
      max-width: $max_width;
      opacity: 0;
      overflow: hidden;
      padding: 0 10vw 10px 0;
      transition: all 1s;
      width: 100%;
    }
    #botonInfoCookies {
      color: $cookies_color3;
      display: inline-block;
      margin: 0;
      text-align: center;
      text-decoration: underline;
    }
    input[name="masCookies"]:checked ~ #infoCookies {
      display: block;
      height: auto;
      opacity: 1;
    }
    .borderCookies {
      border: 0.1em solid $cookies_color2;
      margin-top: 10px;
      padding-left: 25px;
      padding-right: 25px;
      padding-bottom: 10px;
    }
    @media only screen and (max-width: 599px) {
      #cajaCookies {
        bottom: auto;
        position: absolute;
        top: 0;
      }
      #contenedorCookies {
        display: block;
      }
      input[type="submit"] {
        margin: auto;
        width: 100%;
      }
      #infoCookies {
        padding: 10px 25px 10px 25px;
      }
      .botonera {
        flex-direction: column;
        padding-top: 10px;
      }
      .btn {
        margin: 5px 0 5px 0;
      }
    }
  }
  #floatCookies {
    padding: 0;
    text-align: right;
    background: none;
    box-shadow: none;
    .btn {
      margin-bottom: -5px;
      opacity: 0.4;
    }
  }
}
</style>
