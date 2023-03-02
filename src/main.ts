/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins, registerComponents } from "@/plugins";
const app = createApp(App);

registerPlugins(app);
registerComponents(app);

app.mount("#app");
