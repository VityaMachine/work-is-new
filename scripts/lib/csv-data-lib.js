import { state } from "../state.js";
import { parseCSV } from "../utils/csv-parser.js";

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cloneRows(rows) {
  return rows.map((row) => ({ ...row }));
}

function getFilteredRows(rows) {
  const filter = state.employeesData.csvFilter.trim().toLowerCase();

  if (!filter) {
    return rows;
  }

  return rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(filter),
    ),
  );
}

function renderCSVPreviewTable() {
  const table = document.getElementById("csvPreviewTable");
  const confirmBtn = document.getElementById("confirmCSVDataBtn");
  const downloadBtn = document.getElementById("downloadCSVDataBtn");

  if (!table) return;

  const allRows = state.employeesData.csvPreviewRows || [];
  const rows = getFilteredRows(allRows);

  if (!allRows.length) {
    table.innerHTML = `
      <tbody>
        <tr>
          <td class="table-empty">
            No CSV preview data yet
          </td>
        </tr>
      </tbody>
    `;

    if (confirmBtn) confirmBtn.disabled = true;
    if (downloadBtn) downloadBtn.disabled = true;

    return;
  }

  const headers = Object.keys(allRows[0]);

  table.innerHTML = `
    <thead>
      <tr>
        ${headers.map((header) => `<th>${escapeHTML(header)}</th>`).join("")}
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      ${rows
        .map((row) => {
          const originalRowIndex = allRows.indexOf(row);

          return `
            <tr>
              ${headers
                .map(
                  (header) => `
                    <td>
                      <input
                        class="table-input"
                        type="text"
                        value="${escapeHTML(row[header] ?? "")}"
                        data-csv-cell
                        data-row-index="${originalRowIndex}"
                        data-header="${escapeHTML(header)}"
                      />
                    </td>
                  `,
                )
                .join("")}

              <td>
                <button
                  class="button button--secondary button--small"
                  type="button"
                  data-delete-csv-row="${originalRowIndex}"
                >
                  Delete
                </button>
              </td>
            </tr>
          `;
        })
        .join("")}
    </tbody>
  `;

  if (confirmBtn) confirmBtn.disabled = false;
  if (downloadBtn) downloadBtn.disabled = false;
}

function parseCSVFile() {
  const fileInput = document.getElementById("csvFileInput");
  const hasHeadersInput = document.getElementById("csvHasHeadersInput");
  const delimiterInput = document.getElementById("csvDelimiterInput");

  const file = fileInput?.files?.[0];

  if (!file) {
    alert("Please choose CSV file.");
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    const text = String(reader.result || "");

    const rows = parseCSV(text, {
      hasHeaders: Boolean(hasHeadersInput?.checked),
      delimiter: delimiterInput?.value || ";",
    });

    if (!rows.length) {
      alert("No valid CSV data found.");
      return;
    }

    state.employeesData.csvHasHeaders = Boolean(hasHeadersInput?.checked);

    state.employeesData.csvOriginalRows = cloneRows(rows);

    state.employeesData.csvPreviewRows = cloneRows(rows);

    renderCSVPreviewTable();
  };

  reader.readAsText(file, "UTF-8");
}

function updateCSVCell(rowIndex, header, value) {
  const row = state.employeesData.csvPreviewRows[rowIndex];

  if (!row) return;

  row[header] = value;
}

function deleteCSVRow(rowIndex) {
  state.employeesData.csvPreviewRows.splice(rowIndex, 1);

  renderCSVPreviewTable();
}

function addCSVRow() {
  const rows = state.employeesData.csvPreviewRows || [];

  if (!rows.length) {
    return;
  }

  const headers = Object.keys(rows[0]);

  const emptyRow = {};

  headers.forEach((header) => {
    emptyRow[header] = "";
  });

  rows.push(emptyRow);

  renderCSVPreviewTable();
}

function confirmCSVData() {
  state.employeesData.csvRows = cloneRows(
    state.employeesData.csvPreviewRows || [],
  );

  const status = document.getElementById("csvRowsStatus");

  if (status) {
    status.textContent = `${state.employeesData.csvRows.length} rows imported`;
  }

  alert("CSV data confirmed.");
}

function clearCSVData() {
  const fileInput = document.getElementById("csvFileInput");

  const status = document.getElementById("csvRowsStatus");

  const filterInput = document.getElementById("csvFilterInput");

  state.employeesData.csvRows = [];
  state.employeesData.csvPreviewRows = [];
  state.employeesData.csvOriginalRows = [];
  state.employeesData.csvFilter = "";

  if (fileInput) fileInput.value = "";
  if (filterInput) filterInput.value = "";

  if (status) {
    status.textContent = "Not imported";
  }

  renderCSVPreviewTable();
}

function downloadUpdatedCSV() {
  const rows = state.employeesData.csvPreviewRows || [];
  const delimiterInput = document.getElementById("csvDelimiterInput");
  const separator = delimiterInput?.value || ",";

  if (!rows.length) {
    alert("No CSV data to download");
    return;
  }

  const headers = Object.keys(rows[0]);

  const csvContent = [
    headers.map((header) => escapeCSVValue(header, separator)).join(separator),

    ...rows.map((row) =>
      headers
        .map((header) => escapeCSVValue(row[header] ?? "", separator))
        .join(separator),
    ),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "updated-data.csv";

  link.click();

  URL.revokeObjectURL(url);
}

function escapeCSVValue(value, separator) {
  const stringValue = String(value);

  if (
    stringValue.includes(separator) ||
    stringValue.includes('"') ||
    stringValue.includes("\n") ||
    stringValue.includes("\r")
  ) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }

  return stringValue;
}

function handleCSVFilter(event) {
  state.employeesData.csvFilter = event.target.value || "";

  renderCSVPreviewTable();
}

export function bindCSVDataEvents() {
  const parseBtn = document.getElementById("parseCSVDataBtn");
  const confirmBtn = document.getElementById("confirmCSVDataBtn");
  const clearBtn = document.getElementById("clearCSVDataBtn");
  const downloadBtn = document.getElementById("downloadCSVDataBtn");
  const filterInput = document.getElementById("csvFilterInput");
  const table = document.getElementById("csvPreviewTable");
  const addRowBtn = document.getElementById("addCSVRowBtn");

  parseBtn?.addEventListener("click", parseCSVFile);
  confirmBtn?.addEventListener("click", confirmCSVData);
  clearBtn?.addEventListener("click", clearCSVData);
  downloadBtn?.addEventListener("click", downloadUpdatedCSV);
  filterInput?.addEventListener("input", handleCSVFilter);
  addRowBtn?.addEventListener("click", addCSVRow);
  table?.addEventListener("input", (event) => {
    const input = event.target.closest("[data-csv-cell]");

    if (!input) return;

    updateCSVCell(
      Number(input.dataset.rowIndex),
      input.dataset.header,
      input.value,
    );
  });
  table?.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest("[data-delete-csv-row]");

    if (!deleteBtn) return;

    deleteCSVRow(Number(deleteBtn.dataset.deleteCsvRow));
  });
}

export { renderCSVPreviewTable };
