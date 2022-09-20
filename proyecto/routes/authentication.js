'use strict'

const express=require('express')
const router=express.Router()

const userController = require('../controllers/userController')
const {isLoggedIn,isNotLoggedIn}=require('../lib/auth')

router.post('/signup',isNotLoggedIn,userController.register)

router.post('/signin',isNotLoggedIn,userController.userVerification)

router.get('/logout',isLoggedIn,userController.logout)

module.exports=router
