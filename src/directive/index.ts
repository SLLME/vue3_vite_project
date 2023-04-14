import { setupFocusDirective } from "./focus";
import type { App } from 'vue';

export function setupGlobDirectives(app: App) {
  setupFocusDirective(app);
}