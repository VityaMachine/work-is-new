import { bindMonthlyDataEvents } from "../lib/monthly-data-lib.js";

import renderMonthlyPreviewTable from "../components/users/monthlyPreviesTable.js";
import { state } from "../state.js";

const employeesMonthlyDataView = document.querySelector(
  '[data-view="employees-monthly-data"]',
);

export function renderEmployeesMonthlyDataPage() {
  const importedRowsCount = state.employeesData.monthlyRows.length;
  const rowsStatus = importedRowsCount
    ? `${importedRowsCount} rows imported`
    : "Not imported";

  employeesMonthlyDataView.innerHTML = `
    <header class="page-header">
      <div>
        <p class="eyebrow">Employees</p>
        <h1>Monthly teams data</h1>
        <p class="page-description">
          Paste monthly team data copied from Excel. First row must contain column headers.
        </p>
      </div>
    </header>

    <section class="card">
      <div class="section-header">
        <div>
          <h2>Import data</h2>
          <p>Paste copied Excel rows into the textarea below.</p>
        </div>

        <span class="badge" id="monthlyRowsStatus">
          ${rowsStatus}
        </span>
      </div>

      <label class="field">
        <span>Excel paste area</span>
        <textarea
          class="textarea"
          id="monthlyDataTextarea"
          placeholder="Paste Excel data here..."
          rows="12"
        ></textarea>
      </label>

      <div class="form-actions">
        <button class="button" type="button" id="parseMonthlyDataBtn">
          Parse data
        </button>

        <button class="button button--success" type="button" id="confirmMonthlyDataBtn" disabled>
          Confirm data
        </button>

        <button class="button button--secondary" type="button" id="clearMonthlyDataBtn">
          Clear
        </button>
      </div>
    </section>

    <section class="card">
      <div class="section-header">
        <div>
          <h2>Preview</h2>
          <p>Check parsed rows before confirming them for current session.</p>
        </div>
      </div>

      <div class="table-wrapper monthly-preview-wrapper">
        <table class="data-table" id="monthlyPreviewTable">
          <tbody>
            <tr>
              <td class="table-empty">
                No preview data yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;

  bindMonthlyDataEvents();
  renderMonthlyPreviewTable();
}
