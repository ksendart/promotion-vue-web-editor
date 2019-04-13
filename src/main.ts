import HomeComponent from '@/components/home/home';
import Vue from 'vue';
import { router } from './router';
import VueRx from 'vue-rx';
import Rx from 'rxjs/Rx';
import Notifications from 'vue-notification';
import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import firebase from 'firebase/app';
import 'firebase/firestore';

Vue.use(BootstrapVue);
Vue.use(VueRx, Rx);
Vue.use(Notifications);

const config = {
  apiKey: 'AIzaSyBmXUDt0w8wUqfL8O9vIENpQ0ozhBN5m50',
  authDomain: 'vue-web-editor-c8a83.firebaseapp.com',
  databaseURL: 'https://vue-web-editor-c8a83.firebaseio.com',
  messagingSenderId: '1051590386557',
  projectId: 'vue-web-editor-c8a83',
  storageBucket: 'vue-web-editor-c8a83.appspot.com'
};
export const app = firebase.initializeApp(config);
export const db = app.firestore();

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(HomeComponent),
}).$mount('#app');
