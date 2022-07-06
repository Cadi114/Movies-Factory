import db from '../db/index.js'
import fs from 'fs'

// 解析UTF8中文编码
function revertUTF8(szInput) {
  var x,
    wch,
    wch1,
    wch2,
    uch = '',
    szRet = ''
  for (x = 0; x < szInput.length; x++) {
    if (szInput.charAt(x) == '%') {
      wch = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16)
      if (!wch) {
        break
      }
      if (!(wch & 0x80)) {
        wch = wch
      } else if (!(wch & 0x20)) {
        x++
        wch1 = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16)
        wch = (wch & 0x1f) << 6
        wch1 = wch1 & 0x3f
        wch = wch + wch1
      } else {
        x++
        wch1 = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16)
        x++
        wch2 = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16)
        wch = (wch & 0x0f) << 12
        wch1 = (wch1 & 0x3f) << 6
        wch2 = wch2 & 0x3f
        wch = wch + wch1 + wch2
      }
      szRet += String.fromCharCode(wch)
    } else {
      szRet += szInput.charAt(x)
    }
  }
  return szRet
}

export async function getImg(req, res) {
  const newurl = revertUTF8(req.url)
  fs.readFile('.' + newurl, function (err, data) {
    res.send(data)
  })
}
