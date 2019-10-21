module.exports = app => {
  const mongoose = require("mongoose")
  
  mongoose.connect('mongodb://localhost:27017/node-vue-moba', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    useFindAndModify: false,
    // 解决MongoDB弃用警告
    // https://mongoosejs.com/docs/deprecations.html#-findandmodify-
  });

}