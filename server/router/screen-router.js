import express from 'express'
import { getAllscreen } from '../controller/screen-ctrl.js'

const router = new express.Router()

router.get('/screen', getAllscreen)

export default router
