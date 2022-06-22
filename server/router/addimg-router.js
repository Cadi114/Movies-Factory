import express from 'express'
import { postAllimg } from '../controller/addimg.js'

const router = new express.Router()

router.post('/addimg', postAllimg)

export default router
