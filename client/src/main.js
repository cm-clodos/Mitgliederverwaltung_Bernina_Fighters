import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import Toast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPeopleGroup,
  faShirt,
  faSort,
  faEye,
  faPencil,
  faTrashCan,
  faFloppyDisk,
  faFileCsv,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faPeopleGroup,
  faShirt,
  faSort,
  faEye,
  faPencil,
  faTrashCan,
  faFloppyDisk,
  faFileCsv
);
const toastOptions = {};
const pinia = createPinia();

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(pinia);
app.use(router);
app.use(Toast, toastOptions);
app.mount("#app");
