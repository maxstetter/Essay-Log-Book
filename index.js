const express = require('express')
const model = require('./model')
const Essay = model.Essay;


const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false}))
app.use(express.json({}))

app.get('/essays', (req, res) => {
    app.set('Access-Control-Allow-Origin','*');
    Essay.find().then((essays) => {
        res.json(essays);
    });
})



app.listen(port, () => {
    console.log(`Essay App listening at http://localhost:${port}`)
})