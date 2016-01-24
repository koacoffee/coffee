var koa = require('koa');
const app = module.exports = exports = koa();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/coffee_app_dev');
var Coffee = require('./models/coffee_model');

const coffeeRouter = require(__dirname + '/routes/coffee_router');


app.use(coffeeRouter.routes())
  .use(coffeeRouter.allowedMethods());

app.listen(3000, () => console.log('Server started on port 3000.'));

  
//
// app.use(mongoose({
//     mongoose: require('mongoose-q')(),//custom mongoose
//     // user: '',
//     // pass: '',
//     host: '127.0.0.1',
//     port: 27017,
//     database: 'test',
//     db: {
//         native_parser: true
//     },
//     server: {
//         poolSize: 5
//     }
//   })
// );
//
//  //koa middleware function, calls next, use on all routes
// app.use(function* (next) {
//     var coffee = new Coffee({
//         name: "foldgers",
//         flavor: "mild",
//         body: "light",
//         fairTrade: false,
//         cupPreference: "mug"
//     });
//     yield coffee.save();
//     this.body = 'OK';
// });
