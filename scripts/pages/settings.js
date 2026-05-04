const settingsView = document.querySelector('[data-view="settings"]');

export default function renderSettingsPage() {
  settingsView.innerHTML = `
    <header class="page-header">
      <div>
        <h1>Global params</h1>
        <p class="page-description">
          Global params like a calculating multipliers
        </p>
      </div>
    </header>

    <section class="card">
      <div class="empty-state">
        Params not added
      </div>
    </section>
  `;
}
