const db = require("./database");

exports.listPost = async() =>{
    return new Promise((hamOK, hamloi) =>{
        let sql = "SELECT idPost, title, description, post.avatar, content, email, name FROM user INNER JOIN post ON user.idUser=post.idUser INNER JOIN category ON post.idCategory=category.idCategory WHERE status = 1";
        db.query(sql, (err, result) =>{
            if (err) console.log(err);
            else{
                hamOK(result)
            }
        })
    })
}
exports.listPostByCat = async(idCategory) =>{
    return new Promise((hamOK, hamloi) =>{
        let sql = "SELECT idPost, post.idCategory, title, description, post.avatar, status, content, email, name FROM user INNER JOIN post ON user.idUser=post.idUser INNER JOIN category ON post.idCategory=category.idCategory WHERE post.idCategory = " + idCategory + " AND status = 1";
        db.query(sql, (err, result)=>{
            if (err) console.log(err);
            else{
                hamOK(result);
            }
        })
    })
}
exports.selectPostByID = async(idPost) =>{
    return new Promise((hamOK, hamloi) =>{
        let sql = "SELECT idPost, post.idCategory, title, description, post.avatar, status, content, email, name FROM user INNER JOIN post ON user.idUser=post.idUser INNER JOIN category ON post.idCategory=category.idCategory WHERE idPost = " + idPost;
        db.query(sql, (err, result) =>{
            if(err) console.log(err);
            else{
                let data = result[0];
                hamOK(data);
            }
        })
    })
}
exports.createNewPost = function(newPost){
    let sql = "INSERT INTO post SET ?";
    db.query(sql, newPost, (err, result) =>{
        if (err) console.log(err);
        else{
            console.log("Create success");
        }
    })
}
exports.editPost = async(newpost, idPost)=>{
    let sql = "UPDATE post SET ? WHERE idPost = " + idPost;
    db.query(sql, newpost, (err, result)=>{
        if(err) console.log(err);
        else{
            console.log("Edit success");
        }
    })
}
exports.listCategory = async() =>{
    return new Promise((hamOK, hamloi) =>{
        let sql = "SELECT * FROM category";
        db.query(sql, (err, result)=>{
            if(err) throw err;
            else{
                hamOK(result);
            }
        })
    })
}
exports.selectCatByID = async(idCategory) =>{
    return new Promise((hamOK, hamloi) =>{
        let sql = "SELECT * FROM category WHERE idCategory = " + idCategory;
        db.query(sql, (err, result)=>{
            if(err) throw err;
            else{
                hamOK(result[0]);
            }
        })
    })
}
exports.selectPostByIDandStatus = async(idUser, stat)=>{
    return new Promise((hamOK, hamloi) =>{
        let sql = "SELECT idPost, title, description, post.avatar, status, content, email, name FROM user INNER JOIN post ON user.idUser=post.idUser INNER JOIN category ON post.idCategory=category.idCategory WHERE post.idUser = " + idUser + " AND status = " + stat;
        db.query(sql, (err, result) =>{
            if(err) console.log(err);
            else{
                hamOK(result);
            }
        })
    })
}
exports.selecPostByIDUser = async(idUser)=>{
    return new Promise((hamOK, hamloi) =>{
        let sql = "SELECT idPost, title, description, post.avatar, status, content, email, name FROM user INNER JOIN post ON user.idUser=post.idUser INNER JOIN category ON post.idCategory=category.idCategory WHERE post.idUser = " + idUser;
        db.query(sql, (err, result) =>{
            if(err) throw err;
            else{
                hamOK(result);
            }
        })
    })
}
exports.deletePost = function(idPost){
    let sql = "DELETE from post WHERE idPost = " + idPost;
    db.query(sql, (err, result)=>{
        if(err) throw err;
        else{
            console.log("Delete success");
        }
    })
}