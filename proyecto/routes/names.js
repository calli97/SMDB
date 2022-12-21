'use strict'

const express=require('express')
const router=express.Router()
const namesControler=require('../controllers/namesControllers')

router.get('/name/:nconst',namesControler.nameData)
router.get('/name/:nconst/roles',namesControler.nameRoles)


module.exports=router