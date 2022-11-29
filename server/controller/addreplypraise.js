import db from '../db/index.js'

// export async function postAddReplyPraise(req, res) {
//   if (req.body) {
//     let [rows] = await db.query(`select replypraiseuserslist from userreply where rid=${req.body.rid}`)
//     // 判断是否有数组
//     if (rows[0].replypraiseuserslist) {
//       let list = JSON.parse(rows[0].replypraiseuserslist)
//       list.push(req.body.uid)
//       await db.query(`update userreply set replypraiseuserslist='${JSON.stringify(list)}' where rid=${req.body.rid}`)
//       res.send({
//         code: 200,
//         status: 0,
//         msg: '点赞成功'
//       })
//     } else {
//       let list = []
//       list.push(req.body.uid)
//       // 转换成 JSON字符串后 添加数组
//       await db.query(`update userreply set replypraiseuserslist='${JSON.stringify(list)}' where rid=${req.body.rid}`)
//       res.send({
//         code: 200,
//         status: 0,
//         msg: '点赞成功'
//       })
//     }
//   }
// }

export function postAddReplyPraise(req, res) {
  if (req.body) {
    db.query(`insert into replypraiseuserslist set ?`, req.body).then(item => {
      res.send({
        code: 200,
        status: 0,
        msg: '点赞成功'
      })
    })
  }
}