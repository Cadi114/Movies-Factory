import express from 'express'
import { postAlllogin } from '../controller/login-ctrl.js'
import { postAllreg } from '../controller/regUser-ctrl.js'

const router = new express.Router()

router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'content-type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

router.post('/login', postAlllogin)
router.post('/register', postAllreg)

export default router
