import { bindEmployeesEvents } from "../lib/users-lib.js";
import renderUsersTable from "../components/users/usersTable.js";

const employeesView = document.querySelector('[data-view="employees-users"]');

export default function renderEmployeesPage() {
  employeesView.innerHTML = `
    <header class="page-header">
      <div>
        <h1>Employees</h1>
        <p class="page-description">
          Manage base employees list used for bonus calculations.
        </p>
      </div>

      <div class="page-actions">
        <button class="button" id="openAddEmployeeModalBtn">
          Add Employee
        </button>

        <button class="button button--ghost" id="exportUsersJsonBtn">
          Download users.json
        </button>
      </div>
    </header>

    <section class="card">
      <div class="section-header">
        <div>
          <h2>Employees List</h2>
          <p>Search, view and edit employees.</p>
        </div>
      </div>

      <label class="field search-field">
        <span>Search</span>
        <input
          type="search"
          id="usersSearchInput"
          placeholder="Search by ID, login or name"
        />
      </label>

      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Login</th>
              <th>Full Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="usersTableBody">
            <tr>
              <td colspan="4" class="table-empty">
                No employees yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;

  bindEmployeesEvents();
  renderUsersTable();
}
