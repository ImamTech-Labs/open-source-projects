(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.ProjectHubSearch = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function labels(issue) {
    return (issue.labels || []).map(function (label) {
      return typeof label === "string" ? label : label.name;
    });
  }

  function isBeginnerIssue(issue) {
    return labels(issue).some(function (label) {
      return /good first issue|beginner[- ]friendly|first-timers-only/i.test(label);
    });
  }

  function filterProjects(repos, profiles, query) {
    const q = String(query || "").trim().toLowerCase();
    return repos.filter(function (repo) {
      const profile = profiles[repo.name] || {};
      const searchable = [
        repo.name, profile.purpose, repo.description, repo.language,
        (profile.technologies || []).join(" ")
      ].join(" ").toLowerCase();
      return searchable.includes(q);
    });
  }

  function filterIssues(issues, query, filter) {
    const q = String(query || "").trim().toLowerCase();
    return issues.filter(function (issue) {
      const searchable = [
        issue.title, issue.repositoryName, issue.body, labels(issue).join(" ")
      ].join(" ").toLowerCase();
      return searchable.includes(q) && (filter !== "beginner" || isBeginnerIssue(issue));
    });
  }

  return { labels, isBeginnerIssue, filterProjects, filterIssues };
});
