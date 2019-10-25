const express = require('express')

// 使用cors解决跨域
const cors = require('cors')

const app = express()
app.use(express.json())
// 使用cors解决跨域
app.use(cors())
// 静态文件托管
app.use('/uploads',express.static(__dirname + '/uploads'))
const router = require('./routes/admin')
const mongoosedb = require('./plugins/db')
router(app)
mongoosedb(app)


app.listen(3000,() => {
  console.log('启动成功：http://localhost:3000');  
})
