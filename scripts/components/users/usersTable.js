import { state } from "../../state.js";
import { getFilteredUsers } from "../../lib/users-lib.js";

export default function renderUsersTable() {
  const tableBody = document.getElementById("usersTableBody");

  if (!tableBody) return;

  const users = getFilteredUsers();

  if (users.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" class="table-empty">No employees found</td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = users
    .map((user) => {
      const isEditing =
        state.employeesData.editingUserRuntimeId === user.runtimeId;

      if (isEditing) {
        return `
          <tr>
            <td>
              <input 
                class="table-input" 
                type="text" 
                value="${user.id}" 
                data-edit-id="${user.runtimeId}" 
              />
            </td>
            <td>
              <input 
                class="table-input" 
                type="text" 
                value="${user.login}" 
                data-edit-login="${user.runtimeId}" 
              />
            </td>
            <td>
              <input 
                class="table-input" 
                type="text" 
                value="${user.fullName}" 
                data-edit-full-name="${user.runtimeId}" 
              />
            </td>
            <td>
              <button 
                class="button button--success button--small" 
                data-save-user="${user.runtimeId}"
              >
                Save
              </button>
            </td>
          </tr>
        `;
      }

      return `
        <tr>
          <td>${user.id}</td>
          <td>${user.login}</td>
          <td>${user.fullName}</td>
          <td>
            <button 
              class="button button--secondary button--small" 
              data-edit-user="${user.runtimeId}"
            >
              Edit
            </button>
          </td>
        </tr>
      `;
    })
    .join("");
}
