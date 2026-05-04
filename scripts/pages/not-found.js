const notFoundView = document.querySelector('[data-view="not-found"]');

export default function renderNotFoundPage() {
  notFoundView.innerHTML = `
    <section class="card">
      <h1>Page not found</h1>
      <p>Check page or return on main.</p>
      <a href="#/" class="button">Go to main</a>
    </section>
  `;
}
