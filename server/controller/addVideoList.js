import db from '../db/index.js'

export async function postAddVideoList(req, res) {
  if (req.body) {
    let [rows] = await db.query(`select * from userinfo where id = ${req.body.userId}`)
    if (rows[0].videolist) {
      // 获取旧列表
      let [oldlist] = await db.query(`select videolist from userinfo where id = ${req.body.userId}`)
      // 创建新列表 并把JSON转换成普通数据赋值给新列表
      let newlist = JSON.parse(oldlist[0].videolist)
      // 追加新的ID
      newlist.unshift(req.body.videoId)
      // 去重
      newlist = [...new Set(newlist)]
      if (newlist.length > 5) {
        newlist.pop()
      }
      // 重新更改数据库里的列表
      db.query(`update userinfo set videolist='${JSON.stringify(newlist)}' where Id=${req.body.userId}`)
    } else {
      let list = []
      list.push(req.body.videoId)
      // 转换成JSON字符串后 添加数组
      db.query(`update userinfo set videolist='${JSON.stringify(list)}' where Id=${req.body.userId}`)
    }
  }
}
