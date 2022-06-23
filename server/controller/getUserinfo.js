import db from '../db/index.js'

export async function getAllUserinfo(req, res) {
  let [rows] = await db.query(`select * from userinfo where id = ${req.query.id}`)
  res.send({
    status: 0,
    message: '获取用户信息表成功',
    userinfo: rows
  })
}
