const titlePersistance=require('../persistence/titlePersistance')
let titleController={}

titleController.titleData=async(req,res,next)=>{
    const tconst=req.params.tconst
    let userId=req.session.loggedin?req.session.user.idUser:null
    let locals={}
    locals.path=req.path
    locals.title=await titlePersistance.getTitleFullData(tconst,userId)
    res.json(locals)
    //res.render('title',locals)
}

module.exports=titleController