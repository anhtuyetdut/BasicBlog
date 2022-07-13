var express = require('express');
var router = express.Router();
var modelUser = require("../models/user_model");

router.post('/login', async function(req, res, next){
    let message = "";
    let username = req.body.username;
    let password = req.body.password;
    if (username == "" || password == ""){
        message = "Vui long dien lai thong tin";
        res.render('login.ejs', {message: message})
        return;
    }
    if(await modelUser.login(username, password) != null){
        res.redirect("/post/trang-chu");
    }
    else
    {
        message = "Tai khoan hoac mat khau khong chinh xac";
        res.render('login.ejs', {message: message})
    }
})
router.get('/login', function(req, res, next){
    let message = "";
    res.render('login.ejs', {message:message});
})
router.get('/register', function(req, res, next){
    res.render("register.ejs", {message1:"", message2:""});
})
router.post('/dang-ky', async function(req, res, next){
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let age = req.body.age;
    let gender = req.body.Gender;
    let gen = 0;
    if (gender == "Female")
    {
        gen = 1;
    }
    else gen = 0;
    if(await modelUser.checkUsername(username) != null)
    {
        let message = "Username da ton tai";
        res.render("register.ejs", {message1:message, message2:""});
    }
    else if(await modelUser.checkEmail(email) != null)
    {
        message = "Email da ton tai";
        res.render("register.ejs", {message1:"", message2:message});
    }
    else
    {
        let user = {
            email: email,
            username: username,
            password: password,
            age: age,
            gender: gen
        }
        modelUser.register(user);
        res.redirect('/user/login');
    }
})
module.exports = router;