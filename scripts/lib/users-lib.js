import { state } from "../state.js";

import renderUsersTable from "../components/users/usersTable.js";
import { loadJSON } from "../utils/json-loader.js";

import { openModal, closeModal } from "./modal-manager.js";

let runtimeUserCounter = 1;

function createRuntimeId() {
  return `user-${runtimeUserCounter++}`;
}

export async function initSavedUsers(path) {
  const savedUsers = await loadJSON(path);

  state.employeesData.usersBase = savedUsers.map((user) => ({
    ...user,
    runtimeId: createRuntimeId(),
  }));
}

export function getAllUsers() {
  return [
    ...state.employeesData.usersBase,
    ...state.employeesData.usersSession,
  ];
}

export function getFilteredUsers() {
  const query = state.employeesData.usersFilter.trim().toLowerCase();

  if (!query) {
    return getAllUsers();
  }

  return getAllUsers().filter((user) => {
    return (
      String(user.id).toLowerCase().includes(query) ||
      String(user.login).toLowerCase().includes(query) ||
      String(user.fullName).toLowerCase().includes(query)
    );
  });
}

function openAddEmployeeModal() {
  openModal({
    eyebrow: "Employee",
    title: "Add Employee",
    content: `
      <form
        class="modal-form"
        id="addEmployeeForm"
      >
        <label class="field">
          <span>ID</span>

          <input
            type="text"
            id="employeeIdInput"
            placeholder="e.g. 001"
          />
        </label>

        <label class="field">
          <span>Login</span>

          <input
            type="text"
            id="employeeLoginInput"
            placeholder="ivanenko.i"
          />
        </label>

        <label class="field">
          <span>Full Name</span>

          <input
            type="text"
            id="employeeFullNameInput"
            placeholder="Ivanenko Ivan"
          />
        </label>
      </form>
    `,
    actions: `
      <button
        class="button button--secondary"
        type="button"
        data-modal-close
      >
        Cancel
      </button>

      <button
        class="button"
        type="submit"
        form="addEmployeeForm"
      >
        Add Employee
      </button>
    `,
    onOpen: () => {
      document
        .getElementById("addEmployeeForm")
        ?.addEventListener("submit", addEmployee);
    },
  });
}

function closeAddEmployeeModal() {
  closeModal();
}

function checkIsUserAdded(users, newUserId, newUserLogin, newUserFullName) {
  return users.some(
    (user) =>
      user.id === newUserId ||
      user.login === newUserLogin ||
      user.fullName === newUserFullName,
  );
}

function addEmployee(event) {
  event.preventDefault();

  const idInput = document.getElementById("employeeIdInput");
  const loginInput = document.getElementById("employeeLoginInput");
  const fullNameInput = document.getElementById("employeeFullNameInput");

  const id = idInput.value.trim();
  const login = loginInput.value.trim();
  const fullName = fullNameInput.value.trim();

  if (!id || !login || !fullName) {
    alert("Please fill all fields.");
    return;
  }

  const currentUsers = getAllUsers();

  const isUserAdded = checkIsUserAdded(currentUsers, id, login, fullName);

  if (isUserAdded) {
    alert("User is currently in base");
    return;
  }

  state.employeesData.usersSession.push({
    runtimeId: createRuntimeId(),
    id,
    login,
    fullName,
  });

  closeAddEmployeeModal();
  renderUsersTable();
}

function startEditUser(runtimeId) {
  state.employeesData.editingUserRuntimeId = runtimeId;
  renderUsersTable();
}

function saveEditedUser(runtimeId) {
  const user = getAllUsers().find((item) => item.runtimeId === runtimeId);

  if (!user) return;

  const idInput = document.querySelector(`[data-edit-id="${runtimeId}"]`);
  const loginInput = document.querySelector(`[data-edit-login="${runtimeId}"]`);
  const fullNameInput = document.querySelector(
    `[data-edit-full-name="${runtimeId}"]`,
  );

  if (!idInput || !loginInput || !fullNameInput) return;

  user.id = idInput.value.trim();
  user.login = loginInput.value.trim();
  user.fullName = fullNameInput.value.trim();

  state.employeesData.editingUserRuntimeId = null;
  renderUsersTable();
}

export function downloadUsersJson() {
  const users = getAllUsers();

  const json = JSON.stringify(users.map(({ runtimeId, ...rest }) => rest));

  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "users.json";
  link.click();

  URL.revokeObjectURL(url);
}

export function bindEmployeesEvents() {
  const openModalBtn = document.getElementById("openAddEmployeeModalBtn");
  const searchInput = document.getElementById("usersSearchInput");
  const tableBody = document.getElementById("usersTableBody");
  const downloadBtn = document.getElementById("exportUsersJsonBtn");

  openModalBtn?.addEventListener("click", openAddEmployeeModal);
  downloadBtn?.addEventListener("click", downloadUsersJson);

  searchInput?.addEventListener("input", (e) => {
    state.employeesData.usersFilter = e.target.value;
    renderUsersTable();
  });

  tableBody?.addEventListener("click", (e) => {
    const editBtn = e.target.closest("[data-edit-user]");
    const saveBtn = e.target.closest("[data-save-user]");

    if (editBtn) {
      startEditUser(editBtn.dataset.editUser);
    }

    if (saveBtn) {
      saveEditedUser(saveBtn.dataset.saveUser);
    }
  });
}
