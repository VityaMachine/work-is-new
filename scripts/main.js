import { getRoute, showView, setActiveNav } from "./utils/router.js";
import { loadJSON } from "./utils/json-loader.js";

import renderDashboardPage from "./pages/dashboard.js";
import renderTeamPage from "./pages/team.js";
import renderEmployeesPage from "./pages/employees.js";
import renderSettingsPage from "./pages/settings.js";
import renderNotFoundPage from "./pages/not-found.js";

const teams = await loadJSON("./configs/teams.json");

function render() {
  const route = getRoute();

  if (route.view === "dashboard") renderDashboardPage(teams);
  if (route.view === "team") renderTeamPage(teams, route.params.teamId);
  if (route.view === "employees") renderEmployeesPage();
  if (route.view === "settings") renderSettingsPage();
  if (route.view === "not-found") renderNotFoundPage();

  showView(route.view);
  setActiveNav();
}

window.addEventListener("hashchange", render);

render();
