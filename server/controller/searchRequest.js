import db from '../db/index.js'

export async function searchRequest(req, res) {
  console.log(req.query.val.length);
  if (req.query.val.length > 0) {
    let [rows] = await db.query(`select vid,vname from videoinfo where vname like '%${req.query.val}%' limit 0,10`)
    console.log(rows);
    res.send({
      status: 0,
      message: '获取搜索相关内容成功',
      data: rows,
    })
  }
}