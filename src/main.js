import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";

import directives from "@/directives/index";
import AppPageVue from "./views/AppSkeleton/AppPage.vue";

const app = createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(store)
  .use(router);

directives.forEach((directive) => {
  app.directive(directive.name, directive);
});

app.component("app-page", AppPageVue);

app.mount("#app");
