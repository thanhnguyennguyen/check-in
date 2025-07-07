const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
const noti_bot = require('noti_bot')
//const notifyTelegram = noti_bot.telegram
const notifySlack = noti_bot.slack

// Validate required environment variables
const requiredEnvVars = ['PREFIX', 'SLACK_HOOK_KEY', 'SLACK_CHANNEL', 'SLACK_BOTNAME', 'SLACK_BOT_ICON'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
    console.error(`Error: Missing required environment variables: ${missingVars.join(', ')}`);
    process.exit(1);
}

let msg = `${process.env.PREFIX} \nIt's time for the afternoon check-in`
notifySlack(msg, process.env.SLACK_HOOK_KEY, process.env.SLACK_CHANNEL, process.env.SLACK_BOTNAME, process.env.SLACK_BOT_ICON)
