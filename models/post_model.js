const db = require("./database");

exports.listPost = async() =>{
    return new Promise((hamOK, hamloi) =>{
        let sql = "SELECT * FROM post";
        db.query(sql, (err, result) =>{
            if (err) console.log(err);
            else{
                hamOK(result)
            }
        })
    })
}
exports.listPostByCat = async(idCategory) =>{
    return new Promise((hameOK, hamloi) =>{
        let sql = "SELECT * FROM post WHERE idCategory = " + idCategory;
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
        let sql = "SELECT * FROM post WHERE idPost = " + idPost;
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
exports.editPost = async(newpost)=>{
    let sql = "INSERT INTO post SET ?";
    db.query(sql, newpost, (err, result)=>{
        if(err) console.log(err);
        else{
            console.log("Edit success");
        }
    })
}