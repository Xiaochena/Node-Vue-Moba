module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams:true
  })
  // const Category = require('../../models/Category')

  router.post('/',async(req,res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  router.put('/:id',async(req,res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
  })

  router.delete('/:id',async(req,res) =>{
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      sccess:true
    })
  })
  router.get('/',async(req,res) => {
    const quertOptions = {}
    if(req.Model.modelName === 'Category'){
      quertOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(quertOptions).limit(10)
    res.send(items)
  })

  router.get('/:id',async (req,res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  app.use('/admin/api/rest/:resource', async(req,res,next) => {
    const modelName = require('inflection').classify(req.params.resource)
    // 使用inflection插件使得接收到的 resource 改变大小写等
    req.Model = require(`../../models/${modelName}`)
    next()
  },router)


  // 文件上传
  // 使用插件multer： npm install --save multer
  const multer = require('multer')
  const upload = multer({dest:__dirname + '/../../uploads'})
  app.post('/admin/api/upload',upload.single('file'),async (req,res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
} 