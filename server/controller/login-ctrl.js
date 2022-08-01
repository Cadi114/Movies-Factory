import db from '../db/index.js'

export async function postAlllogin(req, res) {
  const userinfo = req.body

  if (!userinfo.email || !userinfo.password) {
    return res.send({
      code: 300,
      status: 1,
      msg: '账户或密码不能为空'
    })
  }

  const sql = `select * from userinfo where email=?`

  const [rows] = await db.query(sql, userinfo.email)

  if (rows.length <= 0) {
    res.send({
      code: 301,
      status: 1,
      msg: '邮箱不存在'
    })
  } else if (rows[0].password != userinfo.password) {
    res.send({
      code: 302,
      status: 1,
      msg: '密码错误'
    })
  } else {
    res.send({
      code: 200,
      status: 0,
      msg: '登录成功',
      data: { Id: rows[0].Id, email: rows[0].email, user_pic: rows[0].user_pic, user_status: rows[0].user_status, username: rows[0].username }
    })
  }
}
