import db from '../db/index.js'

export async function getAllUser(req, res) {
  const [rows] = await db.query(`select id,username,email from userinfo `)

  res.send({
    status: 0,
    message: '获取用户列表成功',
    data: rows
  })
}
