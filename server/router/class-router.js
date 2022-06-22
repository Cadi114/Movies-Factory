import express from 'express'
import { getAllclass } from '../controller/class-ctrl.js'

const router = new express.Router()

router.get('/class', getAllclass)

export default router
