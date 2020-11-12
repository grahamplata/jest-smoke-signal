// index.ts

// Helpful Docs
// https://api.slack.com/messaging/webhooks#advanced_message_formatting
// https://jestjs.io/docs/en/configuration#reporters-arraymodulename--modulename-options

import { Context, Reporter } from '@jest/reporters'
import { AggregatedResult, TestResult } from '@jest/test-result'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

import config from './config'

// Load ENV variables
dotenv.config()

/**
* A Slack Jest Reporter interface
* Implements Reporter interface
* readonly onRunComplete: (contexts: Set<Context>, results: AggregatedResult) => Promise<void> | void;
*/
class Slack implements Pick<Reporter, 'onRunComplete'> {

  /**
  * Generate Slack Block Header
  */
  generateHeader() {
    const webHook = config.SlackBlockTitle

    return [
      {
        type: 'section',
        text: {
          'type': 'mrkdwn',
          'text': `${webHook}`
        }
      },
    ]
  }

  /**
  * Generate Slack Block Footer
  */
  generateFooter() {
    return [
      { type: 'divider' },
      {
        type: 'context',
        elements: [{ type: 'mrkdwn', text: `Report generated on ${new Date().toLocaleString('en-US')}` }]
      },
    ]
  }

  /**
  * Format Test Failures
  * * @param suite
  */
  formatTestFailures(suite: TestResult) {
    const failedTests = [];
    for (const test of suite.testResults) {
      if (test.status === 'failed') {
        const failedTest = `\`${test.fullName}\`\n\t✕ \`${test.title}\``;
        failedTests.push(failedTest);
      }
    }
    return failedTests.join();
  }

  /**
  * Get the name of the file where a test suite failed
  * * @param suite
  */
  getTestSuiteName(suite: string) {
    const filePath = suite.split('/');
    const fileName = filePath.slice(-1).pop();
    return fileName;
  }

  /**
  * Generate Slack Block Error Report
  * * @param results
  */
  generateErrors(results: AggregatedResult) {
    const slackBlocks = [];
    for (const suite of results.testResults) {
      if (suite.numFailingTests !== 0) {
        slackBlocks.push(
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Test Suite* \`${this.getTestSuiteName(
                suite.testFilePath
              )}\` ${suite.numFailingTests} failing, ${suite.numPassingTests
                } passing\n ${this.formatTestFailures(suite)}`,
            },
          },
          {
            type: 'divider',
          }
        );
      }
    }
    return slackBlocks;
  }

  /**
  * Event hook for onRunComplete, triggered on completion of Jest testing
  * Implements Reporter interface
  * readonly onRunComplete: (contexts: Set<Context>, results: AggregatedResult) => Promise<void> | void;
  * @param _
  * @param results
  */
  async onRunComplete(_: Set<Context>, results: AggregatedResult) {

    const webHook = config.SlackWebhookUrl
    if (!webHook) {
      throw new Error('Please add a SLACK_WEBHOOK_URL environment variable.');
    }

    const channel = config.SlackChannel
    if (!channel) {
      throw new Error('Please add a SLACK_CHANNEL environment variable.');
    }

    const slackPayload = {
      channel: channel,
      blocks: [
        ...this.generateHeader(),
        ...this.generateErrors(results),
        ...this.generateFooter(),
      ]
    };

    await fetch(webHook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(slackPayload)
    });
  }
}

export default Slack
