import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView";
import TokensView from "@/views/TokensView";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { noAuth: true },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: HomeView,
  },
  {
    path: "/tokens",
    name: "tokens",
    component: TokensView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // только для авторизованных действий
  const loggedIn = store.getters["user/isAuth"];
  if (to.matched.some((record) => record.meta.noAuth)) {
    next();
  } else {
    if (!loggedIn) {
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
