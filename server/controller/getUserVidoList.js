import db from '../db/index.js'

export async function getUserVidoList(req, res) {
  if (req.body) {
    let list = []

    for (var i = 0; i < req.body.length; i++) {
      let [rows] = await db.query(`select vid,vname,vimg from videoinfo where vid = ${req.body[i]} `)
      list.push(rows[0])
    }
    res.send({
      status: 0,
      message: '获取最近观看列表成功',
      data: list
    })
  }
}
