import express from 'express'
import { releaseComment } from '../controller/release.js'
import { postDeleteComment } from '../controller/deletecomment.js'
import { getAddreply } from '../controller/addreply.js'
import { postAllimg } from '../controller/addimg.js'
import { postDeleteReply } from '../controller/postDeleteReply.js'

const router = new express.Router()

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

export default router
