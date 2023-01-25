import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: { name: 'home-index' },
    children: [{ name: 'home-index', path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    name: 'mock',
    path: '/mock',
    component: () => import('layouts/MainLayout.vue'),
    redirect: { name: 'mock-index' },
    children: [{ name: 'mock-index', path: '', component: () => import('pages/MockingPage.vue') }],
  },
  {
    name: 'benchmark',
    path: '/benchmark',
    component: () => import('layouts/MainLayout.vue'),
    redirect: { name: 'benchmark-index' },
    children: [{ name: 'benchmark-index', path: '', component: () => import('pages/BenchmarkPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
