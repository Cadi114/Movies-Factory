import db from '../db/index.js'

export async function getAllcomment(req, res) {
  let sql = `select * from videocomment,userinfo where uid = Id and vid = ${req.query.id} order by date desc `
  const [rows] = await db.query(sql)
  // rows.forEach(async (item, index) => {
  //   const [rows] = await db.query(`select * from userinfo,userreply where uid = Id and cid=${item.cid} order by date desc`)
  //   item.userreply = rows
  //   console.log(item)
  // })
  // for (item of rows) {
  //   const [rows] = await db.query(`select * from userinfo,userreply where uid = Id and cid=${item.cid} order by date desc`)
  //   item.userreply = rows
  //   console.log(item)
  // }
  let arr = rows

  for (let i = 0; i < arr.length; i++) {
    const [rows] = await db.query(`select * from userinfo,userreply where uid = Id and cid=${arr[i].cid} order by date desc`)
    arr[i].userreply = rows
    console.log(arr[i])
  }
  res.send({
    status: 0,
    message: '获取评论列表成功',
    data: arr
  })
}
