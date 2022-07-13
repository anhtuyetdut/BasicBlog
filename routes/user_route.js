var express = require('express');
var router = express.Router();
var modelUser = require("../models/user_model");
var modelPost = require("../models/post_model");

router.post('/login', async function(req, res, next){
    let message = "";
    let username = req.body.username;
    let password = req.body.password;
    let user = null;
    if (username == "" || password == ""){
        message = "Vui long dien lai thong tin";
        res.render('login.ejs', {message: message})
        return;
    }
    if(await modelUser.login(username, password) != null){
        req.session.user = await modelUser.login(username, password);
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
router.get('/account', async function(req, res, next){
    let listCategory = await modelPost.listCategory();
    res.render('account.ejs', {user: req.session.user, listCategory:listCategory});
})  
router.get('/logout', function(req, res, next){
    delete req.session.user;
    res.redirect("/post/trang-chu");
})
router.put('/edit-account', async function(req, res, next){
    let email = req.body.email;
    let user = req.session.user;
    let username = req.body.username;
    let password = req.body.password;
    let age = req.body.age;
    let gen = 0;
    let gender = req.body.gender;
    if (gender == "Female") gen = 1;
    if(password == "" || age == ""){
        let message = "Vui long dien day du thong tin";
        res.redirect('/user/account');
    }
    else{
        let newUser = {
            idUser: user.idUser,
            email:email,
            username:username,
            password:password,
            age:age,
            gender:gen
        }
        req.session.user = newUser
        modelUser.updateUser(newUser, user.idUser);
        res.redirect('/user/account');
    }
})
module.exports = router;