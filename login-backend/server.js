const express = require('express')
const cors = require('cors')
const bodyparser = require ('body-parser')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

const routes = require('./routes/routes')

dotenv.config();
connectDB();

const app = express()
const port = 8000;

app.use(cors())
app.use(bodyparser.json())
app.use(express.json())

app.use('/',routes)

app.listen(port,() =>{
    console.log(`Running on http://localhost:${port}`)
})

