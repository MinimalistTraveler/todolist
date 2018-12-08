"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _knex = _interopRequireDefault(require("knex"));

var _dotenv = require("dotenv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();
var options = process.env.NODE_ENV === "production" ? {
  connectionString: process.env.DATABASE_URL,
  ssl: true
} : {
  host: "127.0.0.1",
  user: process.env.USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: "todolist2"
};

var _default = (0, _knex.default)({
  client: "pg",
  connection: options
});

exports.default = _default;