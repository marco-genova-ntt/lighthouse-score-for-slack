# Slack Bot to publish Google Lighthouse performances KPI
[![Build Status](https://travis-ci.org/marco-genova-ntt/lighthouse-score-for-slack.svg?branch=master)](https://travis-ci.org/marco-genova-ntt/lighthouse-score-for-slack)

The idea behind this project is to produce a NODEJS module to publish a card on a Slack Chat. _Example_:

![Slack Attachment](https://github.com/marco-genova-ntt/lighthouse-score-for-slack/blob/master/assets/img/card.png)

A valid example of usage is here: https://github.com/marco-genova-ntt/lighthouse-ci

## Technological Stack
* NodeJS 8+
* Babel 7
* Jest
* Dotenv

The project is ES6-based.

## Integration with Slack
In order to enable the integration with slack channel, a Slack Apps was created to create. Actually it's not published.
The name of the slack app is "LightHouse Score Publisher".

**NOTE**: In order to publish in a channel it's important to retrive an OAUTH token from slack you can create a non redistribuable application and use the bot token:

![Slack Bot OAUTH Token](https://github.com/marco-genova-ntt/lighthouse-score-for-slack/blob/master/assets/img/token.png)

## How to define _.env_ in the project

The following properties can be added to an existent _.env_ file:

```
#Slack token for the slack client, An access token (from your Slack app or custom integration - xoxp, xoxb)
SLACK_TOKEN=xoxb-.....,

#Slack channel identifier, use Web API simulator to extract this value (https://api.slack.com/methods/conversations.list)
SLACK_CHANNEL_ID=C6H41XTRU

#Base api url, use this for the actual version of api
SLACK_BASE_API=https://slack.com/api/{method}?token={token}&pretty=1
```

## References
1. https://nttdataclickcollect.slack.com/apps
2. https://api.slack.com/custom-integrations/web
