import db from '../db/index.js'
import fs from 'fs'
import path from 'path'

const __dirname = path.resolve('..')

export async function postAllimg(req, res) {
  // 获取图片编码
  let imgdata = req.body.imgdata
  // 获取图片名字
  let imgname = req.body.imgname
  // 获取发起请求的用户Id
  let id = req.body.id

  // 把id和图片名字合并一起组成新的名字 便于区分不同用户图片名字重复问题
  let idimgdata = id + imgname

  let base64Data = imgdata.replace(/^data:image\/\w+;base64,/, '')

  let dataBuffer = new Buffer(base64Data, 'base64')

  console.log(id)
  // 先删除旧头像
  const [rows] = await db.query(`select user_pic from userinfo where id = ${id}`)
  fs.unlink(__dirname + `/server/img/user-portrait/${rows[0].user_pic}`, err => {
    if (err) {
      return console.log(err)
    }
  })

  fs.writeFile(__dirname + `/server/img/user-portrait/${idimgdata}`, dataBuffer, err => {
    if (err) {
      return console.log('失败' + err)
    } else {
      console.log(`update userinfo set user_pic='${idimgdata}' where Id=${id}`)
      db.query(`update userinfo set user_pic='${idimgdata}' where Id=${id}`)
      res.send({
        code: 200,
        status: 0,
        msg: '更换成功'
      })
    }
  })
}
