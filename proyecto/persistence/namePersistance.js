const pool=require('./db/SMDBConnection')
const Name = require('../models/name')
const Role = require('../models/role')


let namePersistance={}

//Se obtiene el nombre de la base de datos a partir del id (nconst)
namePersistance.getNameFullData=async(nconst)=>{
    let nResult
    try {
        nResult=await pool.query('SELECT * FROM name_basics WHERE nconst=?',[nconst])
    } catch (error) {
        throw new Error('Connecting to database failed',{cause:error})
    }
    if(nResult.length===1){
        let primaryProfession=nResult[0].primary_profession?nResult[0].primary_profession.split(','):[]
        let known=nResult[0].known_for_titles?nResult[0].known_for_titles.split(','):[]
        
        return new Name(nconst,nResult[0].primary_name,nResult[0].birth_year,
            nResult[0].death_year,primaryProfession,known)
        
    }else{
        //No se encontro la persona con el id
        return null
    }
}


namePersistance.getRoles=async(nconst)=>{
    let rResults=await pool.query('SELECT * FROM title_principals WHERE nconst=?',[nconst])
    if (rResults.length>0){
        let roles=[]
        for(let i=0;i<rResults.length;i++){
            let characters=null
            if(rResults[i].characters){
                characters=rResults[0].characters.replaceAll('\"','')
                characters=characters.replaceAll('[','')
                characters=characters.replaceAll(']','')
                characters=characters.split(',')
            }
            let role=new Role(rResults[i].tconst,nconst,rResults[i].category,rResults[i].job,characters)
            roles.push(role)
        }
        return roles
    }
    return null
}



module.exports=namePersistance

const titlePersistance=require('../persistence/titlePersistance')