const express = require('express')
const path = require('path')
const app = express()
const port = 8080
const multer  = require('multer')
const {mergePdfs} = require('./merge')
app.use('/static', express.static('Public'))
const upload = multer({ dest: 'uploads/' })

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "Templates/index.html"))
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) =>{
  console.log(req.files)

  let d =await mergePdfs(path.join(__dirname, req.files[0].path ), path.join(__dirname, req.files[1].path ))
  res.redirect(`http://localhost:8080/static/${d}.pdf`)
})

app.listen(port, () => {
  console.log(`Example app listening on port http:\\localhost:${port}`)
})