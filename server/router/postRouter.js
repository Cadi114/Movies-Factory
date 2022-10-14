import express from 'express'
import { releaseComment } from '../controller/release.js'
import { postDeleteComment } from '../controller/deletecomment.js'
import { getAddreply } from '../controller/addreply.js'
import { postAllimg } from '../controller/addimg.js'
import { postDeleteReply } from '../controller/postDeleteReply.js'
import { postAddVideoList } from '../controller/addVideoList.js'
import { getUserVidoList } from '../controller/getUserVidoList.js'
import { postAddPraise } from '../controller/addpraise.js'
import { postCancelPraise } from '../controller/cancelPraise.js'

const router = new express.Router()

router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'content-type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

// 发布评论
router.post('/release', releaseComment)
// 删除评论
router.post('/comment', postDeleteComment)
// 添加回复
router.post('/addreply', getAddreply)
// 更换头像
router.post('/addimg', postAllimg)
// 删除回复
router.post('/deletereply', postDeleteReply)
// 添加观看记录
router.post('/addvidolist', postAddVideoList)
// 获取最近观看列表
router.post('/uservideolist', getUserVidoList)
// 添加点赞数量
router.post('/addpraise', postAddPraise)
// 取消点赞
router.post('/cancelpraise', postCancelPraise)

export default router
