import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import store from '../store/index';

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
      }, {
        name: 'system',
        path: 'system',
        component: () => import('../components/SystemView'),
        meta: { requiresState: true },
      }, {
        name: 'goverment',
        path: 'goverment',
        component: () => import('../components/GovermentView'),
        meta: { requiresState: true },
      }, {
        name: 'objectview',
        path: 'objectview/:systemId/:objectId',
        beforeEnter: (to, from, next) => {
          const payload = {
            systemId: to.params.systemId,
            objectId: to.params.objectId,
            objectName: to.params.objectName,
          };
          store.dispatch('changeObjectView', payload);
          next({ name: 'object' });
        },
      }, {
        name: 'object',
        path: 'object',
        component: () => import('../components/ObjectView'),
        meta: { requiresState: true },
      }, {
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresState)) {
    if (store.state.systems.all.length === 0) {
      next({
        name: 'mainmenu',
      });
    } else {
      next();
    }
  } else next();
});

export default router;
