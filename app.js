require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))

main().catch(e => { console.error(e) })
async function main() {

    //DATABASE CONNECTION
    try {
        await mongoose.connect("mongodb://localhost:27017/userDB")
    } catch (e) {
        console.log(e)
    }

    //DATABASE SETUP
    const userSchema = new mongoose.Schema({
        email: String,
        password: String
    },
        {
            versionKey: false
        })

    const User = mongoose.model("User", userSchema)

    //GET ROUTES
    app.get("/", (req, res) => {
        res.render("home")
    })

    app.get("/sign-up", (req, res) => {
        res.render("signup")
    })

    app.get("/sign-in", (req, res) => {
        res.render("signin")
    })


    //POST ROUTES
    app.post("/sign-up", (req, res) => {
       
    })

    app.post("/sign-in", (req, res) => {
       
    })

    // LOCALHOST CONNECTION
    let port = process.env.PORT
    if (port == null || port == "") {
        port = 3000
    }
    try {
        app.listen(port, () => {
            console.log("Servidor Rodando...")
        })
    } catch (e) {
        console.error(e)
    }
}