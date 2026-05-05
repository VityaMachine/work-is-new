import { bindEmployeesEvents } from "../lib/users-lib.js";
import renderUsersTable from "../components/users/usersTable.js";

const employeesView = document.querySelector('[data-view="employees"]');

export default function renderEmployeesPage() {
  employeesView.innerHTML = `
    <header class="page-header">
      <div>
        <p class="eyebrow">Directory</p>
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

    <div class="modal-backdrop" id="addEmployeeModal" hidden>
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="addEmployeeModalTitle">
        <div class="modal__header">
          <div>
            <p class="eyebrow">Employee</p>
            <h2 id="addEmployeeModalTitle">Add Employee</h2>
          </div>

          <button class="icon-button" type="button" id="closeAddEmployeeModalBtn" aria-label="Close modal">
            &times;
          </button>
        </div>

        <form class="modal__body" id="addEmployeeForm">
          <label class="field">
            <span>ID</span>
            <input type="text" id="employeeIdInput" placeholder="e.g. 001" />
          </label>

          <label class="field">
            <span>Login</span>
            <input type="text" id="employeeLoginInput" placeholder="ivanenko.i" />
          </label>

          <label class="field">
            <span>Full Name</span>
            <input type="text" id="employeeFullNameInput" placeholder="Ivanenko Ivan" />
          </label>

          <div class="modal__actions">
            <button class="button button--secondary" type="button" id="cancelAddEmployeeBtn">
              Cancel
            </button>

            <button class="button" type="submit">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  bindEmployeesEvents();
  renderUsersTable();
}
