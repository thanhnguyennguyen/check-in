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

// Validate required environment variables
const requiredEnvVars = ['LAT', 'LON', 'WEATHER_API_KEY', 'SLACK_HOOK_KEY', 'SLACK_CHANNEL', 'SLACK_BOTNAME', 'SLACK_BOT_ICON'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
    console.error(`Error: Missing required environment variables: ${missingVars.join(', ')}`);
    process.exit(1);
}

const main = async () => {
    try {
        // Properly encode URL parameters to prevent injection attacks
        const encodedLat = encodeURIComponent(lat);
        const encodedLon = encodeURIComponent(lon);
        const encodedKey = encodeURIComponent(key);
        let res = await getJSON(`http://api.openweathermap.org/data/2.5/onecall?lat=${encodedLat}&lon=${encodedLon}&appid=${encodedKey}&exclude=minutely,daily`, '', {}, 10000)
        
        // Validate API response structure before accessing data
        if (!res || !res.data || !res.data.hourly || !Array.isArray(res.data.hourly) || res.data.hourly.length < 3) {
            console.error('Error: Invalid or incomplete weather data received from API');
            return;
        }
        
        const hourlyData = res.data.hourly[2];
        if (!hourlyData || !hourlyData.weather || !Array.isArray(hourlyData.weather) || hourlyData.weather.length === 0) {
            console.error('Error: Weather information not available for the requested time');
            return;
        }
        
        const weatherCondition = hourlyData.weather[0].main;
        console.log(`Weather condition in 2 hours: ${weatherCondition}`);
        
        if (weatherCondition === 'Rain') {
            let msg = " em xin phép đến muộn 1h ạ  "
            notifySlack(msg, process.env.SLACK_HOOK_KEY, process.env.SLACK_CHANNEL, process.env.SLACK_BOTNAME, process.env.SLACK_BOT_ICON)
        }
    } catch (error) {
        console.error('Error fetching weather data or sending notification:', error.message);
    }
}
main()
