import axios from 'axios'
// 根据id获取用户信息

export default async function (id) {
  return await axios.get(`http://127.0.0.1:8080/api/getuserinfo?id=${id}`)
}
