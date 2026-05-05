import { getRoute, showView, setActiveNav } from "./utils/router.js";
import { initSavedUsers } from "./lib/users-lib.js";
import { loadJSON } from "./utils/json-loader.js";

import renderDashboardPage from "./pages/dashboard.js";
import renderTeamPage from "./pages/team.js";
import renderEmployeesUsersPage from "./pages/employees-users.js";
import renderSettingsPage from "./pages/settings.js";
import renderNotFoundPage from "./pages/not-found.js";

const teams = await loadJSON("./configs/teams.json");

await initSavedUsers("../data/users.json");

function render() {
  const route = getRoute();

  if (route.view === "dashboard") renderDashboardPage(teams);
  if (route.view === "team") renderTeamPage(teams, route.params.teamId);
  if (route.view === "employees-users") {
    renderEmployeesUsersPage();
  }
  if (route.view === "settings") renderSettingsPage();
  if (route.view === "not-found") renderNotFoundPage();

  showView(route.view);
  setActiveNav();
}

window.addEventListener("hashchange", render);

render();
