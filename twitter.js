import { TwitterClient } from 'twitter-api-client';

const twitterClient = new TwitterClient({
  apiKey: '<YOUR-TWITTER-API-KEY>',
  apiSecret: '<YOUR-TWITTER-API-SECRET>',
  accessToken: '<YOUR-TWITTER-ACCESS-TOKEN>',
  accessTokenSecret: '<YOUR-TWITTER-ACCESS-TOKEN-SECRET>',
});

// Search for a user
const data = await twitterClient.accountsAndUsers.usersSearch({ q: 'twitterDev' });

// Get message event by Id
const data = await twitterClient.directMessages.directMessagesEventsShow({ id: '1234' });

// Get most recent 25 retweets of a tweet
const data = await twitterClient.tweets.statusesRetweetsById({ id: '12345', count: 25 });

// Get local trends
const data = await twitterClient.trends.trendsAvailable();