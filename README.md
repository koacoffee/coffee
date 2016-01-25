# KoaCoffee
The second framework assignment for Code Fellows Seattle JavaScript 401.
This is a single resource REST app using the server-side framework Koa in combination with MongoDB.

Compare/Contrast with other apps built with vanilla Node and Express:
<!-- Enter analysis here -->


## Contents

+   [Getting Started](https://github.com/koacoffee/coffee#getting-started)
+   [API](https://github.com/koacoffee/coffee#api)
  +   [Server](https://github.com/koacoffee/coffee#server)
  +   [Router](https://github.com/koacoffee/coffee#router)
+   [Writing Middleware](https://github.com/koacoffee/coffee#writing-middleware)
+   [Dependencies](https://github.com/koacoffee/coffee#dependencies)
+   [Authors](https://github.com/koacoffee/coffee#authors)
+   [License](https://github.com/koacoffee/coffee#license)

## Getting started

Here's how you would get up and running with a server on port 3000 with GET and POST routes.

```js
const server = require('koacoffee');
const router = new server.Router;

router
  .get('/', (req, res) => res.send('Hello World!'))
  .post('/api/test', (req, res) => {
    res.send('Successfully posted' + JSON.stringify(req.body));
  });

const app = server.start(router).listen(3000);
```

## API

### Server

#### server.start(router)

This method takes in a router object and returns a node http server.
The router needs to have a `route` method that knows how to handle the
http `req` and `res` parameters. The server is where the JSON parsing middleware
lives, but it comes built-in, no batteries required!

```js
const app = server.start(router);
app.listen(3000);
```

#### server.Router()

Constructor for the router object. Must be called with the `new` keyword.

```js
const router = new server.Router();
```

#### app.use(function(req, res))

Adds a middleware function to the running server. This function runs before requests are
handled and should be used to perform any transforms or processing you want to
do for every request. For example, you could create middleware that would parse
query strings into an object and add it as a property of `req`.

```js
const app = server.start(router);
app.use((req, res) => req.query = queryStringParser(req));
app.listen(3000);
```

#### req.body

If JSON was sent in the request, this field will be automatically populated by
our JSON parsing middleware. It will be of type `object` if populated and `null`
otherwise.

#### res.send(message, [contentType])

Built-in middleware adds this function to all response objects.
This will automatically handle writing headers and closing the connection to
simplify writing responses. It can detect JSON, HTML, and plaintext responses.
Optional second parameter can be used to override the autodetect and use a
specific Content-Type.

```js
router.post('/index', (req, res) => {
  // Will use Content-Type application/json
  res.send({ 'hello': 'world' });
});

router.get('/test' (req, res) => {
  // Will use Content-Type text/plain
  res.send('Hello world!');
});
```

### Router

#### router.get(path, callback(req, res))

Adds a `GET` route that handles requests with the passed in callback.
Returns the router to allow for method chaining.

```js
router.get('/index', (req, res) => {
  res.send('Hello world!');
});
```

#### router.post(path, callback(req, res))

Adds a `POST` route that handles requests with the passed in callback.
Returns the router to allow for method chaining.
See `router.get` docs for example usage.

#### router.put(path, callback(req, res))

Adds a `PUT` route that handles requests with the passed in callback.
Returns the router to allow for method chaining.
See `router.get` docs for example usage.

#### router.patch(path, callback(req, res))

Adds a `PATCH` route that handles requests with the passed in callback.
Returns the router to allow for method chaining.
See `router.get` docs for example usage.

#### router.delete(path, callback(req, res))

Adds a `DELETE` route that handles requests with the passed in callback.
Returns the router to allow for method chaining.
See `router.get` docs for example usage.


#### router.route(req, res)

This is the method the server should call when a request is made. It routes to
entries on the routing table using the `method` and `url` properties of the `req`
and runs the callback. Generally you want to be passing this in when you create your server.

See the Getting Started Guide for an example of where you use this.

#### router.routes

Object that holds the current routing table. Here's what it might look like for
the code in the Getting Started Guide.

```js
{
  'GET': {
    '/': (req, res) => res.send('Hello World!')
  },
  'POST': (req, res) => {
    res.send('Successfully posted' + JSON.stringify(req.body));
  },
  'PUT': {},
  'PATCH': {},
  'DELETE': {},
  '404': (req, res) => req.send('404 Not Found')
}
```



## Dependencies

```
"dependencies": {
  "glob": "^6.0.4",
  "koa": "^1.1.2",
  "koa-mongo": "^0.5.0",
  "koa-mongoose": "^1.0.9",
  "koa-router": "^5.3.0",
  "mongoose": "^4.3.7",
  "mongoose-q": "^0.1.0"
},
"devDependencies": {
  "chai": "^3.4.1",
  "chai-http": "^1.0.0",
  "gulp": "^3.9.0",
  "gulp-eslint": "^1.1.1",
  "gulp-mocha": "^2.2.0",
  "gulp-util": "^3.0.7",
  "mocha": "^2.3.4"
}
```

## Authors

This server/router was written by [Aaron Filson](https://github.com/AaronFilson) and
[Erika Hokanson](https://github.com/erikawho) as coursework for JavaScript 401 at Code Fellows.

## License

This project is licensed under the terms of the MIT license.
