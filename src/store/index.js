import { createStore } from "vuex";

import userModule from "./modules/user";
import periodsModule from "./modules/periods";
import plansModule from "./modules/plans";
import operationsModule from "./modules/operations";
import kidsModule from "./modules/kids";
import paymentsModule from "./modules/payments";
import debtModule from "./modules/debt";
import publicModule from "./modules/public";
import parentsModule from "./modules/parents";

export default createStore({
  modules: {
    user: userModule,
    periods: periodsModule,
    plans: plansModule,
    operations: operationsModule,
    kids: kidsModule,
    payments: paymentsModule,
    debt: debtModule,
    public: publicModule,
    parents: parentsModule,
  },
});
