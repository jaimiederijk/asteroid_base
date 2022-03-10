import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home';
import store from '../store/index';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  }, {
    path: '/about',
    name: 'About',
    component: () => import('../views/About'),
  }, {
    path: '/new',
    name: 'Newgame',
    component: () => import('../views/Newgame'),
  }, {
    path: '/game',
    component: () => import('../views/Game'),
    children: [
      {
        name: 'starmap',
        path: 'starmap',
        component: () => import('../components/StarMapView'),
        meta: { requiresState: true },
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
        name: 'objectview', // deprecated
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
        name: 'shipyard',
        path: 'shipyard',
        component: () => import('../components/ShipyardView'),
        meta: { requiresState: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresState)) {
    if (store.state.map.systems.length === 0) {
      next({
        name: 'Home',
      });
    } else {
      next();
    }
  } else next();
});

export default router;
