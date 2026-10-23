# ImamTech Labs Open Source Projects

A home for open-source projects maintained by [ImamTech Labs](https://github.com/ImamTech-Labs). This repository includes a small discovery site that helps contributors explore the organization's public projects and open issues.

The goal is to make it easier for developers to collaborate, start with beginner-friendly tasks, and improve useful real-world applications together.

## Run the site locally

The site is made with HTML, CSS, and JavaScript. It has no build step or package dependencies.

Open a terminal in this repository and start a local static file server. With Python installed, run:

    python -m http.server 8000

Then visit http://localhost:8000.

A local server avoids browser restrictions that may affect GitHub API requests when opening the HTML file directly.

## Project files

- index.html contains the page content and structure.
- styles.css contains the responsive design.
- app.js reads public repositories and open issues from the GitHub API for ImamTech-Labs.

The site does not need a token, database, or backend service. GitHub's anonymous API rate limit applies. If live data cannot load, the page links to the organization's repositories and issue list.

## Find a project or task

- Browse the [ImamTech Labs repositories](https://github.com/orgs/ImamTech-Labs/repositories).
- Open a project's Issues tab to see reported bugs and suggested improvements.
- Read the project README and any contribution guide before starting work.
- Issues labeled good first issue or beginner-friendly may be suitable first contributions. Ask a question in the issue if anything is unclear.

Each project has its own tools and setup steps. Follow the instructions in that project's README.

## Report a bug or suggest an improvement

Open an issue in the relevant repository. Include a short title, what happened, what you expected, and steps to reproduce a bug. Screenshots, error messages, and environment details can help.

For a new idea, describe the problem it would solve and invite discussion before doing substantial work.

## Submit a pull request

1. Check for an existing issue or pull request about the same change.
2. Keep your change focused and follow the project's existing style.
3. Run the checks listed in that project's README.
4. Explain the change and how you checked it in the pull request.
5. Link the related issue when there is one.

For this site, keep the page responsive, accessible, and beginner-friendly. Small documentation improvements are welcome.

