import Vue from 'vue';
import Router from 'vue-router';
import AuthGuard from './core/services/auth-guard.service';
import DocumentComponent from './components/document/document.vue';
import LoginComponent from './components/login/login.vue';
import HelloComponent from './components/hello/hello.vue';

Vue.use(Router);

export const router = new Router({
  routes: [
    { path: '/', name: 'home', component: HelloComponent },
    { path: '/login', name: 'login', component: LoginComponent },
    { path: '/create', name: 'create', component: DocumentComponent },
    { path: '/:id', name: 'edit', component: DocumentComponent },
  ],
  mode: 'history',
  base: process.env.BASE_URL,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'login') {
    AuthGuard.provide().isLoggedIn()
        .subscribe((res: string) => {
          if (res) {
            next();
          } else {
            next({ path: '/login' });
          }
        });
  } else {
    next();
  }
});
