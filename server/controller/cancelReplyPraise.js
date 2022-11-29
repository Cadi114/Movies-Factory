import db from '../db/index.js'

// 取消回复的点赞
// export async function postCancelReplyPraise(req, res) {
//   if (req.body) {
//     let [rows] = await db.query(`select replypraiseuserslist from userreply where rid=${req.body.rid}`)
//     let list = JSON.parse(rows[0].replypraiseuserslist)
//     if (list.includes(req.body.uid)) {
//       list.splice(list.indexOf(req.body.uid), 1)
//       if (list.length > 0) {
//         await db.query(`update userreply set replypraiseuserslist='${JSON.stringify(list)}' where rid=${req.body.rid}`)
//       } else {
//         await db.query(`update userreply set replypraiseuserslist=${null} where rid=${req.body.rid}`)
//       }
//     } else {
//       return
//     }
//     res.send({
//       code: 200,
//       status: 0,
//       msg: '取消点赞成功'
//     })
//   }
// }

export function postCancelReplyPraise(req, res) {
  if (req.body) {
    db.query(`delete from replypraiseuserslist where rid = ${req.body.rid} and uid = ${req.body.uid}`).then(item => {
      res.send({
        code: 200,
        status: 0,
        msg: '取消点赞成功'
      })
    })

  }
}