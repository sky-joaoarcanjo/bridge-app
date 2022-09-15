const bp = require('body-parser')
const service = require('./service')
const request = require('./ALRequest')

module.exports = function(app) {
    app.use(bp.json())
    app.use(bp.urlencoded({ extended: true }))

    app.get('/', (req, res) => {
        console.log('===== Node server is active =====')
        res.send('Node server is active!')
    });

    app.post('/webhook', (req, res) => {
        console.log('==== Webhook request received ====')
        console.log(`Content-type: ${req.headers['content-type']}`) 
        console.log(`Body:`, req.body)

        request.sendAlert(service.messageBuilder(req.body))
            .then(response => {
                console.log(`Alert manager response: `, response)
                res.send(response)
            })
    })
}