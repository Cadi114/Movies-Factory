import express from 'express'
import { getAllcomment } from '../controller/comment.js'
import { postDeleteComment } from '../controller/deletecomment.js'

const router = new express.Router()

router.get('/comment', getAllcomment)

router.post('/comment', postDeleteComment)

export default router
