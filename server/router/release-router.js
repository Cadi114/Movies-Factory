import express from 'express'
import { releaseComment } from '../controller/release.js'

const router = new express.Router()

router.post('/release', releaseComment)

export default router
