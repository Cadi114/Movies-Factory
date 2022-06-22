import express from 'express'
import { getAllVideo } from '../controller/video-ctrl.js'

const router = new express.Router()

router.get('/videoinfo', getAllVideo)

export default router
