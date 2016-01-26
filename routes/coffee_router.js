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
    const myNewCoffee = yield Coffee.create(this.request.body);

    try{
      const data = yield myNewCoffee.save();
      this.response.status = 200;
      this.response.body = data;
    }
    catch (e){
      handleDBError(e, this.response).bind(this);
    }
  }
});

coffeeRouter.put('/:id', parser(), function* (){

  if(this.request.body){

    var coffeeToUpdate = this.request.body;
    delete coffeeToUpdate._id;

    try{
      yield Coffee.update({ _id: this.params.id }, coffeeToUpdate).exec();
      this.response.status = 200;
      this.response.body = { msg: 'success' };
    }
    catch (e){
      handleDBError(e, this.response).bind(this);
    }
  }

});
module.exports = exports = coffeeRouter;
