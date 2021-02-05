const OAuth = require('oauth')
const got = require('got')
const { promisify } = require('util')

getTwitterUserProfileWithOAuth2('twitterdev')
  .then((profile) => console.log('oauth2 response', JSON.stringify(profile, null, 2)) && process.exit(0))
  .catch(err => console.error(err) && process.exit(1))


async function getTwitterUserProfileWithOAuth2 (username = 'twitterdev') {
  var oauth2 = new OAuth.OAuth2(
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    'https://api.twitter.com/', null, 'oauth2/token', null
  )
  const getOAuthAccessToken = promisify(oauth2.getOAuthAccessToken.bind(oauth2))
  const accessToken = await getOAuthAccessToken('', { grant_type: 'client_credentials' })

  return got(`https://api.twitter.com/1.1/users/show.json?screen_name=${username}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then((res) => JSON.parse(res.body))
}