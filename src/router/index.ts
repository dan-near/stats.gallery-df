import { networks } from '@/services/near/indexer/networks';
import Landing from '@/views/Landing.vue';
import Overview from '@/views/Overview.vue';
import Page from '@/views/Page.vue';
import Quests from '@/views/Quests.vue';
import Stats from '@/views/Stats.vue';
import Story from '@/views/Story.vue';
import Transactions from '@/views/Transactions.vue';
import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
  NavigationGuardWithThis,
  RouteLocationNormalizedLoaded,
  RouteRecordRaw,
} from 'vue-router';

export type RouteTitleGenerator = (
  route: RouteLocationNormalizedLoaded,
) => string;

const preserveQueryString: NavigationGuardWithThis<undefined> = (
  to,
  from,
  next,
) => {
  if (
    Object.keys(from.query).length > 0 &&
    Object.keys(to.query).length === 0
  ) {
    next({ ...to, query: from.query });
  } else {
    next();
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'landing',
    component: Landing,
    meta: {
      title: 'stats.gallery',
      noTitleSuffix: true,
    },
  },
  {
    path: '/story',
    name: 'story',
    component: Story,
    meta: {
      title: 'the story behind stats.gallery',
      noTitleSuffix: true,
    },
  },
  {
    path: '/:network(' + Object.keys(networks).join('|') + ')/:account',
    component: Page,
    children: [
      {
        path: '',
        redirect: {
          name: 'overview',
        },
        strict: true,
      },
      {
        path: 'overview',
        name: 'overview',
        component: Overview,
        beforeEnter: [preserveQueryString],
        meta: {
          title: <RouteTitleGenerator>(
            (route =>
              `${route.params.account}'s ${route.params.network} activity overview`)
          ),
        },
      },
      {
        path: 'stats',
        name: 'stats',
        component: Stats,
        beforeEnter: [preserveQueryString],
        meta: {
          title: <RouteTitleGenerator>(
            (route => `${route.params.account}'s ${route.params.network} stats`)
          ),
        },
      },
      {
        path: 'transactions',
        name: 'transactions',
        component: Transactions,
        beforeEnter: [preserveQueryString],
        meta: {
          title: <RouteTitleGenerator>(
            (route =>
              `${route.params.account}'s ${route.params.network} transactions`)
          ),
        },
      },
      {
        path: 'quests',
        name: 'quests',
        component: Quests,
        beforeEnter: [preserveQueryString],
        meta: {
          title: <RouteTitleGenerator>(
            (route =>
              `${route.params.account}'s ${route.params.network} quests`)
          ),
        },
      },
    ],
  },
  // {
  //   path: '/overview',
  //   name: 'overview',
  //   component: Overview,
  //   meta: {
  //     title: 'overview',
  //   },
  // },
  // {
  //   path: '/stats',
  //   name: 'stats',
  //   component: Charts,
  //   meta: {
  //     title: 'stats',
  //   },
  // },
];

export function initRouter() {
  return createRouter({
    history:
      // Are we doing SSR right now?
      typeof window === 'undefined'
        ? createMemoryHistory()
        : createWebHistory(),
    routes,
  });
}
