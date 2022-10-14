import db from '../db/index.js'

export async function postAddPraise(req, res) {
  if (req.body) {
    let [rows] = await db.query(`select praiseuserslist from videocomment where cid=${req.body.cid}`)
    // console.log(rows[0].praiseuserslist)
    // 判断是否有数组
    if (rows[0].praiseuserslist) {
      let list = JSON.parse(rows[0].praiseuserslist)
      list.push(req.body.uid)
      await db.query(`update videocomment set praiseuserslist='${JSON.stringify(list)}' where cid=${req.body.cid}`)
      res.send({
        code: 200,
        status: 0,
        msg: '点赞成功'
      })
    } else {
      let list = []
      list.push(req.body.uid)
      // 转换成 JSON字符串后 添加数组
      await db.query(`update videocomment set praiseuserslist='${JSON.stringify(list)}' where cid=${req.body.cid}`)
      res.send({
        code: 200,
        status: 0,
        msg: '点赞成功'
      })
    }
  }
}
