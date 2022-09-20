const namePersistance=require('../persistence/namePersistance')

let namesController={}

namesController.nameData=async(req,res,next)=>{
    let locals={}
    let nconst=req.params.nconst
    locals.path=req.path
    locals.name=await namePersistance.getNameFullData(nconst)
    res.json(locals)
}

module.exports=namesController