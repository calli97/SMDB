const pool=require('../models/imdb-connection')
const Name = require('../models/name')
const Role = require('../models/role')


let namePersistance={}

//Se obtiene el nombre de la base de datos a partir del id (nconst)
namePersistance.getNameFullData=async(nconst)=>{
    let nResult=await pool.query('SELECT * FROM name_basics WHERE nconst=?',[nconst])
    if(nResult.length===1){
        let primaryProfession=nResult[0].primary_profession?nResult[0].primary_profession.split(','):[]
        let known=nResult[0].known_for_titles?nResult[0].known_for_titles.split(','):[]
        if(known.length>=0){
            //obtengo los titulos por los que es conocido
            let mainRoles=[]
            //obengo la informacion de los roles 
            for(let i=0;i<known.length;i++){
                let role=await namePersistance.getRole(nconst,known[i])
                mainRoles.push(role)
            }
            return new Name(nconst,nResult[0].primary_name,nResult[0].birth_year,nResult[0].death_year,primaryProfession,
                known,mainRoles)
        }else{
            person.knownForTitles=null
            return new Name(nconst,nResult[0].primary_name,nResult[0].birth_year,nResult[0].death_year,primaryProfession,
                known)
        }
    }else{
        //No se encontro la persona con el id
        return null
    }
}


namePersistance.getRole=async(nconst,tconst)=>{
    let rResult=await pool.query('SELECT * FROM title_principals WHERE tconst=? AND nconst=?',[tconst,nconst])
    if (rResult.length===1){
        let characters=null
        if(rResult[0].characters){
            characters=rResult[0].characters.replaceAll('\"','')
            characters=characters.replaceAll('[','')
            characters=characters.replaceAll(']','')
            characters=characters.split(',')
        }
        const role=new Role(nconst,await namePersistance.getName(nconst),tconst,await titlePersistance.getTitle(tconst),
        rResult[0].category,rResult[0].job,characters)
        return role
    }
    return null
}


namePersistance.getName=async(nconst)=>{
    let nResult=await pool.query('SELECT primary_name FROM name_basics WHERE nconst=?',[nconst])
    if(nResult.length===1){
        return nResult[0].primary_name
    }
    //No encontro el nombre
    return null
}

module.exports=namePersistance

const titlePersistance=require('../persistence/titlePersistance')