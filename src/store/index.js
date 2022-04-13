import { createStore } from "vuex";

import appModule from "./modules/app.js";
import userModule from "./modules/user";

export default createStore({
  modules: {
    app: appModule,
    user: userModule,
  },
});
