# KoaCoffee
The second framework assignment for Code Fellows Seattle JavaScript 401.
This is a single-resource REST app using the server-side HTTP framework Koa in combination with MongoDB.

Compare/Contrast with other apps built with vanilla Node and Express:

- Koa's middleware uses generators/iterators, and yield next().
- Koa does not have a built-in router, while Express does.
- Vanilla Node relies on conditional states.
- Koa uses ```this.request``` and ```this.response``` while Express uses ```(req,res)```

## Contents
+   [API](https://github.com/koacoffee/coffee#api)
+   [Dependencies](https://github.com/koacoffee/coffee#dependencies)
+   [Authors](https://github.com/koacoffee/coffee#authors)
+   [License](https://github.com/koacoffee/coffee#license)


## API
REST model (/api/coffee)
```
}
name: String,
flavor: String,
body: String,
fairTrade: Boolean,
cupPreference: {type: String, default: 'coffee cup'},
location: String
}
```

## Dependencies

```
"dependencies": {
  "glob": "^6.0.4",
  "koa": "^1.1.2",
  "koa-bodyparser": "^2.0.1",
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
