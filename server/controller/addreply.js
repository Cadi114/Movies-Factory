import db from '../db/index.js'

export async function getAddreply(req, res) {
  console.log(req.body)
  if (req.body) {
    const comment = req.body
    await db.query(`insert into userreply set ?`, comment)
    res.send({
      code: 200,
      status: 0,
      msg: '评论发表成功'
    })
  }
}
