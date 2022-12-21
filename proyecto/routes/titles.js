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

router.get('/title/:tconst/crew',titleController.getTitleCrew)

router.get('/title/:tconst/principals',titleController.getTitlePrincipals)

router.get('/title/:tconst/score',titleController.getTitleScore)

router.get('/title/:tconst/useropinion',titleController.getUserOpinion)

router.post('/title/:tconst',isLoggedIn,userOpinionController.addOpinion)

router.put('/title/:tconst',isLoggedIn,userOpinionController.updateOpinion)

router.delete('/title/:tconst',isLoggedIn,userOpinionController.deleteOpinion)

module.exports=router
