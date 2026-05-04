const dashboardView = document.querySelector('[data-view="dashboard"]');

export default function renderDashboardPage(teams) {
  dashboardView.innerHTML = `
    <header class="page-header">
      <div>
        <h1>Inscentive scheme calculation tool</h1>
        <p class="page-description">
          Check global params, select period and team, upload data, make corrections and get result
        </p>
      </div>
    </header>

    <section class="card">
      <h2>Calculation period</h2>

      <div class="form-grid">
        <label class="field">
          <span>Year and month</span>
          <input type="month" />
        </label>
      </div>
    </section>

    <section class="card">
      <div class="section-header">
        <div>
          <h2>Teams</h2>
          <p>Select team for start calculation</p>
        </div>
      </div>

      <div class="team-grid">
        ${teams
          .map(
            (team) => `
              <a href="#/team/${team.id}" class="team-card">
                <h3>${team.name}</h3>
                <span>Start calculation →</span>
              </a>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}
