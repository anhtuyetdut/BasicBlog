const db = require('./database')
let data = []

exports.login = async(username, password) => {
    return new Promise((hamOK, hamloi) => {
        let sql = "SELECT * FROM user WHERE username = '" + username + "' AND password = '" + password + "'";
        let query = db.query(sql, (err, result) => {
            if (err) console.log(err);
            else{
                data = result[0];
                hamOK(data);
            }
        })
    })
}
exports.getUserByID = async(idUser) =>{
    return new Promise((hamOK, hamloi) =>{
        let sql = "SELECT * FROM user WHERE idUser = " + idUser;
        let query = db.query(sql, (err, result) =>{
            if (err) console.log(err);
            else{
                hamOK(result[0])
            }
        })
    })
}
exports.register = async(user) =>{
    let sql = "INSERT INTO user SET ?";
    let query = db.query(sql, user, (err, result) =>{
         console.log("Insert success");
    })
}
exports.updateUser = async(user, idUser) =>{
    let sql = "UPDATE user SET ? WHERE idUser = " + idUser;
    db.query(sql, user, (err, result) =>{
        console.log("Update user success");
    })
}
exports.checkEmail = async(email) =>{
    return new Promise((hamOK, hamloi) =>{
        let sql = "SELECT * FROM user WHERE email = '" + email + "'";
        db.query(sql, (err, result) =>{
            data = result[0];
            hamOK(data);
        })
    })
}
exports.checkUsername = async(username) =>{
    return new Promise((hamOK, hamloi)=>{
        let sql = "SELECT * FROM user WHERE username = '" + username + "'";
        db.query(sql, (err, result) =>{
            if(err) console.log(err);
            else{
                data = result[0];
                hamOK(data);
            }
        })
    })
}