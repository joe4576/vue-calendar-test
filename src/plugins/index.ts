import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import pinia from "../store";
import router from "../router";
import type { App } from "vue";
import TextInput from "@/components/input/TextInput.vue";
import CForm from "@/components/CForm.vue";
import Dropdown from "@/components/input/Dropdown.vue";

export function registerPlugins(app: App) {
  loadFonts();
  app.use(vuetify).use(router).use(pinia);
}

export function registerComponents(app: App) {
  app.component("TextInput", TextInput);
  app.component("CForm", CForm);
  app.component("Dropdown", Dropdown);
}
