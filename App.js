import express from 'express'
const app = express()
app.get('/hello', (req, res) => {res.send('Life is good!')})
app.get('/', (req, res) => {res.send('Welc Stack !')})
app.listen(4000)