const views = document.querySelectorAll("[data-view]");

export function getRoute() {
  const hash = window.location.hash || "#/";

  if (hash.startsWith("#/team/")) {
    return {
      view: "team",
      params: {
        teamId: hash.replace("#/team/", ""),
      },
    };
  }

  const routes = {
    "#/": { view: "dashboard", params: {} },
    "#/employees": { view: "employees", params: {} },
    "#/settings": { view: "settings", params: {} },
  };

  return routes[hash] || { view: "not-found", params: {} };
}

export function showView(viewName) {
  views.forEach((view) => {
    view.hidden = view.dataset.view !== viewName;
  });
}

export function setActiveNav() {
  const hash = window.location.hash || "#/";
  const links = document.querySelectorAll("[data-route-link]");

  links.forEach((link) => {
    link.classList.toggle("nav__link--active", link.dataset.routeLink === hash);
  });
}
