import express from 'express'
import { postAllreg } from '../controller/regUser-ctrl.js'

const router = new express.Router()

router.post('/register', postAllreg)

export default router
