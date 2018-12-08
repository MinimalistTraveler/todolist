"use strict";

require("@babel/polyfill");

var _restify = _interopRequireDefault(require("restify"));

var _routes = _interopRequireDefault(require("./routes/routes"));

var _restifyCorsMiddleware = _interopRequireDefault(
  require("restify-cors-middleware")
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var PORT = process.env.PORT || 5000;

var server = _restify.default.createServer({
  name: "Todolist App"
}); // CORS

var cors = (0, _restifyCorsMiddleware.default)({
  preflightMaxAge: 5,
  origins: ["http://localhost:5000/", "http://localhost:3000"],
  allowHeaders: ["API-Token", "Authorization"],
  exposeHeaders: ["API-Token-Expiry"]
});
server.pre(cors.preflight);
server.use(cors.actual); // API ROUTER

_routes.default.applyRoutes(server, "/api"); // Plugins

server.use(_restify.default.plugins.bodyParser());
server.use(_restify.default.plugins.queryParser()); // Listening

server.listen(PORT, function() {
  return console.log("Listening on port ".concat(PORT));
});
