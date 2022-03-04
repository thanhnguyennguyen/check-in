const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
const noti_bot = require('noti_bot')
//const notifyTelegram = noti_bot.telegram
const notifySlack = noti_bot.slack
const axios = require('axios').default

let msg = {
	"channel" : process.env.SLACK_CHANNEL,
	"username":  process.env.SLACK_BOTNAME,
	"blocks" : [{"type":"section","text":{"type":"mrkdwn","text":` ${process.env.PREFIX}  Kindly note that you have 30 mins left to submit yesterday <https://docs.google.com/forms/d/e/1FAIpQLSdBY1y5v1GB6VIrotj-L9GDnKEfCcYBl4-Z8xDJEfCNN7wDxw/viewform|End of Day report>`}}],
	"icon_emoji": process.env.SLACK_BOT_ICON,
	
}
let params = {
	payload: JSON.stringify(msg)
}
const data = Object.keys(params)
  .map((key, index) => `${key}=${encodeURIComponent(params[key])}`)
  .join('&');

const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data,
  url: `https://hooks.slack.com/services/${process.env.SLACK_HOOK_KEY}`,
};
const main = async () => {
	try {
		await axios(options)
	} catch(err) {
		console.error(err)
	}
}

main()
