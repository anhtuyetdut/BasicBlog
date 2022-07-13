var express = require('express');
var router = express.Router();
var modelPost = require("../models/post_model");

router.get("/trang-chu", async function(req, res){
    let listPost = await modelPost.listPost();
    res.render('index.ejs', {listPost: listPost});
});
module.exports = router;