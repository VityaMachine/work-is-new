const employeesView = document.querySelector('[data-view="employees"]');

export default function renderEmployeesPage() {
  employeesView.innerHTML = `
    <header class="page-header">
      <div>
        <h1>Manage employees</h1>
        <p class="page-description">
          This page contain employees data
        </p>
      </div>
    </header>

    <section class="card">
      <button class="button">Add employee</button>

      <div class="empty-state">
        No added employees
      </div>
    </section>
  `;
}
