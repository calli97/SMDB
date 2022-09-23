const pool=require('./db/SMDBConnection')
const Title=require('../models/title')
const titlePersistance=require('./titlePersistance')

let searchPersistance={}

searchPersistance.search=async(search,limit,offset,userId)=>{
    search+='*'
    let sql='SELECT * FROM title_basics LEFT JOIN title_ratings on title_ratings.tconst=title_basics.tconst WHERE MATCH(primary_title) AGAINST (? IN BOOLEAN MODE) AND title_type IN(\'movie\',\'tvseries\') ORDER BY title_ratings.average_rating DESC'
    sql+=' LIMIT '+limit
    sql+=' OFFSET '+offset
    const sResults=await pool.query({sql:sql,nestTables: true},[search])
    if(sResults.length>0){
        let results=[]
        for(let i=0;i<sResults.length;i++){
            let title=new Title(sResults[i].title_basics.tconst,sResults[i].title_basics.primary_title,sResults[i].title_basics.original_title,
                sResults[i].title_basics.title_type,sResults[i].title_basics.runtime_minutes,sResults[i].title_basics.start_year,
                sResults[i].title_basics.end_year,sResults[i].title_basics.is_adult,
                sResults[i].title_basics.genres?sResults[i].title_basics.genres.split(','):[])
            title.addScore(await titlePersistance.getScores(title.tconst))
            title.addUserOpinion(await titlePersistance.getUserOpinion(title.tconst,userId))
            results.push(title)
        }
        return results
    }else{ 
        //No hubo resultados
        return null
    }
}

searchPersistance.advanceSearch=async(search,limit,offset,types,genres,startYear,rating,duration,userId)=>{
    search+='*'
    let sql='SELECT * FROM title_basics LEFT JOIN title_ratings ON title_basics.tconst=title_ratings.tconst WHERE MATCH(primary_title) AGAINST (? IN BOOLEAN MODE)'
    //Agrego los typos para filtrar
    if(types.length>0){
        sql+=' AND title_type IN ('
        for(let i=0;i<types.length;i++){
            sql+='\''+types[i]+'\' '
            if(!i+1===types.length){
                sql+=','
            }
        }
        sql+=')'
    }
    if(genres.length>0){
        sql+=' AND MATCH(genres) AGAINST (\''
        for(let i=0;i<genres.length;i++){
            sql+=genres[i]
            sql+=' '
        }
        sql+='\' IN BOOLEAN MODE)'
    }
    if(startYear>1874){
        sql+=' AND start_year>'+startYear
    }
    if(rating>0){
        sql+=' AND average_rating>'+rating
    }
    if(duration>0){
        sql+=' AND runtime_minutes>'+duration
    }
    //Limit
    sql+=' LIMIT '+limit
    sql+=' OFFSET '+offset
    const sResults=await pool.query({sql:sql,nestTables: true},[search])
    if(sResults.length>0){
        let results=[]
        for(let i=0;i<sResults.length;i++){
            let title=new Title(sResults[i].title_basics.tconst,sResults[i].title_basics.primary_title,sResults[i].title_basics.original_title,
                sResults[i].title_basics.title_type,sResults[i].title_basics.runtime_minutes,sResults[i].title_basics.start_year,
                sResults[i].title_basics.end_year,sResults[i].title_basics.is_adult,
                sResults[i].title_basics.genres?sResults[i].title_basics.genres.split(','):[])
            title.addScore(await titlePersistance.getScores(title.tconst))
            title.addUserOpinion(await titlePersistance.getUserOpinion(title.tconst,userId))
            results.push(title)
        }
        return results
    }else{ 
        //No hubo resultados
        return null
    }
}

searchPersistance.listTitles=async(limit,offset,type,userId=null)=>{
    let sql='SELECT * FROM title_basics'
    let queryParams=[]
    if(limit<=0,offset<0){
        //Invocacion invalida
        return null
    }
    if(type){
        sql+=' WHERE title_type=?'
        queryParams.push(type)
    }
    sql+=' LIMIT ?'
    queryParams.push(limit)
    sql+=' OFFSET ?'
    queryParams.push(offset)
    const tResults=await pool.query(sql,queryParams)
    let titles=[]
    if(tResults.length>=1){
        for(let i=0;i<tResults.length;i++){
            let title=new Title(tResults[i].tconst,tResults[i].primary_title,tResults[i].original_title,tResults[i].title_type,
                tResults[i].runtime_minutes,tResults[i].start_year,tResults[i].end_year,tResults[i].is_adult,
                tResults[i].genres?tResults[i].genres.split(','):[])
            title.addScore(await titlePersistance.getScores(title.tconst))
            title.addUserOpinion(await titlePersistance.getUserOpinion(title.tconst,userId))
            titles.push(title)
        }
        return titles
    }else{
        //No se obtuvieron resultado
        //Offset too big
        return null
    }
}


module.exports=searchPersistance