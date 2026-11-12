# ImamTech Labs — Project Roadmap

This roadmap describes the work maintainers intend to prioritize across the public repositories. It is a living plan: priorities may change after contributor feedback, testing, and real user needs.

## Current projects

| Project | Purpose | Current status |
|---|---|---|
| [Open Source Projects Hub](https://github.com/ImamTech-Labs/open-source-projects) | Discover ImamTech Labs repositories and contributor tasks | Live on GitHub Pages; quality checks run before deployment |
| [MahMah Naturals](https://github.com/ImamTech-Labs/mahmah-naturals) | Product storefront with cart, delivery estimates, and WhatsApp order handoff | Static storefront; WhatsApp orders are active, online payment is not connected |

## Priorities

### Open Source Projects Hub

1. **Contributor discovery** — improve search, language/topic filters, sorting, and project detail links. See [open hub issues](https://github.com/ImamTech-Labs/open-source-projects/issues).
2. **First-contribution experience** — make setup, issue selection, contribution expectations, and review steps easier to understand.
3. **Reliability** — provide clear feedback and resilient behaviour when GitHub's public API is unavailable or rate-limited.
4. **Quality and accessibility** — keep automated checks, responsive layouts, keyboard navigation, and accessible labels in place.

### MahMah Naturals

1. **Reliable shopping bag** — handle old or invalid saved cart data safely and keep displayed product information consistent with the current catalogue.
2. **Accessible checkout experience** — improve keyboard and screen-reader interaction in the cart drawer.
3. **Product catalogue growth** — add products only when the shop has confirmed product names, photos, prices, and availability.
4. **Order-flow quality** — keep delivery fees and WhatsApp order summaries accurate and testable.

## How priorities are chosen

- Fix correctness, privacy, accessibility, and security problems before cosmetic enhancements.
- Prefer work that solves a demonstrated user or contributor problem.
- Keep tasks small enough to review and test.
- Do not label work as beginner-friendly unless the scope and prerequisites genuinely suit a new contributor.
- Payment processing is not considered live until a complete, secure, tested payment flow is connected to the customer storefront.

## How to contribute

1. Open the relevant repository's Issues tab.
2. Read the issue, README, and contribution guide.
3. Comment before starting so a maintainer can confirm the task is still available.
4. Submit a focused pull request with tests or manual verification notes.

Roadmap status is not a promise of a delivery date. Maintainers will update this document as work is completed or priorities change.
