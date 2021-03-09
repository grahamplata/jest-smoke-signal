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

```sh
npm install --save-dev github:grahamplata/jest-smoke-signal
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
