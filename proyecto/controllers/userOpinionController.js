const userOpinionPersistance=require('../persistence/userOpinionPersistance')
let userOpinionController={}

userOpinionController.addOpinion=async(req,res,next)=>{
    let tconst=req.params.tconst
    let userId=req.session.loggedin?req.session.user.idUser:null
    let rating=Number(req.body.rating)
    let favorite=req.body.favorite?1:0
    let state=req.body.state
    try {
        let userOpinion=await userOpinionPersistance.addOpinion(tconst,userId,rating,favorite,state)
        if(userOpinion){
            res.status(201).json(userOpinion)
        }else{
            res.status(500).end()
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
    
}

userOpinionController.updateOpinion=async(req,res,next)=>{
    let tconst=req.params.tconst
    let userId=req.session.loggedin?req.session.user.idUser:null
    let rating=Number(req.body.rating)
    let favorite=req.body.favorite?1:0
    let state=req.body.state
    
    
    try {
        let userOpinion=await userOpinionPersistance.updateOpinion(tconst,userId,rating,favorite,state)
        if(userOpinion){
            res.status(201).json(userOpinion)
        }else{
            res.status(500).end()
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

userOpinionController.deleteOpinion=async(req,res,next)=>{
    let tconst=req.params.tconst
    let userId=req.session.loggedin?req.session.user.idUser:null
    let userOpinion=await userOpinionPersistance.deleteOpinion(tconst,userId)
    if(userOpinion===null){
        res.status(500).end()
    }else{
        res.status(200).json(null)
    }
}

module.exports=userOpinionController