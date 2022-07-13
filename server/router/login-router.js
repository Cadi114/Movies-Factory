import express from 'express'
import { postAlllogin } from '../controller/login-ctrl.js'
import { postAllreg } from '../controller/regUser-ctrl.js'

const router = new express.Router()

router.post('/login', postAlllogin)
router.post('/register', postAllreg)

export default router
