const modalRoot = document.getElementById("modalRoot");

export function closeModal() {
  if (!modalRoot) return;

  modalRoot.innerHTML = "";

  document.body.classList.remove("modal-open");

  document.removeEventListener("keydown", handleEscapeClose);
}

function handleEscapeClose(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

export function openModal({
  title = "",
  eyebrow = "",
  content = "",
  actions = "",
  onOpen = null,
}) {
  if (!modalRoot) return;

  closeModal();

  modalRoot.innerHTML = `
    <div class="modal-backdrop" data-modal-backdrop>
      <div
        class="modal"
        role="dialog"
        aria-modal="true"
      >
        <div class="modal__header">
          <div>
            ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}

            <h2>${title}</h2>
          </div>

          <button
            class="icon-button"
            type="button"
            data-modal-close
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div class="modal__body">
          ${content}

          ${
            actions
              ? `
                <div class="modal__actions">
                  ${actions}
                </div>
              `
              : ""
          }
        </div>
      </div>
    </div>
  `;

  document.body.classList.add("modal-open");

  document.addEventListener("keydown", handleEscapeClose);

  const backdrop = modalRoot.querySelector("[data-modal-backdrop]");

  const closeButtons = modalRoot.querySelectorAll("[data-modal-close]");

  backdrop?.addEventListener("click", (event) => {
    if (event.target === backdrop) {
      closeModal();
    }
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  if (typeof onOpen === "function") {
    onOpen();
  }
}
