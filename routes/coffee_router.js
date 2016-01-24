var app = require('koa')();
var router = require('koa-router');
const jsonParser = require('body-parser').json();
const Coffee = require(__dirname + '/../models/coffee_model');

const handleDBError = require(__dirname + '/../lib/handle_db_error');

var coffeeRouter = module.exports = exports = new router();

coffeeRouter.get('/', function *(next) {
  yield Coffee.find({}, (err, data) => {
    console.log("err : " + err );
    console.log("data : " + data);
    if (err) return handleDBError(err, res);

    this.body = data;
  });

});
