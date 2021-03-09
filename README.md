# Jest Slack Reporter

A Jest reporter that shares it's results with a slack channel via webhooks

- [Jest Slack Reporter](#jest-slack-reporter)
  - [Highlights](#highlights)
  - [Install](#install)
  - [Usage](#usage)

## Highlights

- Report your jest results as Slack Notifications [Slack Web Hooks](https://api.slack.com/messaging/webhooks)

## Install

```sh
npm install --save-dev jest-slack-reporter
# or
yarn add -D jest-slack-reporter
```

## Usage

- You will need to create an incoming webhook for [Slack](https://api.slack.com/messaging/webhooks)
- Add reporter to the jest.config.ts / jest.config.js
- Set Enviroment Variables

```json
// jest.config.ts / jest.config.js
{
  "reporters": ["default", "jest-slack-reporter"]
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
