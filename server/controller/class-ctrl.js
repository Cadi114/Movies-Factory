import db from '../db/index.js'

export async function getAllclass(req, res) {
  const [num] = await db.query(`select COUNT(*) AS NUM FROM videoinfo where vdistinguish like '%${req.query.val}%'`)
  if (req.query.p) {
    let oldnum = req.query.p * 20 - 20
    let [rows] = await db.query(`select * from videoinfo where vdistinguish like '%${req.query.val}%' limit ${oldnum}, ${req.query.p * 20}`)
    res.send({
      status: 0,
      message: '获取视频列表成功',
      data: rows,
      Page: num[0]
    })
  } else {
    let [rows] = await db.query(`select * from videoinfo where vdistinguish like '%${req.query.val}%' limit 0, 20`)
    res.send({
      status: 0,
      message: '获取视频列表成功',
      data: rows,
      Page: num[0]
    })
  }
}
