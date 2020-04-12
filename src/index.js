// JS
import './js/'

// SCSS
import './core/main.scss'

// Vue.js
window.Vue = require('vue')

// Vue components (for use in html)
Vue.component('pick-cue-player', require('./views/components/PickCuePlayer.vue').default)

// Vue init
const app = new Vue({
  el: '#app'
})