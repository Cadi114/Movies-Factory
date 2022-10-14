import request from '../utils/request'

// 登录api
function postLogin(data = {}) {
  return request({
    method: 'POST',
    url: '/api/login',
    data
  })
}

//注册api
function postRegister(data = {}) {
  return request({
    method: 'POST',
    url: '/api/register',
    data
  })
}

//发表评论api
function postRelease(data = {}) {
  return request({
    method: 'POST',
    url: '/api/release',
    data
  })
}

//删除评论api
function postDeleteComment(data = {}) {
  return request({
    method: 'POST',
    url: '/api/comment',
    data
  })
}

//删除回复api
function postDeleteReply(data = {}) {
  return request({
    method: 'POST',
    url: '/api/deletereply',
    data
  })
}

//回复评论api
function postAddreply(data = {}) {
  return request({
    method: 'POST',
    url: '/api/addreply',
    data
  })
}

//更换头像api
function postAddImg(data = {}) {
  return request({
    method: 'POST',
    url: '/api/addimg',
    data
  })
}

// 添加观影记录
function postAddVideoList(data = {}) {
  return request({
    method: 'POST',
    url: '/api/addvidolist',
    data
  })
}

// 获取最近观看列表
function postUserVideoList(data = {}) {
  return request({
    method: 'POST',
    url: '/api/uservideolist',
    data
  })
}

// 点赞按钮
function postAddPraise(data = {}) {
  return request({
    method: 'POST',
    url: '/api/addpraise',
    data
  })
}

// 取消点赞
function postCancelPraise(data = {}) {
  return request({
    method: 'POST',
    url: '/api/cancelpraise',
    data
  })
}

export default { postLogin, postRegister, postRelease, postDeleteComment, postAddreply, postAddImg, postDeleteReply, postAddVideoList, postUserVideoList, postAddPraise, postCancelPraise }
