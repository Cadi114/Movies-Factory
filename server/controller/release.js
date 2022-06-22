import db from '../db/index.js'

export async function releaseComment(req, res) {
  // console.log(req.body)
  if (req.body) {
    const comment = req.body
    await db.query(`insert into videocomment set ?`, comment)
    res.send({
      code: 200,
      status: 0,
      msg: '评论发表成功'
    })
  }
}
