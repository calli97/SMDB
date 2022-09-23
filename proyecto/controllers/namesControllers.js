const namePersistance=require('../persistence/namePersistance')

let namesController={}

namesController.nameData=async(req,res,next)=>{
    let locals={}
    let nconst=req.params.nconst
    locals.path=req.path
    try {
        locals.name=await namePersistance.getNameFullData(nconst)
        res.json(locals)
    } catch (error) {
        res.status(500).json({error:error.message})
    } 
}

module.exports=namesController