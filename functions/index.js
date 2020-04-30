const functions = require('firebase-functions');
const axios = require('axios')
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: true
}));


app.get('/', async (req, res) => {
    const url = req.query.url
    if (!url) {
        res.status(400).send('GET, No url present')
        return
    }
    try {
        const result = await axios.get(url)
        console.log('result', result)
        res.status(200).send(result.data)
    } catch (err) {
        console.log('err', err)
    }
});

app.post('/', async (req, res) => {
    const url = req.query.url
    console.log('url', url)
    if (!url) {
        res.status(400).send('POST, No url present')
        return
    }
    const body = req.body
    console.log('body', body)
    try {
        const result = await axios.post(url, body)
        console.log('result', result)
        res.status(200).send(result.data)
    } catch (err) {
        res.status(400).send('unable to call')
    }
});

exports.callBackend = functions.https.onRequest(app);