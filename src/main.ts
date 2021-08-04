import '@/assets/styles/style.scss'
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'prismjs/themes/prism-coy.css';
import 'typeface-roboto/index.css';

import Button from "primevue/button";
import Password from "primevue/password";
import Dialog from "primevue/dialog";
import InputText from 'primevue/inputtext';

import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

const app = createApp(App);

app.use(PrimeVue)
    .use(store)
    .use(router)
    .use(ToastService);

app.component('InputText', InputText);
app.component('Button', Button);
app.component('Password', Password);
app.component('Dialog', Dialog);

app.mount('#app')