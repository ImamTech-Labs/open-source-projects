"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  labels,
  isBeginnerIssue,
  filterProjects,
  filterIssues
} = require("../search-utils.js");

const projects = [
  { name: "alpha-store", description: "Online shop", language: "JavaScript" },
  { name: "docs-site", description: "Documentation portal", language: "HTML" }
];
const profiles = {
  "alpha-store": { purpose: "A cosmetics storefront", technologies: ["HTML", "CSS"] },
  "docs-site": { purpose: "Guides for contributors", technologies: ["Markdown"] }
};

test("project search matches repository name", () => {
  assert.deepEqual(filterProjects(projects, profiles, "alpha-store").map(x => x.name), ["alpha-store"]);
});

test("project search matches profile purpose", () => {
  assert.deepEqual(filterProjects(projects, profiles, "cosmetics").map(x => x.name), ["alpha-store"]);
});

test("project search matches language and technologies", () => {
  assert.deepEqual(filterProjects(projects, profiles, "html").map(x => x.name), ["alpha-store", "docs-site"]);
});

test("project search is case-insensitive and trims whitespace", () => {
  assert.equal(filterProjects(projects, profiles, "  ONLINE SHOP ").length, 1);
});

test("project search returns an empty array when nothing matches", () => {
  assert.deepEqual(filterProjects(projects, profiles, "not-present"), []);
});

test("issue labels support strings and GitHub label objects", () => {
  assert.deepEqual(labels({ labels: ["bug", { name: "good first issue" }] }), ["bug", "good first issue"]);
});

test("beginner issue detection recognises supported labels", () => {
  assert.equal(isBeginnerIssue({ labels: [{ name: "good first issue" }] }), true);
  assert.equal(isBeginnerIssue({ labels: ["beginner-friendly"] }), true);
  assert.equal(isBeginnerIssue({ labels: ["bug"] }), false);
});

test("issue filtering combines text search with beginner filter", () => {
  const issues = [
    { title: "Improve search", repositoryName: "hub", body: "Search projects", labels: ["good first issue"] },
    { title: "Fix checkout", repositoryName: "store", body: "Checkout error", labels: ["bug"] }
  ];
  assert.equal(filterIssues(issues, "search", "beginner").length, 1);
  assert.equal(filterIssues(issues, "checkout", "beginner").length, 0);
  assert.equal(filterIssues(issues, "checkout", "all").length, 1);
});

test("issue filtering safely handles missing optional fields and empty results", () => {
  assert.deepEqual(filterIssues([{ title: "Simple issue" }], "missing", "all"), []);
  assert.deepEqual(filterIssues([], "", "all"), []);
});
