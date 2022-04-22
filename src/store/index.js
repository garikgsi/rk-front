import { createStore } from "vuex";

import appModule from "./modules/app.js";
import userModule from "./modules/user";
import periodsModule from "./modules/periods";

export default createStore({
  modules: {
    app: appModule,
    user: userModule,
    periods: periodsModule,
  },
});
