import {
  bindCSVDataEvents,
  renderCSVPreviewTable,
} from "../lib/csv-data-lib.js";

const employeesCSVDataView = document.querySelector(
  '[data-view="employees-csv-data"]',
);

export function renderEmployeesCSVDataPage() {
  employeesCSVDataView.innerHTML = `
    <header class="page-header">
      <div>
        <p class="eyebrow">Employees</p>
        <h1>CSV data</h1>
        <p class="page-description">
          Upload CSV export data, preview it and confirm for current session.
        </p>
      </div>
    </header>

    <section class="card">
      <div class="section-header">
        <div>
          <h2>Import CSV</h2>
          <p>CSV may contain headers or use default column names.</p>
        </div>

        <span class="badge" id="csvRowsStatus">
          Not imported
        </span>
      </div>

      <div class="form-grid">
        <label class="field">
          <span>CSV file</span>
          <input type="file" id="csvFileInput" accept=".csv,text/csv" />
        </label>

        <label class="field">
          <span>Delimiter</span>
          <select id="csvDelimiterInput">
            <option value=";">Semicolon ;</option>
            <option value=",">Comma ,</option>
            <option value="\t">Tab</option>
          </select>
        </label>

        <label class="checkbox-field">
          <input type="checkbox" id="csvHasHeadersInput" checked />
          <span>First row contains headers</span>
        </label>
      </div>
      <div class="form-actions">
        <button class="button" type="button" id="parseCSVDataBtn">
          Parse CSV
        </button>

        <button
          class="button button--success"
          type="button"
          id="confirmCSVDataBtn"
          disabled
        >
          Confirm data
        </button>

        <button
          class="button button--secondary"
          type="button"
          id="downloadCSVDataBtn"
          disabled
        >
          Download updated CSV
        </button>
        <button
          class="button button--secondary"
          type="button"
          id="addCSVRowBtn"
        >
          Add empty row
        </button>




        <button
          class="button button--secondary"
          type="button"
          id="clearCSVDataBtn"
        >
          Clear
        </button>
      </div>
    </section>

    <section class="card">
      <div class="section-header">
        <div>
          <h2>Preview</h2>
          <p>Check parsed CSV rows before confirming them.</p>
        </div>
      </div>
      <label class="field search-field">
        <span>Filter rows</span>

        <input
          type="text"
          id="csvFilterInput"
          placeholder="Search in CSV rows..."
        />
      </label>

      <div class="table-wrapper">
        <table class="data-table" id="csvPreviewTable">
          <tbody>
            <tr>
              <td class="table-empty">No CSV preview data yet</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;

  bindCSVDataEvents();
  renderCSVPreviewTable();
}
