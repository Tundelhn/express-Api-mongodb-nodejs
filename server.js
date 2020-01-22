const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const app = express()
require("dotenv").config()

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on("error", (err) => console.error(err.message))
db.once("open", () => console.log("database connected successully"))

app.use(express.json())
const subscriberRouter = require("./routes/subscriber")
app.use('/api/subscribers', subscriberRouter)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})