import { state } from "../state.js";
import { parsePastedTable } from "../utils/table-parser.js";
import renderMonthlyPreviewTable from "../components/users/monthlyPreviesTable.js";

function parseMonthlyData() {
  const textarea = document.getElementById("monthlyDataTextarea");

  if (!textarea) return;

  const rows = parsePastedTable(textarea.value);

  if (!rows.length) {
    alert("No valid data found. Make sure the first row contains headers.");
    return;
  }

  state.employeesData.monthlyPreviewRows = rows;
  renderMonthlyPreviewTable();
}

function confirmMonthlyData() {
  state.employeesData.monthlyRows = [
    ...(state.employeesData.monthlyPreviewRows || []),
  ];

  const status = document.getElementById("monthlyRowsStatus");

  if (status) {
    status.textContent = `${state.employeesData.monthlyRows.length} rows imported`;
  }

  alert("Monthly data confirmed.");
}

function clearMonthlyData() {
  const textarea = document.getElementById("monthlyDataTextarea");
  const status = document.getElementById("monthlyRowsStatus");

  state.employeesData.monthlyPreviewRows = [];
  state.employeesData.monthlyRows = [];

  if (textarea) textarea.value = "";
  if (status) status.textContent = "Not imported";

  renderMonthlyPreviewTable();
}

export function bindMonthlyDataEvents() {
  const parseMonthlyBtn = document.getElementById("parseMonthlyDataBtn");
  const confirmMonthlyBtn = document.getElementById("confirmMonthlyDataBtn");
  const clearMonthlyBtn = document.getElementById("clearMonthlyDataBtn");

  parseMonthlyBtn?.addEventListener("click", parseMonthlyData);
  confirmMonthlyBtn?.addEventListener("click", confirmMonthlyData);
  clearMonthlyBtn?.addEventListener("click", clearMonthlyData);
}
