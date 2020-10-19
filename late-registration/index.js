const getJSON = require('fetch-json-data')
const path = require('path')
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
})
const noti_bot = require('noti_bot')
const notifySlack = noti_bot.slack

const lat = process.env.LAT
const lon = process.env.LON
const key = process.env.WEATHER_API_KEY


const main = async () => {
    let res = await getJSON('http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + key+'&exclude=minutely,daily', '', {}, 5000)
    if (res.data.hourly[2].weather[0].main == 'Rain') {
        let msg = " em xin phép đến muộn 1h ạ :thunder_cloud_and_rain: "
        notifySlack(msg, process.env.SLACK_HOOK_KEY, process.env.SLACK_CHANNEL, process.env.SLACK_BOTNAME, process.env.SLACK_BOT_ICON)

    }
}
main()
