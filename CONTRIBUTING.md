# Contributing to ImamTech Labs Open Source Projects

Thank you for considering a contribution.

## Choose a task

1. Browse the organization's public repositories.
2. Read the target repository's README and contribution instructions.
3. Check open issues and pull requests to avoid duplicating work.
4. Comment on the issue to let maintainers know you would like to work on it.

If an issue is unclear, ask for clarification before making a large change.

## Development workflow

1. Fork the relevant repository.
2. Create a focused branch for your change.
3. Make the smallest complete change that addresses the issue.
4. Follow the target project's existing style and tools.
5. Run the checks and manual tests documented by that project.
6. Commit your work with a clear message.
7. Open a pull request against the repository's `main` branch.

## Run the site checks

Before opening a pull request that changes the project hub, run:

    node --check search-utils.js
    node --check app.js
    node --test scripts/search.test.js
    python scripts/check_site.py

These checks validate JavaScript syntax, project and issue search behaviour, project profile data, local page assets, and JavaScript-to-HTML element references. GitHub Actions runs them automatically for pull requests to `main`.

## Pull request checklist

- [ ] The change addresses an existing issue or explains the problem it solves.
- [ ] The change is focused and does not include unrelated formatting or files.
- [ ] Documentation is updated where necessary.
- [ ] Relevant checks or manual tests have been run.
- [ ] No passwords, API keys, tokens, or private user data are included.
- [ ] The pull request explains the change and how it was tested.

## Pull request template

When you open a pull request, use the repository's pull request template to describe the change, link its issue, and record the checks you ran.

## Community guidelines

All contributors are expected to follow the [ImamTech Labs community guidelines](COMMUNITY_GUIDELINES.md).

## Communication

Be respectful, constructive, and patient. Maintainers may request changes or clarification before merging a contribution.

## Project-specific instructions

Each repository may have additional setup, testing, or contribution requirements. Those instructions take precedence for work on that project.
