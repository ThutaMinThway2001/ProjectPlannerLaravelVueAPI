import Vue from 'vue'
import router from './router'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
    })
Vue.component('main-app', require('./components/App').default);

window.Swal = Swal;
window.Toast = Toast;
const app = new Vue({
    el: '#app',
    router
});