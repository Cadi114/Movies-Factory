import request from '../utils/request'

// 获取电影列表api
function getVideoInfo(data = {}) {
  return request({
    method: 'GET',
    url: '/api/videoinfo',
    data
  })
}

// 获取电影数据api
function getVideoInfoID(id, data = {}) {
  return request({
    method: 'GET',
    url: '/api/videoinfo?id=' + id,
    data
  })
}

// 获取查询电影api
function getAllscreen(val, data = {}) {
  return request({
    method: 'GET',
    url: '/api/screen?val=' + val,
    data
  })
}

// 获取评论api
function getComments(id, data = {}) {
  return request({
    method: 'GET',
    url: '/api/comment?id=' + id,
    data
  })
}

// 获取电影、剧集列表
function getClass(val, data = {}) {
  return request({
    method: 'GET',
    url: '/api/class?val=' + val,
    data
  })
}

//获取用户信息
function getUserInfo(id, data = {}) {
  return request({
    method: 'GET',
    url: '/api/getuserinfo?id=' + id,
    data
  })
}

export default { getVideoInfo, getVideoInfoID, getAllscreen, getComments, getClass, getUserInfo }
