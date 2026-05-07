import { state } from "../../state.js";

export default function renderMonthlyPreviewTable() {
  const table = document.getElementById("monthlyPreviewTable");
  const confirmBtn = document.getElementById("confirmMonthlyDataBtn");

  if (!table) return;

  const rows = state.employeesData.monthlyPreviewRows || [];

  if (!rows.length) {
    table.innerHTML = `
      <tbody>
        <tr>
          <td class="table-empty">No preview data yet</td>
        </tr>
      </tbody>
    `;

    if (confirmBtn) confirmBtn.disabled = true;
    return;
  }

  const headers = Object.keys(rows[0]);

  table.innerHTML = `
    <thead>
      <tr>
        ${headers.map((header) => `<th>${header}</th>`).join("")}
      </tr>
    </thead>
    <tbody>
      ${rows
        .map(
          (row) => `
            <tr>
              ${headers.map((header) => `<td>${row[header] ?? ""}</td>`).join("")}
            </tr>
          `,
        )
        .join("")}
    </tbody>
  `;

  if (confirmBtn) confirmBtn.disabled = false;
}
