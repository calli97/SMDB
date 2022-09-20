module.exports={
    isLoggedIn(req,res,next){
        if(req.session.loggedin){
            return next()
        }
        return res.send('not loggued')
    },
    isNotLoggedIn(req,res,next){
        if(req.session.loggedin){
            return res.send('already logged')
        }
        return next()
    }
}
