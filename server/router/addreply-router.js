import express from 'express'
import { getAddreply } from '../controller/addreply.js'

const router = new express.Router()

router.post('/addreply', getAddreply)

export default router
