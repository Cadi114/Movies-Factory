import db from '../db/index.js'

export async function postdeleteCollection(req, res) {
  console.log(req.body);
  if (req.body) {
    let [rows] = await db.query(`select filmcollection from userinfo where Id=${req.body.userId}`)
    let list = JSON.parse(rows[0].filmcollection)
    if (list.includes(req.body.videoId)) {
      list.splice(list.indexOf(req.body.videoId), 1)
      if (list.length > 0) {
        db.query(`update userinfo set filmcollection='${JSON.stringify(list)}' where Id=${req.body.userId}`).then(item => {
          res.send({
            code: 200,
            status: 0,
            msg: '取消收藏成功'
          })
        })
      } else {
        db.query(`update userinfo set filmcollection=${null} where Id=${req.body.userId}`).then(item => {
          res.send({
            code: 200,
            status: 0,
            msg: '取消收藏成功'
          })
        })
      }
    } else {
      res.send({
        code: 301,
        status: 0,
        msg: '取消收藏失败'
      })
    }

  }
}