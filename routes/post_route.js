var express = require('express');
var router = express.Router();
var modelPost = require("../models/post_model");

router.get("/trang-chu", async function(req, res){
    let listPost = await modelPost.listPost();
    let listCategory = await modelPost.listCategory();
    res.render('index.ejs', {listPost: listPost, user:req.session.user, listCategory: listCategory});
});
router.get("/create-new-post", async function(req, res){
    let listCategory = await modelPost.listCategory();
    res.render('create_new_post.ejs', {message:"", listCategory:listCategory, user: req.session.user});
});
router.post('/create-new-post', function(req, res){
    let title = req.body.title;
    let user = req.session.user;
    let description = req.body.description;
    let content = req.body.content;
    let status = req.body.status;
    let stat = 0;
    let idCategory = req.body.idCategory;
    if (status == "Public") stat = 1;
    if(!req.files) var img = "upload/" + "default.png";
    else
    {
        var file = req.files.upload_image;
        var img = "upload/" + file.name;
        if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg")
        {
            file.mv('public/upload/' + file.name, function(err){});
        }
    }
    if(title == "" || description == "" || content == ""){
        let message = "Vui long dien day du thong tin";
        res.render('create_new_post.ejs', {message:message});
    }
    else{
        let newPost = {
            title: title,
            description: description,
            content: content,
            status: stat,
            avatar: img,
            idUser: user.idUser,
            idCategory: idCategory
        }
        modelPost.createNewPost(newPost);
        res.redirect("/post/your-post");
    }
})
router.get("/edit-post:idPost", async function(req, res){
    let listCategory = await modelPost.listCategory();
    let idPost = req.params.idPost;
    let post = await modelPost.selectPostByID(idPost);
    let category = await modelPost.selectCatByID(post.idCategory);
    res.render('edit_post.ejs', {listCategory:listCategory, post:post, category:category, user: req.session.user});
})
router.put("/edit-post:idPost", async function(req, res){
    let idPost = req.params.idPost;
    let title = req.body.title;
    let description = req.body.description;
    let content = req.body.content;
    let status = req.body.status;
    let stat = 0;
    let idCategory = req.body.idCategory;
    if (status == "Public") stat = 1;
    if(!req.files) var img = (await modelPost.selectPostByID(idPost)).avatar;
    else
    {
        var file = req.files.upload_image;
        var img = "upload/" + file.name;
        if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg")
        {
            file.mv('public/upload/' + file.name, function(err){});
        }
    }
    if(title == "" || description == "" || content == ""){
        let message = "Vui long dien day du thong tin";
        res.render('create_new_post.ejs', {message:message, user: req.session.user});
    }
    else{
        let newPost = {
            title: title,
            description: description,
            content: content,
            status: stat,
            avatar: img,
            idUser: 2,
            idCategory: idCategory
        }
        modelPost.editPost(newPost, idPost);
        res.redirect("/post/your-post");
    }
})
router.get("/detail:idPost", async function(req, res){
    let idPost = req.params.idPost;
    let post = await modelPost.selectPostByID(idPost);
    let listCategory = await modelPost.listCategory();
    res.render('detail_post.ejs', {post:post, listCategory:listCategory, user: req.session.user});
})
router.get("/post-category:idCategory:name", async function(req, res){
    let idCategory = req.params.idCategory;
    let name = req.params.name;
    let listPost = await modelPost.listPostByCat(idCategory);
    let listCategory = await modelPost.listCategory();
    res.render('post_category.ejs', {listPost:listPost, listCategory:listCategory, name:name, user: req.session.user});
})
router.get("/your-post", async function(req, res){
    let listCategory = await modelPost.listCategory();
    let user = req.session.user;
    let listPost = [];
    listPost = await modelPost.selecPostByIDUser(user.idUser);
    res.render('your-post.ejs', {listPost:listPost, listCategory:listCategory, user: req.session.user});
})
router.post("/your-post-status", async function(req, res){
    let listCategory = await modelPost.listCategory();
    let status = req.body.status;
    let user = req.session.user;
    let listPost = [];
    let stat = 0;
    if (status == "All")
    {
        listPost = await modelPost.selecPostByIDUser(user.idUser);
        res.render('your-post.ejs', {listPost:listPost, listCategory:listCategory, user: req.session.user});
        return
    }
    if (status == "Public") stat = 1;
    listPost = await modelPost.selectPostByIDandStatus(user.idUser, stat);
    res.render('your-post.ejs', {listPost:listPost, listCategory:listCategory, user: req.session.user});
})
router.delete('/delete-post:idPost', function(req, res){
    let idPost = req.params.idPost;
    modelPost.deletePost(idPost);
})
router.get('/delete-post:idPost', function(req, res){
    let idPost = req.params.idPost;
    modelPost.deletePost(idPost);
    res.redirect('/post/your-post');
})
module.exports = router;