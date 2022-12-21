const userPersistance=require('../persistence/userPersistance')
let userController={}

userController.register=async(req,res,next)=>{
    const username=req.body.username
    const fullname=req.body.fullname
    const email=req.body.email
    const pass=req.body.pass
    if(!req.body.username||!req.body.fullname||!req.body.email||!req.body.pass){
        res.status(400).end()
    }
    try {
        let newUser=await userPersistance.addUser(fullname,username,pass,email)
        res.json(newUser)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

userController.userVerification=async (req,res,next)=>{
    const username=req.body.username
    const pass=req.body.pass
    if(!req.body.username||!req.body.pass){
        res.status(400).end()
    }
    let user=await userPersistance.userVerification(username,pass)
    if(user!=null){
        req.session.loggedin=true
        req.session.user=user
        res.json(user)
    }else{
        
        res.status(401).end()
    }
}
userController.logout=(req,res,next)=>{
    req.session.destroy(()=>{
        res.json({ok:true})
    })
}

module.exports=userController