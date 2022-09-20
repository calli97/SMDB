'use strict'


const express=require('express')
const router=express.Router()

const {isLoggedIn,isNotLoggedIn}=require('../lib/auth')
const titleController = require('../controllers/titlesController')
const searchController = require('../controllers/searchController')
const userOpinionController = require('../controllers/userOpinionController')

router.get('/advancesearch',searchController.advanceSearch)

router.get('/search',searchController.search)

router.get('/listtitles',searchController.listTitles)

router.get('/title/:tconst',titleController.titleData)

router.post('/title/:tconst/add',isLoggedIn,userOpinionController.addOpinion)

router.put('/title/:tconst/update',isLoggedIn,userOpinionController.updateOpinion)

router.delete('/title/:tconst/delete',isLoggedIn,userOpinionController.deleteOpinion)

module.exports=router
