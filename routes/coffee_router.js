var router = require('koa-router');
const Coffee = require(__dirname + '/../models/coffee_model');
const handleDBError = require(__dirname + '/../lib/handle_db_error');

var coffeeRouter = module.exports = exports = new router();

coffeeRouter.get('/', function *(next) {
  yield Coffee.find({}, (err, data) => {
    console.log("err : " + err );
    console.log("data : " + data);
    if (err) return handleDBError(err, res);

    this.body = data;
    console.dir(this);
  });
});

coffeeRouter.put('/', function *(next) {
  var espresso = new Coffee({name: "super roaster espresso",
    flavor: "rich, bold, extra bitter",
    body: "creamy and extra full"
    cupPreference: "shot"
  });

  console.dir(this); //this will print to the console the
  //various parts of the next object, where we can inspect it for the
  //items that we have put in the PUT request. Then we can find where to
  //grab our info and save to the database. Yay!

  yield espresso.save((err, data) => {
    if(err) return handleDBError(err);

    this.body = data;
  });
});
