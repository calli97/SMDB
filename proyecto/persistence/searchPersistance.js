const pool=require('./db/SMDBConnection')
const Title=require('../models/title')
const titlePersistance=require('./titlePersistance')

let searchPersistance={}

searchPersistance.search=async(search,limit,offset,userId)=>{
    search+='*'
    let sql='SELECT title_basics.tconst,title_basics.primary_title FROM title_basics LEFT JOIN title_ratings on title_ratings.tconst=title_basics.tconst WHERE MATCH(primary_title) AGAINST (? IN BOOLEAN MODE) AND title_type IN(\'movie\',\'tvseries\') ORDER BY title_ratings.average_rating DESC'
    sql+=' LIMIT '+limit
    sql+=' OFFSET '+offset
    const sResults=await pool.query({sql:sql,nestTables: true},[search])
    if(sResults.length>0){
        let results=[]
        for(let i=0;i<sResults.length;i++){
            let result={}
            result.title=sResults[i].title_basics.primary_title
            result.tconst=sResults[i].title_basics.tconst
            results.push(result)
        }
        return results
    }else{ 
        //No hubo resultados
        return null
    }
}

searchPersistance.advanceSearch=async(search,limit,offset,types,genres,startYear,rating,duration,userId)=>{
    search+='*'
    let sql='SELECT title_basics.tconst,title_basics.primary_title FROM title_basics LEFT JOIN title_ratings ON title_basics.tconst=title_ratings.tconst WHERE MATCH(primary_title) AGAINST (? IN BOOLEAN MODE)'
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
            let result={}
            result.title=sResults[i].title_basics.primary_title
            result.tconst=sResults[i].title_basics.tconst
            results.push(result)
        }
        return results
    }else{ 
        //No hubo resultados
        return null
    }
}

searchPersistance.listTitles=async(limit,offset,type,userId=null)=>{
    let sql='SELECT tconst,primary_title FROM title_basics'
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
            let result={}
            result.title=tResults[i].primary_title
            result.tconst=tResults[i].tconst
            titles.push(result)
        }
        return titles
    }else{
        //No se obtuvieron resultado
        //Offset too big
        return null
    }
}


module.exports=searchPersistance