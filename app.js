// demo vacancies
const vacancies = [
  { id:1, type:"vacancy", company:"OceanLine", rank:"AB", vessel:"Bulk Carrier", urgency:"ASAP", contact:"crew@oceanline.com", description:"Need AB urgently." },
  { id:2, type:"resume", company:"John Doe", rank:"Chief Engineer", vessel:"Tanker", urgency:"7 days", contact:"john@example.com", description:"Experienced Chief Engineer looking for contract." }
];

const state = { search:"" };

function renderVacancies(list) {
  const container = document.getElementById("vacanciesList");
  container.innerHTML = list.map(v => `
    <article class="card">
      <h3>${v.rank} — ${v.company}</h3>
      <div>${v.vessel} • ${v.urgency}</div>
      <p>${v.description}</p>
      <small>Contact: ${v.contact}</small>
    </article>
  `).join("");
}

function applyFilters() {
  const filtered = vacancies.filter(v =>
    !state.search || [v.rank,v.company,v.vessel,v.description].some(f => f.toLowerCase().includes(state.search.toLowerCase()))
  );
  renderVacancies(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("searchInput").addEventListener("input", e => {
    state.search = e.target.value.trim();
    applyFilters();
  });
  document.getElementById("resetFilters").addEventListener("click", () => {
    state.search = "";
    document.getElementById("searchInput").value = "";
    applyFilters();
  });
  applyFilters();
});
