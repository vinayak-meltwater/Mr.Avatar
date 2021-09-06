const dotenv = require('dotenv')
dotenv.config()
const { App } = require('@slack/bolt');
const moment=require('moment-timezone');

const app = new App({
    token: process.env.BOT_USER_TOKEN,
    signingSecret: process.env.SIGNING_KEY,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN
  });



// Listens to incoming messages that contain "hello"
app.message(async ({ message, say }) => {
  const currentTime = new Date();
  var currentHour = moment(currentTime).tz('Asia/Kolkata').format('HH')
  console.log(currentHour);
  // console.log(today.tz('Asia/Kolkata').format('HH'));
  
  var threadTs;
  if(message.thread_ts){threadTs = message.thread_ts; }else{threadTs=message.ts;}
  // say() sends a message to the channel where the event was triggered
  
  if(currentHour<10 || currentHour >19 ){
    await say({text:`Unfortunately <@${message.user}>! your ping has come while <@spr> is offline currently. team will replay during the normal (IST) working hour
    For service-affecting issues, please page our on-call engineer for immediate response through slack /genie alert __alert_message__ for sprinters.
    `,thread_ts:threadTs});
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
