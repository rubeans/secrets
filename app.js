require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const md5 = require("md5")

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))

main().catch(e => { console.error(e) })
async function main() {

    //DATABASE CONNECTION
    try {
        mongoose.connect("mongodb://localhost:27017/userDB")
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
        const newUser = new User({
            email: req.body.signUpEmail,
            password: md5(req.body.signUpPassword)
        })

        newUser.save(e => {
            if (e) {
                console.error(e)
            } else {
                res.render("secrets")
            }
        })
    })

    app.post("/sign-in", (req, res) => {
        const signInEmail = req.body.signInEmail
        const siginPassword = md5(req.body.signInPassword)

        User.findOne({ email: signInEmail }, (e, docs) => {
            if (e) {
                console.error(e)
            } else {
                if (docs) {
                    if (docs.password === siginPassword) {
                        console.log("User found.")
                        res.render("secrets")
                    }
                } else {
                    console.error("User not found.")
                    res.send('User not found, please <a href="/sign-up">sign up</a> to have access.')
                }
            }
        })
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