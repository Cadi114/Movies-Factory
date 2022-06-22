import db from '../db/index.js'

export async function getAllclass(req, res) {
  let [rows] = await db.query(`select * from videoinfo where vdistinguish like '%${req.query.val}%'`)
  res.send({
    status: 0,
    message: '获取视频列表成功',
    data: rows
  })
}
