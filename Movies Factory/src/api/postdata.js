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

export default { postLogin, postRegister, postRelease, postDeleteComment, postAddreply, postAddImg }
