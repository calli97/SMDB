const namePersistance=require('../persistence/namePersistance')

let namesController={}

namesController.nameData=async(req,res,next)=>{
    let locals={}
    let nconst=req.params.nconst
    locals.path=req.path
    try {
        locals.name=await namePersistance.getNameFullData(nconst)
        if(locals.name){
            locals.titles=[]
            for(let i=0;i<locals.name.knownForTitles.length;i++){
                let title=`${req.protocol}://${req.get('host')}/title/${locals.name.knownForTitles[i]}`
                locals.titles.push(title)
            }
            locals.roles=`${req.protocol}://${req.get('host')}${req.originalUrl}/roles`,
            res.json(locals)
        }else{
            res.status(404).json({error:"No Data"})
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    } 
}

namesController.nameRoles=async(req,res,next)=>{
    let locals={}
    let nconst=req.params.nconst
    locals.path=req.path
    locals.name=`${req.protocol}://${req.get('host')}/name/${nconst}`
    try {
        const roles=await namePersistance.getRoles(nconst)
        locals.roles=[]
        if(roles!=null){
            for(let i=0;i<roles.length;i++){
                let role={}
                role.role=roles[i]
                role.link=`${req.protocol}://${req.get('host')}/title/${roles[i].tconst}`
                locals.roles.push(role)
            }
            res.json(locals)
        }else{
            res.status(404).json({error:'No Data'})
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports=namesController