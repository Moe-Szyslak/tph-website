const express = require('express');
const fetch = require('node-fetch');
const btoa = require('btoa');
const { catchAsync } = require('../utils');

const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const BOT_TOKEN = process.env.BOT_TOKEN;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const redirect = encodeURIComponent('http://localhost:50451/api/discord/callback');

router.get('/login', (req, res) => {
  res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`);
});

router.get('/callback', catchAsync(async (req, res) => {
  if (!req.query.code) throw new Error('NoCodeProvided');
  const code = req.query.code;
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${creds}`,
      },
    });
  const json = await response.json();
  console.log(json)
  res.redirect(`/?token=${json.access_token}`);

  const fetchDiscordUserInfo = await fetch('https://discordapp.com/api/users/@me', {
  headers: {
    Authorization: `Bearer ${json.access_token}`,
  }

});
const userInfo = await fetchDiscordUserInfo.json();
const user = userInfo.id
const authorize = `Bot ${bot_token}`
const banResponse = await fetch(`https://discordapp.com/api/guilds/438424678630162453/bans/${user}`,
{
  headers: {
    Authorization:  authorize,
  }})
const myResult = await banResponse.json();
console.log(myResult)
}));


module.exports = router;



