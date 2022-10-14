import db from '../db/index.js'

export async function getAllVideo(req, res) {
  // 判断是否传参
  // if (!req.query.id) {
  //   const [rows] = await db.query(`select * from videoinfo limit 0, 20 `)
  //   const [num] = await db.query(`select COUNT(*) AS NUM FROM videoinfo`)
  //   res.send({
  //     status: 0,
  //     message: '获取视频列表成功',
  //     data: rows,
  //     Page: num[0]
  //   })
  // } else {
  let [rows] = await db.query(`select * from videoinfo where vid=${req.query.id} `)
  // rows[0].film = await db.query(`select * from videodata where vid=${req.query.id}`)
  let [data] = await db.query(`select * from videodata where vid=${req.query.id}`)
  rows[0].film = data
  res.send({
    status: 0,
    message: '获取视频列表成功',
    data: rows[0]
  })
  // }
}
