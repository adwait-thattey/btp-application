const http = require('http')
const fs = require('fs')

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'content-type': 'text/html' })
//   fs.createReadStream('index.html').pipe(res)
// })

exports.serveUI = (req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' })
  fs.createReadStream('/run/media/coderdude/Adwait/Projects/btp_fabric/tutorials/fabric-samples/asset-transfer-basic/application-javascript/ui/index.html').pipe(res)
}