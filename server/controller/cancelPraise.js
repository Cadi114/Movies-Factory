import db from '../db/index.js'

export async function postCancelPraise(req, res) {
  if (req.body) {
    let [rows] = await db.query(`select praiseuserslist from videocomment where cid=${req.body.cid}`)
    let list = JSON.parse(rows[0].praiseuserslist)
    if (list.includes(req.body.uid)) {
      list.splice(list.indexOf(req.body.uid), 1)
      if (list.length > 0) {
        await db.query(`update videocomment set praiseuserslist='${JSON.stringify(list)}' where cid=${req.body.cid}`)
      } else {
        await db.query(`update videocomment set praiseuserslist=${null} where cid=${req.body.cid}`)
      }
    } else {
      return
    }
    res.send({
      code: 200,
      status: 0,
      msg: '点赞成功'
    })
  }
}
