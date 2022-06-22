import db from '../db/index.js'

export async function getAllcomment(req, res) {
  let sql = `select * from videocomment,userinfo where uid = Id and vid = ${req.query.id} order by date desc `
  const [rows] = await db.query(sql)
  res.send({
    status: 0,
    message: '获取评论列表成功',
    data: rows
  })
}
