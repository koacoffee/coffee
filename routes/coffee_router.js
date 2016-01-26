var router = require('koa-router');
var parser = require('koa-bodyparser');
const Coffee = require(__dirname + '/../models/coffee_model');
const handleDBError = require(__dirname + '/../lib/handle_db_error');

var coffeeRouter = new router();

coffeeRouter.get('/', function *(next) {

  yield Coffee.find({}, (err, data) => {
    if (err) return handleDBError(err, data);

    this.body = data;
  });
});

//Thanks to cf-api-project for assist!
coffeeRouter.post('/', parser(), function *(next) {

  if(this.request.body){
    const newCof = yield Coffee.create(this.request.body);
    console.log('newCof : ' + newCof);

    try{
      const data = yield newCof.save();
      this.response.status = 200;
      this.response.body = data;
    }
    catch (e){
      handleDBError(e, this.response).bind(this);
    }

  }



});
module.exports = exports = coffeeRouter;
