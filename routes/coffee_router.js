var router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const coffeeModel = require(__dirname + '/../models/coffee_model');
const handleDBError = require(__dirname + '/../lib/handle_db_error');

var coffeeRouter = module.exports = exports = new router();

module.exports = exports = coffeeRouter
  .get('/', function* () {
    try {
      const data = yield coffeeModel.find({}).exec();
        this.response.status = 200;
        this.response.body = data;
      } catch (e) {
        errorHandler(e).bind(this);
      }
    })
    .post('/', bodyParser(), function* () {
      const newCoffee = yield coffeeModel.create(this.request.body);
      try {
        const data = yield newCoffee.save();
        this.response.status = 200;
        this.response.body = data;
      } catch (e) {
        errorHandler(e).bind(this);
      }
    })
    .put('/:id', bodyParser(), function* () {
      const putBody = this.request.body;
      delete putBody._id;
      try {
        yield coffeeModel.update({ _id: this.params.id }, putBody).exec();
        this.response.status = 200;
        this.response.body = { msg: 'Success' };
      } catch (e) {
        errorHandler(e).bind(this);
      }
    })
    .delete('/:id', function* () {
      try {
        yield coffeeModel.remove({ _id: this.params.id });
        this.response.status = 200;
        this.response.body = { msg: 'Success' };
      } catch (e) {
        errorHandler(e).bind(this);
      }
    });
