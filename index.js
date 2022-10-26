const express = require('express')
const app = express()
const multer = require('multer')
const fs = require('fs')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    cb(null, Date.now() + ext)
  }
})


const upload = multer({ dest: '/upload', storage })


app.use(express.static('./public'))
app.post('/', upload.single('file'), (req, res) => {
  fs.writeFileSync(req.file.buffer)
  res.send('Success')
})

const port = 8080
app.listen(port)