const titlePersistance=require('../persistence/titlePersistance')
let titleController={}

titleController.titleData=async(req,res,next)=>{
    const tconst=req.params.tconst
    let userId=req.session.loggedin?req.session.user.idUser:null
    let locals={}
    locals.path=req.path
    try {
        locals.title=await titlePersistance.getTitle(tconst,userId)
        if(locals.title){
            locals.links={
                crew:`${req.protocol}://${req.get('host')}${req.originalUrl}/crew`,
                principals:`${req.protocol}://${req.get('host')}${req.originalUrl}/principals`,
                score:`${req.protocol}://${req.get('host')}${req.originalUrl}/score`,
                userOpinion:userId?`${req.protocol}://${req.get('host')}${req.originalUrl}/useropinion`:undefined
            }
            res.json(locals)
        }else{
            res.status(404).json({error:'Title Not Found'})
        } 
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
titleController.getTitleCrew=async(req,res,next)=>{
    const tconst=req.params.tconst
    let locals={}
    locals.title=`${req.protocol}://${req.get('host')}/title/${tconst}`
    locals.path=req.path
    try {
        locals.crew=await titlePersistance.getCrew(tconst)
        if(locals.crew){
            res.json(locals)
        }else{
            res.status(404).json({error:'No Data'})
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    } 
}
titleController.getTitlePrincipals=async(req,res,next)=>{
    const tconst=req.params.tconst
    let locals={}
    locals.title=`${req.protocol}://${req.get('host')}/title/${tconst}`
    locals.path=req.path
    try {
        let principals=await titlePersistance.getPrincipals(tconst)
        if(principals!==null){
            locals.principals=[]
            for(let i=0;i<principals.length;i++){
                let principal={}
                principal.role=principals[i]
                principal.links={
                    name:`${req.protocol}://${req.get('host')}/name/${principals[i].nconst}`
                }
                locals.principals.push(principal)
            }
            res.json(locals)
        }else{
            res.status(404).json({error:'No Data'})
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
    
}
titleController.getTitleScore=async(req,res,next)=>{
    const tconst=req.params.tconst
    let locals={}
    locals.title=`${req.protocol}://${req.get('host')}/title/${tconst}`
    locals.path=req.path
    try {
        locals.score=await titlePersistance.getScores(tconst)
        if(locals.score){
            res.json(locals)
        }else{
            res.status(404).json({error:'No Data'})
        }   
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
titleController.getUserOpinion=async(req,res,nexy)=>{
    const tconst=req.params.tconst
    let userId=req.session.loggedin?req.session.user.idUser:null
    let locals={}
    locals.title=`${req.protocol}://${req.get('host')}/title/${tconst}`
    locals.path=req.path
    if(userId){
        try {
            locals.userOpinion=await titlePersistance.getUserOpinion(tconst,userId)
            if(locals.userOpinion){
                res.json(locals)
            }else{
                res.json({msg:"There's no opinion for this title"})
            } 
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }else{
        res.status(401).json({error:'you must be logged in to access this page'})
    }    
}

module.exports=titleController