import express from 'express'
import { getAllVideo } from '../controller/video-ctrl.js'
import { getAllUser } from '../controller/user_ctrl.js'
import { getAllscreen } from '../controller/screen-ctrl.js'
import { getAllUserinfo } from '../controller/getUserinfo.js'
import { getAllcomment } from '../controller/comment.js'
import { getAllclass } from '../controller/class-ctrl.js'

const router = new express.Router()

// 获取视频数据
router.get('/videoinfo', getAllVideo)
// 获取用户信息
router.get('/user', getAllUser)
// 获取搜索信息
router.get('/screen', getAllscreen)
// 获取自身用户信息
router.get('/getuserinfo', getAllUserinfo)
//获取评论列表
router.get('/comment', getAllcomment)
//获取筛选列表
router.get('/class', getAllclass)

export default router
