import db from '../db/index.js'

export async function getUserVidoList(req, res) {
  if (req.body) {
    let list = []
    let filmcollectionList = []
    console.log(req.body);
    for (var i = 0; i < req.body.videolist.length; i++) {
      let [rows] = await db.query(`select vid,vname,vimg from videoinfo where vid = ${req.body.videolist[i]} `)
      // let [abc] = await db.query(`select vid,vname,vimg from videoinfo where vid = ${req.body[i]} `)
      list.push(rows[0])
    }

    for (var i = 0; i < req.body.filmcollection.length; i++) {
      let [filmcollection] = await db.query(`select vid,vname,vimg from videoinfo where vid = ${req.body.filmcollection[i]} `)
      filmcollectionList.push(filmcollection[0])
    }
    res.send({
      status: 0,
      message: '获取最近观看列表成功',
      data: list,
      filmcollectionList: filmcollectionList
    })
  }
}
