'use strict'

const express=require('express')
const router=express.Router()
const namesControler=require('../controllers/namesControllers')

router.get('/name/:nconst',namesControler.nameData)


module.exports=router