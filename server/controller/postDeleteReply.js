import db from '../db/index.js'

export async function postDeleteReply(req, res) {
  db.query(`delete from userreply where rid = ?`, req.body.rid)
  res.send({
    code: 200,
    status: 0,
    msg: '此回复已删除'
  })
}
