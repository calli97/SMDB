const pool = require('../models/imdb-connection')
const UserOpinion=require('../models/userOpinion')

let userOpinionPersistance={}

userOpinionPersistance.getOpinion=async(tconst,userId)=>{
    let oResults=await pool.query("SELECT * FROM users_ratings WHERE tconst=? AND id_user=?",[tconst,userId])
    if(oResults.length===1){
        return new UserOpinion(oResults[0].id_user,oResults[0].tconst,oResults[0].rating,oResults[0].favorite,oResults[0].state)
    }else{
        //No se encontro la opinion
        return null
    }
    
}
userOpinionPersistance.addOpinion=async(tconst,userId,rating,favorite,state)=>{
    //Chequeo que el la opinion no haya sido cargada con anterioridad
    let oResults=await pool.query("SELECT 1 FROM users_ratings WHERE tconst=? AND id_user=?",[tconst,userId])
    if(oResults.length===0){
        //Agrego la opinion
        let aResults=await pool.query("INSERT INTO users_ratings VALUES (?,?,?,?,?)",[userId,tconst,rating,favorite,state])
        //Retorno la opinion agregada
        return new UserOpinion(userId,tconst,rating,favorite,state)
    }else{
        //La opinion ya existia la request es invalida
        return null
    }
}
userOpinionPersistance.updateOpinion=async(tconst,userId,rating,favorite,state)=>{
    //Chequeo que la opinion haya sido cargada con anterioridad
    let oResults=await pool.query("SELECT 1 FROM users_ratings WHERE tconst=? AND id_user=?",[tconst,userId])
    if(oResults.length===1){
        //Actualizo la opinion
        console.log(rating,favorite,state ,userId)
        let aResults=await pool.query("UPDATE users_ratings SET rating=?, favorite=?, state=? WHERE tconst=? AND id_user=?",[rating,favorite,state,tconst,userId])
        console.log(aResults)
        //Retorno la opinion agregada
        return new UserOpinion(userId,tconst,rating,favorite,state)
    }else{
        //La opinion no existia, la request es invalida
        return null
    }
}
userOpinionPersistance.deleteOpinion=async(tconst,userId)=>{
    //Chequeo que el la opinion no haya sido cargada con anterioridad
    let oResults=await pool.query("SELECT 1 FROM users_ratings WHERE tconst=? AND id_user=?",[tconst,userId])
    if(oResults.length===1){
        //La opinion existia y se procede a eliminar
        let tResults=await pool.query('DELETE FROM users_ratings WHERE id_user=? AND tconst=?',[userId,tconst])
        return {}
    }else{
        //No existia la opinion por lo que la eliminacion es invalida
        return null
    }
}

module.exports=userOpinionPersistance