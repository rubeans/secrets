const express = require("express")
const app = express()
const mongoose = require("mongoose")

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/sign-up", (req, res) => {
    res.render("signup")
})

app.get("/sign-in", (req, res) => {
    res.render("signin")
})




let port = process.env.PORT
if (port == null || port == "") {
    port = 3000
}
app.listen(port, () => {
    console.log("Servidor Rodando...")
})