import express from 'express'
import { postAlllogin } from '../controller/login-ctrl.js'

const router = new express.Router()

router.post('/login', postAlllogin)

export default router
