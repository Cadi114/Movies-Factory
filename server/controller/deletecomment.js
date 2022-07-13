import db from '../db/index.js'

export async function postDeleteComment(req, res) {
  console.log(req.body.cid)
  //先删除回复列表中对应的回复，在删除评论本身
  db.query(`delete from userreply where cid = ?`, req.body.cid)
  db.query(`delete from videocomment where cid = ?`, req.body.cid)
  res.send({
    code: 200,
    status: 0,
    msg: '此评论已删除'
  })
}
