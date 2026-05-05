import { state } from "../state.js";

import renderUsersTable from "../components/users/usersTable.js";

let runtimeUserCounter = 1;

function createRuntimeId() {
  return `user-${runtimeUserCounter++}`;
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
      user.id.toLowerCase().includes(query) ||
      user.login.toLowerCase().includes(query) ||
      user.fullName.toLowerCase().includes(query)
    );
  });
}

function openAddEmployeeModal() {
  const modal = document.getElementById("addEmployeeModal");
  if (modal) modal.hidden = false;
}

function closeAddEmployeeModal() {
  const modal = document.getElementById("addEmployeeModal");
  const form = document.getElementById("addEmployeeForm");

  if (modal) modal.hidden = true;
  if (form) form.reset();
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

  console.log(currentUsers);

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

export function bindEmployeesEvents() {
  const openModalBtn = document.getElementById("openAddEmployeeModalBtn");
  const closeModalBtn = document.getElementById("closeAddEmployeeModalBtn");
  const cancelBtn = document.getElementById("cancelAddEmployeeBtn");
  const form = document.getElementById("addEmployeeForm");
  const searchInput = document.getElementById("usersSearchInput");
  const tableBody = document.getElementById("usersTableBody");

  openModalBtn?.addEventListener("click", openAddEmployeeModal);
  closeModalBtn?.addEventListener("click", closeAddEmployeeModal);
  cancelBtn?.addEventListener("click", closeAddEmployeeModal);
  form?.addEventListener("submit", addEmployee);

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
