const pool=require('../models/imdb-connection')

const Title=require('../models/title')
const Score=require('../models/score')
const Role=require('../models/role')
const Crew = require('../models/crew')
const UserOpionion=require('../models/userOpinion')

let titlePersistance={}


titlePersistance.getTitleFullData=async(tconst,userId)=>{
    const tResult=await pool.query('SELECT * FROM title_basics WHERE tconst=?',[tconst])
    if(tResult.length>=1){
        let title=new Title(tconst,tResult[0].primary_title,tResult[0].original_title,tResult[0].title_type,
            tResult[0].runtime_minutes,tResult[0].start_year,tResult[0].end_year,tResult[0].is_adult,
            tResult[0].genres?tResult[0].genres.split(','):null)
        title.addCrew(await titlePersistance.getCrew(tconst))
        title.addScore(await titlePersistance.getScores(tconst))
        title.addPrincipals(await titlePersistance.getPrincipals(tconst))
        if(userId!=null){
            title.addUserOpinion(await titlePersistance.getUserOpinion(tconst,userId))
        }
        return title
    }
    //No se encontro el titulo
    return null
}
titlePersistance.getTitle=async(tconst)=>{
    const tResult=await pool.query('SELECT primary_title FROM title_basics WHERE tconst=?',[tconst])
    if(tResult.length===1){
        return tResult[0].primary_title
    }
    //No se encontro el titulo
    return null
}
titlePersistance.getUserOpinion=async(tconst,userId)=>{
    const uResult=await pool.query('SELECT * FROM users_ratings WHERE id_user=? AND tconst=?',[userId,tconst])
    if(uResult.length===1){
        return new UserOpionion(userId,tconst,uResult[0].rating,uResult[0].favorite,uResult[0].state)
    }
    //No se entontro la opinion
    return null
}

titlePersistance.getScores=async(tconst)=>{
    const sResult=await pool.query('SELECT * FROM title_ratings WHERE tconst=?',[tconst])
    if(sResult.length===1){
        const score=new Score(tconst,sResult[0].average_rating,sResult[0].num_votes)
        return score
    }
    //No se encontro el titulo
    return null
}

titlePersistance.getPrincipals=async(tconst)=>{
    const pResults=await pool.query('SELECT * FROM title_principals WHERE tconst=?',[tconst])
    if(pResults.length>=1){
        let principals=[]
        for(let i=0;i<pResults.length;i++){
            let characters
            if(pResults[i].characters){
                characters=pResults[i].characters.replaceAll('\"','')
                characters=characters.replaceAll('[','')
                characters=characters.replaceAll(']','')
                characters=characters.split(',')
            }
            let aux=new Role(pResults[i].nconst,await namePersistance.getName(pResults[i].nconst),tconst,
            await titlePersistance.getTitle(tconst),pResults[i].category,pResults[i].job,characters)
            principals.push(aux)
        }
        return principals
    }
    //No se encontro el reparto
    return null
}


titlePersistance.getCrew=async(tconst)=>{
    const cResults=await pool.query('SELECT * FROM title_crew WHERE tconst=?',[tconst])
    if(cResults.length>=1){
        let directorsId=cResults[0].directors?cResults[0].directors.split(','):[]
        let writersId=cResults[0].writers?cResults[0].writers.split(','):[]
        let directors=[]
        let writers=[]
        for(let i=0;i<directors.length;i++){
            let titleDirector={
                nconst:directors[i],
                name:await namePersistance.getName(directorsId[i])
            }
            directors.push(titleDirector)
        }
        for(let i=0;i<writers.length;i++){
            let titleWriter={
                nconst:writers[i],
                name:await namePersistance.getName(writersId[i])
            }
            writers.push(titleWriter)
        }
        return new Crew(tconst,directors,writers)
    }
    
    //No se encontro 
    return null
}

module.exports=titlePersistance
//El require lo coloco despues del export para evitar el error por la dependencia circular
const namePersistance=require('./namePersistance')