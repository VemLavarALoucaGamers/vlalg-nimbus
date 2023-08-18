# Nimbus Contributing Guide

Hi! I'm really excited that you are interested in contributing to Nimbus. Before submitting your contribution, please make sure to take a moment and read through the following guidelines:

- [Code of Conduct](https://nimbus-vlalg.vercel.app/code-of-conduct)
- [Issue Reporting Guidelines](#issue-reporting-guidelines)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Development Setup](#development-setup)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Contributing Tests](#contributing-tests)
- [Financial Contribution](#financial-contribution)

## Issue Reporting Guidelines

- Always use [http://nimbus-sable.vercel.app/issues](http://nimbus-sable.vercel.app/issues) to create new issues.

## Pull Request Guidelines

- Checkout a topic branch from a base branch, e.g. `main`, and merge back against that branch.

- [Make sure to tick the "Allow edits from maintainers" box](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/allowing-changes-to-a-pull-request-branch-created-from-a-fork). This allows us to directly make minor edits / refactors and saves a lot of time.

- If adding a new feature:

  - Add accompanying test case.
  - Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first and have it approved before working on it.

- If fixing a bug:

  - If you are resolving a special issue, add `(fix #xxxx[,#xxxx])` (#xxxx is the issue id) in your PR title for a better release log, e.g. `update entities encoding/decoding (fix #3899)`.
  - Provide a detailed description of the bug in the PR. Live demo preferred.
  - Add appropriate test coverage if applicable. You can check the coverage of your code addition by running `nr test-coverage`.

- It's OK to have multiple small commits as you work on the PR - GitHub can automatically squash them before merging.

- Make sure tests pass!

- Commit messages must follow the [commit message convention](./commit-convention.md) so that changelogs can be automatically generated. Commit messages are automatically validated before commit (by invoking [Git Hooks](https://git-scm.com/docs/githooks)).

- No need to worry about code style as long as you have installed the dev dependencies - modified files are automatically formatted with Prettier on commit (by invoking [Git Hooks](https://git-scm.com/docs/githooks)).

### Advanced Pull Request Tips

- The PR should fix the intended bug **only** and not introduce unrelated changes. This includes unnecessary refactors - a PR should focus on the fix and not code style, this makes it easier to trace changes in the future.

- Consider the performance / size impact of the changes, and whether the bug being fixes justifies the cost. If the bug being fixed is a very niche edge case, we should try to minimize the size / perf cost to make it worthwhile.

  - Is the code perf-sensitive (e.g. in "hot paths" like component updates or the vdom patch function?)

    - If the branch is dev-only, performance is less of a concern.

  - Check how much extra bundle size the change introduces.
    - Make sure to put dev-only code in `__DEV__` branches so they are tree-shakable.
    - Runtime code is more sensitive to size increase than compiler code.
    - Make sure it doesn't accidentally cause dev-only or compiler-only code branches to be included in the runtime build.

## Development Setup

You will need [Node.js](https://nodejs.org) **version 16+**.

After cloning the repo, run:

```bash
$ pnpm i # install the dependencies of the project
```

A high level overview of tools used:

- [TypeScript](https://www.typescriptlang.org/) as the development language
- [Vite](https://vitejs.dev/) and [ESBuild](https://esbuild.github.io/) for development bundling
- [Rollup](https://rollupjs.org) for production bundling
- [Vitest](https://vitest.dev/) for unit testing
- [Prettier](https://prettier.io/) for code formatting
- [ESLint](https://eslint.org/) for static error prevention (outside of types)

## Git Hooks

The project uses git-hooks to enforce the following on each commit:

- Type check the entire project
- Automatically format changed files using Prettier
- Verify commit message format (logic in `scripts/verifyCommit.js`)

## Project Structure

This repository employs a [monorepo](https://en.wikipedia.org/wiki/Monorepo) setup which hosts a number of associated packages:

- `folder_name`: Description.

## Contributing Tests

Unit tests are collocated with the code being tested in each package, inside directories named `__tests__`. Consult the [Vitest docs](https://vitest.dev/api/) and existing test cases for how to write new test specs. Here are some additional guidelines:

- Use the minimal API needed for a test case. For example, if a test can be written without involving the reactivity system or a component, it should be written so. This limits the test's exposure to changes in unrelated parts and makes it more stable.

- If testing platform agnostic behavior or asserting low-level virtual DOM operations, use Vite Dom Plugin.

- Only use platform-specific runtimes if the test is asserting platform-specific behavior.

Test coverage is continuously deployed. PRs that improve test coverage are welcome, but in general the test coverage should be used as a guidance for finding API use cases that are not covered by tests. We don't recommend adding tests that only improve coverage but not actually test a meaning use case.

## Financial Contribution

As a pure community-driven project without major corporate backing, we also welcome financial contributions via Patreon.

- [Become a backer or sponsor on Patreon](https://www.patreon.com/nimbus-vlalg)

## Credits

Thank you to all the people who have already contributed to Nimbus!

<a href="https://github.com/VemLavarALoucaGamers/vlalg-nimbus/graphs/contributors"><img src="https://opencollective.com/nimbus/contributors.svg?width=890" /></a>
