import db from '../db/index.js'

export async function getAllcomment(req, res) {
  // 获取页码，并计算获取数量
  let newcount = req.query.commentpage * 20
  let oldcount = newcount - 20
  let sql
  if (req.query.Commentsorting == 'true') {
    sql = `select * from videocomment,userinfo where uid = Id and vid = ${req.query.id} order by length(praiseuserslist)desc,date desc limit ${oldcount},${newcount}`
  } else {
    sql = `select * from videocomment,userinfo where uid = Id and vid = ${req.query.id} order by date desc limit ${oldcount},${newcount}`
  }

  // 搜索此视频的总评论数量
  const numsql = `select COUNT(*) AS NUM FROM videocomment where vid = ${req.query.id}`
  const [rows] = await db.query(sql)
  const [num] = await db.query(numsql)
  let arr = rows
  for (let i = 0; i < arr.length; i++) {
    const [rows] = await db.query(`select * from userinfo,userreply where uid = Id and cid=${arr[i].cid} order by date desc`)
    // 数组翻转 让最新发布的回复保持在最下面
    arr[i].userreply = rows.reverse()
    arr[i].praiseuserslist = JSON.parse(arr[i].praiseuserslist)
  }

  res.send({
    status: 0,
    message: '获取评论列表成功',
    data: arr,
    count: num
  })
}
