const dotenv = require('dotenv')
dotenv.config()
const { App } = require('@slack/bolt');

const app = new App({
    token: process.env.BOT_USER_TOKEN,
    signingSecret: process.env.SIGNING_KEY,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN
  });

const currentTime = new Date().toTimeString();

// Listens to incoming messages that contain "hello"
app.message(async ({ message, say }) => {
    console.log("got message");
  var threadTs;
  if(message.thread_ts){threadTs = message.thread_ts; }else{threadTs=message.ts;}
  // say() sends a message to the channel where the event was triggered
  
  await say({text:`Hey there <@${message.user}>!`,thread_ts:threadTs});
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
