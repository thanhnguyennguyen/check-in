const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
const noti_bot = require('noti_bot')
//const notifyTelegram = noti_bot.telegram
const notifySlack = noti_bot.slack

let msg = `${process.env.PREFIX} Good morning ! It's check-in time`
notifySlack(msg, process.env.SLACK_HOOK_KEY, process.env.SLACK_CHANNEL, process.env.SLACK_BOTNAME, process.env.SLACK_BOT_ICON)
