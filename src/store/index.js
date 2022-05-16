import { createStore } from "vuex";

import appModule from "./modules/app.js";
import userModule from "./modules/user";
import periodsModule from "./modules/periods";
import plansModule from "./modules/plans";
import operationsModule from "./modules/operations";
import kidsModule from "./modules/kids";
import paymentsModule from "./modules/payments";
import debtModule from "./modules/debt";
import publicModule from "./modules/public";

export default createStore({
  modules: {
    app: appModule,
    user: userModule,
    periods: periodsModule,
    plans: plansModule,
    operations: operationsModule,
    kids: kidsModule,
    payments: paymentsModule,
    debt: debtModule,
    public: publicModule,
  },
});
