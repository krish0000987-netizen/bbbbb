
import https from 'https';

// IMPORTANT: Change this to your real Render URL after you deploy
const URL = process.env.APP_URL || 'https://brilliant-bulls.onrender.com';
const APP_URL = `${URL}/api/health`;

console.log(`🚀 Starting Keep-Alive pinger for: ${APP_URL}`);
console.log('Press Ctrl+C to stop.');

function ping() {
    https.get(APP_URL, (res) => {
        const time = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
        console.log(`[${time}] Ping success: Status ${res.statusCode}`);
    }).on('error', (err) => {
        const time = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
        console.error(`[${time}] Ping failed: ${err.message}`);
    });
}

// Ping every 10 minutes (600,000 ms)
ping();
setInterval(ping, 600000);
