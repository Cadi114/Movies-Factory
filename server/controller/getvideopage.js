import db from '../db/index.js'

export async function getVideoPage(req, res) {
  const [rows] = await db.query(`select * from moviesfactory.videoinfo limit ${req.query.old}, ${req.query.new} `)
  const [num] = await db.query(`select COUNT(*) AS NUM FROM videoinfo`)
  res.send({
    status: 0,
    message: '获取视频列表成功',
    data: rows,
    Page: num[0]
  })
}
