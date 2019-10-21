const express = require('express')

const cors = require('cors')
// 使用cors解决跨域

const app = express()
app.use(express.json())
app.use(cors())
// 使用cors解决跨域

const router = require('./routes/admin')
const mongoosedb = require('./plugins/db')
router(app)
mongoosedb(app)


app.listen(3000,() => {
  console.log('启动成功：http://localhost:3000');  
})
