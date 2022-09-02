const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
require("dotenv").config()
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://TIF-Project:ypo73XEiyuFJhlob@cluster0.4ryubmy.mongodb.net/TIFDB", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use('/', route);

const port = process.env.PORT

app.listen(port, function () {
    console.log('Express app running on port ' + (port))
});