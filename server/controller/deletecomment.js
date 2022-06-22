import db from '../db/index.js'

export async function postDeleteComment(req, res) {
  console.log(req.body.cid)
  db.query(`delete from videocomment where cid = ?`, req.body.cid)
  res.send({
    code: 200,
    status: 0,
    msg: '此评论已删除'
  })
}
