var koa = require('koa');
const app = module.exports = exports = koa();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/coffee_app_dev');
var Coffee = require('./models/coffee_model');
const coffeeRouter = require(__dirname + '/routes/coffee_router');

app.use(coffeeRouter.routes())
  .use(coffeeRouter.allowedMethods());

app.listen(3000, () => console.log('Server started on port 3000.'));
