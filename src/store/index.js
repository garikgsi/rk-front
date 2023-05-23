import { createStore } from "vuex";

import appModule from "./modules/app";
import userModule from "./modules/user";
import periodsModule from "./modules/periods";
import kidsModule from "./modules/kids";
import organizationsModule from "./modules/organizations";
import plansModule from "./modules/plans";
import operationsModule from "./modules/operations";
import paymentsModule from "./modules/payments";
// import debtModule from "./modules/debt";
import publicModule from "./modules/public";
import parentsModule from "./modules/parents";

export default createStore({
  modules: {
    app: appModule,
    user: userModule,
    periods: periodsModule,
    plans: plansModule,
    operations: operationsModule,
    payments: paymentsModule,
    // debt: debtModule,
    public: publicModule,
    parents: parentsModule,
    organizations: organizationsModule,
    kids: kidsModule,
  },
});
