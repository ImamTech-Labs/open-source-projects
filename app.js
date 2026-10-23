const ORG = "ImamTech-Labs";
const API = "https://api.github.com";
const state = { repos: [], issues: [], filter: "all", query: "" };
const grid = document.querySelector("#project-grid");
const issueList = document.querySelector("#issue-list");
const search = document.querySelector("#search");
document.querySelector("#year").textContent = new Date().getFullYear();

async function github(path) {
  const response = await fetch(API + path, { headers: { Accept: "application/vnd.github+json" } });
  if (!response.ok) throw new Error(response.status === 403 || response.status === 429 ? "GitHub is temporarily limiting requests." : "GitHub returned " + response.status + ".");
  return response.json();
}
function safe(value) {
  return String(value || "").replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
function labels(issue) { return (issue.labels || []).map(function (label) { return typeof label === "string" ? label : label.name; }); }
function beginner(issue) { return labels(issue).some(function (label) { return /good first issue|beginner[- ]friendly|first-timers-only/i.test(label); }); }
function date(value) { return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(new Date(value)); }

function renderProjects() {
  const q = state.query.toLowerCase();
  const found = state.repos.filter(function (repo) { return (repo.name + " " + (repo.description || "") + " " + (repo.language || "")).toLowerCase().includes(q); });
  document.querySelector("#stat-projects").textContent = state.repos.length;
  document.querySelector("#project-count").textContent = found.length + (found.length === 1 ? " project" : " projects");
  if (!found.length) {
    grid.innerHTML = '<div class="empty">No projects match “' + safe(state.query) + '”. Try another search or <a href="https://github.com/orgs/' + ORG + '/repositories">browse the organization on GitHub</a>.</div>';
    return;
  }
  grid.innerHTML = found.map(function (repo) {
    return '<article class="project-card"><div class="card-top"><span class="project-icon" aria-hidden="true">⌘</span><span class="language"><i></i>' + safe(repo.language || "Open source") + '</span></div><h3><a href="' + safe(repo.html_url) + '" target="_blank" rel="noreferrer">' + safe(repo.name) + ' <span class="arrow">↗</span></a></h3><p>' + safe(repo.description || "An ImamTech Labs open-source project. Visit the repository to learn more and get involved.") + '</p><div class="meta"><span>☆ ' + Number(repo.stargazers_count || 0).toLocaleString() + '</span><span>⑂ ' + Number(repo.forks_count || 0).toLocaleString() + '</span><span class="open">' + Number(repo.open_issues_count || 0) + ' open issues</span></div></article>';
  }).join("");
}
function renderIssues() {
  const q = state.query.toLowerCase();
  let found = state.issues.filter(function (issue) {
    const text = (issue.title + " " + issue.repositoryName + " " + (issue.body || "") + " " + labels(issue).join(" ")).toLowerCase();
    return text.includes(q) && (state.filter !== "beginner" || beginner(issue));
  });
  found.sort(function (a, b) { return Number(beginner(b)) - Number(beginner(a)) || new Date(b.updated_at) - new Date(a.updated_at); });
  document.querySelector("#stat-issues").textContent = state.issues.length;
  document.querySelector("#stat-beginner").textContent = state.issues.filter(beginner).length;
  if (!found.length) {
    const note = state.filter === "beginner" ? 'No open issues have a beginner-friendly label yet. Browse all <a href="https://github.com/orgs/' + ORG + '/issues">open issues on GitHub</a>.' : 'No issues match “' + safe(state.query) + '”. Try another search.';
    issueList.innerHTML = '<div class="issues-empty">' + note + '</div>';
    return;
  }
  issueList.innerHTML = found.slice(0, 18).map(function (issue) {
    const tags = labels(issue).slice(0, 3).map(function (label) { return '<span class="label ' + (/good first issue|beginner/i.test(label) ? "beginner" : "") + '">' + safe(label) + '</span>'; }).join("");
    return '<article class="issue-row"><span class="issue-num">#' + issue.number + '</span><div><h3 class="issue-title"><a href="' + safe(issue.html_url) + '" target="_blank" rel="noreferrer">' + safe(issue.title) + '</a></h3><div class="issue-meta"><span>' + safe(issue.repositoryName) + '</span><span>·</span><span>updated ' + date(issue.updated_at) + '</span>' + tags + '</div></div><a class="issue-cta" href="' + safe(issue.html_url) + '" target="_blank" rel="noreferrer">View issue ↗</a></article>';
  }).join("");
}
async function loadIssues() {
  const batches = await Promise.all(state.repos.slice(0, 12).map(async function (repo) {
    try {
      const issues = await github("/repos/" + ORG + "/" + encodeURIComponent(repo.name) + "/issues?state=open&per_page=30");
      return issues.filter(function (item) { return !item.pull_request; }).map(function (item) { item.repositoryName = repo.name; return item; });
    } catch (error) { return []; }
  }));
  state.issues = batches.flat();
  renderIssues();
  document.querySelector("#issue-message").textContent = state.repos.length > 12 ? "Showing issues from the 12 most recently updated public projects." : "Issue details update from GitHub when you visit this page.";
}
async function load() {
  try {
    const repos = await github("/orgs/" + ORG + "/repos?type=public&sort=updated&per_page=100");
    state.repos = repos.filter(function (repo) { return !repo.archived && !repo.fork; });
    renderProjects();
    document.querySelector("#project-message").textContent = "Project details update from GitHub when you visit this page.";
    loadIssues().catch(function (error) {
      issueList.innerHTML = '<div class="issues-empty">' + safe(error.message) + ' Browse <a href="https://github.com/orgs/' + ORG + '/issues">open issues on GitHub</a>.</div>';
    });
  } catch (error) {
    grid.innerHTML = '<div class="empty">' + safe(error.message) + ' <a href="https://github.com/orgs/' + ORG + '/repositories">Browse ImamTech Labs repositories on GitHub ↗</a></div>';
    document.querySelector("#project-count").textContent = "Projects unavailable";
    document.querySelector("#stat-projects").textContent = "—";
    issueList.innerHTML = '<div class="issues-empty">Open the <a href="https://github.com/orgs/' + ORG + '/issues">ImamTech Labs issue list on GitHub ↗</a> to see current tasks.</div>';
    document.querySelector("#stat-issues").textContent = "—";
    document.querySelector("#stat-beginner").textContent = "—";
  }
}
search.addEventListener("input", function () { state.query = search.value.trim(); renderProjects(); renderIssues(); });
document.querySelectorAll(".filter").forEach(function (button) {
  button.addEventListener("click", function () {
    state.filter = button.dataset.filter;
    document.querySelectorAll(".filter").forEach(function (item) { item.classList.toggle("active", item === button); });
    renderIssues();
  });
});
document.addEventListener("keydown", function (event) {
  if (event.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") { event.preventDefault(); search.focus(); }
  if (event.key === "Escape" && document.activeElement === search) { search.value = ""; state.query = ""; renderProjects(); renderIssues(); search.blur(); }
});
load();

