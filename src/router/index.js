import { createRouter, createWebHistory } from "vue-router";
import { checkStoredUser } from "@/composition/appAuth";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView";
import TokensView from "@/views/tokens/TokensView";
import store from "@/store";
import DashboardVue from "@/views/Dashboard.vue";
import AddTokenViewVue from "@/views/tokens/AddTokenView.vue";
import PlansViewVue from "@/views/plans/PlansView.vue";
import PlanEditorView from "@/views/plans/PlanEditorView";
import OperationsViewVue from "@/views/operations/OperationsView.vue";
import OperationsEditorViewVue from "@/views/operations/OperationsEditorView.vue";
import KidsViewVue from "@/views/kids/KidsView.vue";
import KidsEditorVue from "@/views/kids/KidsEditorView.vue";
import PaymentsViewVue from "@/views/payments/PaymentsView.vue";
import PaymentsEditorViewVue from "@/views/payments/PaymentsEditorView.vue";
import DebtViewVue from "@/views/reports/DebtView.vue";
import ParentEditorView from "@/views/parents/ParentEditorView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { noAuth: true },
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
    component: DashboardVue,
  },
  {
    path: "/tokens",
    name: "tokens",
    component: TokensView,
  },
  {
    path: "/token-add",
    name: "token-add",
    component: AddTokenViewVue,
  },
  {
    path: "/plans",
    name: "plans",
    component: PlansViewVue,
  },
  {
    path: "/plan-form/:id?",
    name: "plan-form",
    component: PlanEditorView,
    props: true,
  },
  {
    path: "/operations",
    name: "operations",
    component: OperationsViewVue,
  },
  {
    path: "/operations-form/:id?",
    name: "operations-form",
    component: OperationsEditorViewVue,
    props: true,
  },
  {
    path: "/kids",
    name: "kids",
    component: KidsViewVue,
  },
  {
    path: "/kids-form/:id?",
    name: "kids-form",
    component: KidsEditorVue,
    props: true,
  },
  {
    path: "/payments",
    name: "payments",
    component: PaymentsViewVue,
  },
  {
    path: "/payments-form/:id?",
    name: "payments-form",
    component: PaymentsEditorViewVue,
    props: true,
  },
  {
    path: "/parents-form/:id?",
    name: "parents-form",
    component: ParentEditorView,
    props: true,
  },
  {
    path: "/debt",
    name: "debt",
    component: DebtViewVue,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = store.getters["user/isAuth"];
  if (to.matched.some((record) => record.meta.noAuth)) {
    // public routes
    next();
  } else {
    // auth routes only
    if (!loggedIn) {
      // check save logged user
      checkStoredUser().then((isAuth) => {
        if (isAuth) {
          next(to);
        } else {
          next({ name: "login" });
        }
      });
    } else {
      next();
    }
  }
});

export default router;
