const axios = require('axios');

const alertManagerURL = process.env.ALERT_MANAGER_URL 

async function sendAlert(data) {
    return await axios
        .post(alertManagerURL, data)
        .then(res => res.data)
        .catch(error => console.error(error));
}

module.exports = {
    sendAlert
}