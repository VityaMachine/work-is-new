const teamView = document.querySelector('[data-view="team"]');

export default function renderTeamPage(teams, teamId) {
  const team = teams.find((team) => team.id === teamId);

  if (!team) {
    renderNotFound();
    showView("not-found");
    return;
  }

  teamView.innerHTML = `
    <header class="page-header">
      <div>
        <h1>${team.name}</h1>
      </div>

      <a href="#/" class="button button--secondary">← Go to main</a>
    </header>

    <section class="toolbar">
      <button class="button">Import CSV</button>
      <button class="button button--secondary">Correct data</button>
      <button class="button button--success">Calculate</button>
      <button class="button button--ghost">Export CSV</button>
    </section>

    <section class="card">
      <div class="section-header">
        <div>
          <h2>Loaded team data</h2>
          <p>CSV data</p>
        </div>
      </div>

      <div class="empty-state">
        CSV not loaded
      </div>
    </section>

    <section class="card">
      <div class="section-header">
        <div>
          <h2>Calculation result</h2>
          <p>Results after calculation</p>
        </div>
      </div>

      <div class="empty-state">
        Not calculated yet
      </div>
    </section>
  `;
}
