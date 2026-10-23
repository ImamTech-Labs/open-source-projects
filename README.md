# ImamTech Labs Open Source Projects

A home for open-source projects maintained by [ImamTech Labs](https://github.com/ImamTech-Labs). This repository includes a discovery site that helps contributors explore the organization's public projects and open issues.

The goal is to make it easier for developers to collaborate, start with beginner-friendly tasks, and improve useful real-world applications together.

## Run the site locally

The site uses HTML, CSS, and JavaScript. It has no build step or package dependencies.

With Python installed, start a local static file server from this repository:

    python -m http.server 8000

Then visit http://localhost:8000. A local server avoids browser restrictions that can affect GitHub API requests when opening the HTML file directly.

## Project files

- `index.html` contains the page structure.
- `styles.css` contains the responsive design.
- `app.js` reads public repositories and open issues from the GitHub API for ImamTech-Labs.
- `project-profiles.json` adds each project's purpose, technologies, difficulty, and setup notes. Add an entry keyed by the repository name to keep its profile visible on the hub.
- `.github/ISSUE_TEMPLATE/` contains structured bug and feature request forms.
- `.github/workflows/pages.yml` publishes the static site with GitHub Pages after changes reach `main`.

The site does not need a token, database, backend service, or build process. GitHub's anonymous API rate limit applies. If live data cannot load, the page links to the organization's repositories and issue list.

## GitHub Pages

After this change is merged, open the repository's **Settings → Pages** and select **GitHub Actions** as the build and deployment source. The workflow deploys the repository root whenever `main` is updated and can also be started manually from the Actions tab. The published address will be `https://imamtech-labs.github.io/open-source-projects/` after GitHub Pages is enabled and the first deployment succeeds.

## Find a project or task

- Browse the [ImamTech Labs repositories](https://github.com/orgs/ImamTech-Labs/repositories).
- Open a project's Issues tab to see reported bugs and suggested improvements.
- Read the project README and any contribution guide before starting work.
- Issues labeled `good first issue` or `beginner-friendly` may be suitable first contributions. Ask a question in the issue if anything is unclear.

Each project has its own tools and setup steps. Follow the instructions in that project's README.

## Report a bug or suggest an improvement

Open an issue in the relevant repository. The issue forms will guide you through reporting a bug or suggesting a feature. Include a short title, what happened, what you expected, and steps to reproduce a bug. Screenshots, error messages, and environment details can help.

For a new idea, describe the problem it would solve and invite discussion before doing substantial work.

## Submit a pull request

1. Check for an existing issue or pull request about the same change.
2. Keep your change focused and follow the project's existing style.
3. Run the checks listed in that project's README.
4. Explain the change and how you checked it in the pull request.
5. Link the related issue when there is one.

For this site, keep the page responsive, accessible, and beginner-friendly. Small documentation improvements are welcome.

## License

This repository is available under the [MIT License](LICENSE).