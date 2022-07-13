import fs from 'fs'

export function getVideo(req, res) {
  let url = '.' + req.url
  // 获取视频的部分信息 range
  let range = req.headers['range']
  // 判断是否获取到range，如果没有则整个视频输出出去。
  if (range) {
    //获取请求信息
    let stats = fs.statSync(url)
    let r = range.match(/=(\d+)-(\d+)?/)
    // 视频开始位置
    let start = parseInt(r[1], 10)
    // 视频结束位置
    let end = r[2] ? parseInt(r[2], 10) : start + 1024 * 1024
    if (end > stats.size - 1) end = stats.size - 1
    // 配置请求头
    let head = {
      // 文件类型
      'Content-Type': 'video/mp4',
      // 区块范围，视频长度
      'Content-Range': `bytes ${start} - ${end} / ${stats.size}`,
      // 区块长度
      'Content-Length': end - start + 1,
      'Accept-Ranges': 'bytes'
    }
    // 响应range的 http 状态
    res.writeHead(206, head)
    fs.createReadStream(url, { start: start, end: end }).pipe(res)
  } else {
    fs.createReadStream(url).pipe(res)
  }
}
