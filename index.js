const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
const noti_bot = require('noti_bot')
//const notifyTelegram = noti_bot.telegram
const notifySlack = noti_bot.slack

let msg = process.env.SLACK_BOTNAME + " checked in :+1:"
//notifyTelegram(msg, TELEGRAM_BOT_TOKEN, TELEGRAM_TARGET_CHAT_ID)
notifySlack(msg, process.env.SLACK_HOOK_KEY, process.env.SLACK_CHANNEL, process.env.SLACK_BOTNAME, process.env.SLACK_BOT_ICON)
