import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About'),
  },
  {
    path: '/game',
    component: () => import('../views/Game'),
    children: [
      {
        name: 'mainmenu',
        path: '',
        component: () => import('../components/MainMenu'),
      },
      {
        name: 'system',
        path: 'system',
        component: () => import('../components/SystemView'),
      },
      {
        name: 'goverment',
        path: 'goverment',
        component: () => import('../components/GovermentView'),
      },
      {
        name: 'newgame',
        path: 'newgame',
        component: () => import('../components/NewGame'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
