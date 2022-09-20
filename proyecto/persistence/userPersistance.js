const User=require('../models/user')
const pool=require('../models/imdb-connection')
const bcryptjs=require('bcryptjs')

let userPersistance={}

userPersistance.addUser=async(fullname,username,pass,email)=>{
    let uResults=await pool.query('SELECT * FROM users WHERE username=? OR email=?',[username,email])
    if(uResults.length==0){
        //No exisitan usuario previos
        let hashpass=await bcryptjs.hash(pass,10)
        let user={
            full_name:fullname,
            email,
            pass:hashpass,
            username
        }
        let newUser=await pool.query('INSERT INTO users SET ?',[user])
        return new User(newUser.insertId,username,hashpass,fullname,email)
    }else{
        return null
    }
}

userPersistance.userVerification=async(username,pass)=>{
    let uResults=await pool.query('SELECT * FROM users WHERE username=?',[username])
    if(uResults.length===1){
        console.log(uResults)
        if(await bcryptjs.compare(pass,uResults[0].pass)){
            //let hashpass=await bcryptjs.hash(pass,10)
            //Retorno los datos del usuario
            return new User(uResults[0].id_user,username,uResults[0].pass,uResults[0].full_name,uResults[0].email)
        }else{
            //Contrase;a invalida
            return null
        }
    }else{
        return null
    }
}

module.exports=userPersistance