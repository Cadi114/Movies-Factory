import db from '../db/index.js'

export async function postAllreg(req, res) {
  const userinfo = req.body

  if (!userinfo.email || !userinfo.password || !userinfo.username || !userinfo.okpassword) {
    return res.send({
      code: 303,
      status: 1,
      msg: '账户、邮箱、密码、确认密码 不能为空！'
    })
  } else if (userinfo.password != userinfo.okpassword) {
    return res.send({
      code: 304,
      status: 1,
      msg: '密码与确认密码不相同！'
    })
  }

  const sql = `select * from userinfo where email=? or username=?`

  const [rows] = await db.query(sql, [userinfo.email, userinfo.username])

  if (rows.length > 0) {
    return res.send({
      code: 305,
      status: 1,
      msg: '邮箱或用户名已被占用'
    })
  }
  // 插入新用户
  const sqlStr = `insert into userinfo set ?`
  db.query(sqlStr, { username: userinfo.username, password: userinfo.password, email: userinfo.email })

  res.send({
    code: 200,
    status: 0,
    msg: '注册成功'
  })
}
