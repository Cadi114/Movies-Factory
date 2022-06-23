import express from 'express'
import { getAllUserinfo } from '../controller/getUserinfo.js'

const router = new express.Router()

router.get('/getuserinfo', getAllUserinfo)

export default router
