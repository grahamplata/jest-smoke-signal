# Jest Smoke Signal

A Jest reporter that shares it's results with a slack channel via webhooks

- [Jest Smoke Signal](#jest-smoke-signal)
  - [Highlights](#highlights)
  - [Install](#install)
  - [Usage](#usage)

## Highlights

- Report your jest results as Slack Notifications [Slack Web Hooks](https://api.slack.com/messaging/webhooks)

## Install

Following [GitHub's Guide](https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages#installing-a-package) for npm packages hosted here

In the same directory as your package.json file, create or edit an .npmrc
```sh
registry=https://npm.pkg.github.com/grahamplata
```
> By default, you can only use GitHub Packages packages from one organization. If you'd like to route package requests to multiple organizations and users, you can add additional lines to your .npmrc file, replacing OWNER with the name of the user or organization account that owns the repository containing your project.
> ```
> registry=https://npm.pkg.github.com/OWNER
> @OWNER:registry=https://npm.pkg.github.com
> @OWNER:registry=https://npm.pkg.github.com
> ```

```sh
npm install --save-dev jest-smoke-signal
# or
yarn add -D jest-smoke-signal
```

## Usage

- You will need to create an incoming webhook for [Slack](https://api.slack.com/messaging/webhooks)
- Add reporter to the jest.config.ts / jest.config.js
- Set Enviroment Variables

```json
// jest.config.ts / jest.config.js
{
  "reporters": ["default", "jest-smoke-signal"]
}
```

```shell
# .env
SLACK_BLOCK_TITLE=Tests
SLACK_CHANNEL=#my-test-channel
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXXXXXXXXXXXX/YYYYYYYYYYYY
```

```sh
# shell
jest feature.test.js
```
