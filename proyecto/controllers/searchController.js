const searchPersistance=require('../persistence/searchPersistance')
let searchController={}

const types=['short','movie','tvEpisode','tvSeries','tvShort','tvMovie','tvMiniSerie','tvSpecial','video','tvPilot']
const genres=['Action','Adult','Adventure','Animation','Biography','Comedy','Crime','Documentary','Drama','Family','Fantasy','Film Noir','Game show','History','Horror','Musical','Music','Mystery','News','Reality-TV','Romance','Sci-Fi','Short','Sport','Talk-Show','Thriller','War','Western']


searchController.listTitles=async(req,res,next)=>{
    let limit=req.query.limit?Number(req.query.limit):25
    let offset=req.query.offset?Number(req.query.offset):0
    let type=req.query.type
    let userId=req.session.loggedin?req.session.user.idUser:null
    let locals={}
    //Verifico que el tipo este incluido en la lista
    if(type!=undefined){
        if(!types.includes(type)){
            type=null
            //Ejecuto la busqueda pero informa de un error
            console.error('Invalid type')
        }
    }else{
        type=null
    }
    locals.path=req.path
    locals.titles=await searchPersistance.listTitles(limit,offset,type,userId)
    locals.limit=limit
    locals.offset=offset
    locals.type=type
    locals.navigation=getNavigation(limit,offset,locals.path,req.query)
    res.json(locals)
}

searchController.search=async(req,res,next)=>{
    let limit=req.query.limit?Number(req.query.limit):25
    let offset=req.query.offset?Number(req.query.offset):0
    let search=req.query.search
    let locals={}
    let userId=req.session.loggedin?req.session.user.idUser:null
    locals.path=req.path
    locals.titles=await searchPersistance.search(search,limit,offset,userId)
    locals.navigation=getNavigation(limit,offset,locals.path,req.query)
    //res.json(locals)
    res.json(locals)
}

searchController.advanceSearch=async(req,res,next)=>{
    let limit=req.query.limit?Number(req.query.limit):25
    let offset=req.query.offset?Number(req.query.offset):0
    let search=req.query.search
    let locals={}
    let userId=req.session.loggedin?req.session.user.idUser:null
    locals.path=req.path
    //controllo la cantidad de queryparams
    let len=Object.keys(req.query).length
    if(len===0){
        locals.searchFlag=false
        res.json(locals)
    }else{
        locals.searchFlag=true
    }
    locals.genres=[]
    locals.types=[]
    locals.search=search
    //Tomo las claves y valores de query
    let keys=Object.keys(req.query)
    let values=Object.values(req.query)
    //Checkeo uno a uno si pertenece a la lista de generos o type y si el valor es on(value del checkbox)
    for(let i=0;i<len;i++){
        if(genres.includes(keys[i])&&values[i]=='on'){
            locals.genres.push(keys[i])
        }
        if(types.includes(keys[i])&&values[i]=='on'){
            locals.types.push(keys[i])
        }
    }
    locals.startYear=req.query.startyear
    locals.search=req.query.search
    locals.duration=req.query.duration
    locals.rating=req.query.rating
    locals.offset=offset
    locals.limit=limit
    locals.titles=await searchPersistance.advanceSearch(locals.search,limit,offset,locals.types,locals.genres,
        locals.startYear,locals.rating,locals.duration,userId)
    locals.navigation=getNavigation(limit,offset,locals.path,req.query)
    
    res.json(locals)
    //res.render('advanceSearch',locals)
}

const getNavigation=(limit,offset,path,query)=>{
    //Obtengo las urls para la navegacion
    let navigation={}
    let nextUrl=new URLSearchParams(query)
    let aux=offset+limit
    nextUrl.set('offset',aux)
    navigation.nextUrl=path+'?'+nextUrl.toString()
    let prevUrl=new URLSearchParams(query)
    aux=offset-limit
    prevUrl.set('offset',aux)
    navigation.prevUrl=path+'?'+prevUrl.toString(query)
    //Limits posibles [25,50,100]
    let limit25=new URLSearchParams(query)
    limit25.set('offset',0)
    limit25.set('limit',25)
    navigation.limit25=path+'?'+limit25.toString()
    let limit50=new URLSearchParams(query)
    limit50.set('offset',0)
    limit50.set('limit',50)
    navigation.limit50=path+'?'+limit50.toString()
    let limit100=new URLSearchParams(query)
    limit100.set('offset',0)
    limit100.set('limit',100)
    navigation.limit100=path+'?'+limit100.toString()
    return navigation
}


module.exports=searchController