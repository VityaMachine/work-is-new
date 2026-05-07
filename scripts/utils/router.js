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

    "#/employees": { view: "employees-users", params: {} },
    "#/employees/users": { view: "employees-users", params: {} },
    "#/employees/monthly-data": { view: "employees-monthly-data", params: {} },
    "#/employees/csv-data": { view: "employees-csv-data", params: {} },

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
  const submenus = document.querySelectorAll("[data-submenu-for]");

  links.forEach((link) => {
    const route = link.dataset.routeLink;

    const isExactActive = route === hash;

    const isParentActive =
      link.dataset.navParent === "true" && hash.startsWith(route);

    link.classList.toggle("nav__link--active", isExactActive || isParentActive);

    link.classList.toggle("nav__sublink--active", isExactActive);
  });

  submenus.forEach((submenu) => {
    const parentRoute = submenu.dataset.submenuFor;

    const isOpen = hash.startsWith(parentRoute);

    submenu.classList.toggle("nav-submenu--open", isOpen);
  });
}
