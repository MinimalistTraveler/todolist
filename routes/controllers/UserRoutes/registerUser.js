"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var errors = _interopRequireWildcard(require("restify-errors"));

var _index = _interopRequireDefault(require("../../../database/index"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _validators = require("../../validators/validators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Helper
function notValid(res, next) {
  res.send(new errors.BadRequestError("Invalid credentials please, try again."));
  return next();
} // Main Route Controller.


var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, email, password, username, isValidEmail, isValidPass, isValidUsername, hash, User, existUser, newUser;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, email = _req$body.email, password = _req$body.password, username = _req$body.username; // Validate Email

            _context.next = 4;
            return (0, _validators.validateEmail)(email);

          case 4:
            isValidEmail = _context.sent;

            if (isValidEmail) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", notValid(res, next));

          case 7:
            // Validate Password
            isValidPass = (0, _validators.validatePass)(password);

            if (isValidPass) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", notValid(res, next));

          case 10:
            // Validate Username
            isValidUsername = (0, _validators.validateUsername)(username);

            if (isValidUsername) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", notValid(res, next));

          case 13:
            _context.next = 15;
            return _bcrypt.default.hash(password, 14);

          case 15:
            hash = _context.sent;
            // Create User
            User = {
              username: username,
              email: email,
              hash: hash
            }; // Find user with same username or email

            _context.next = 19;
            return (0, _index.default)("users").where("email", User.email).orWhere("username", User.username).returning("*");

          case 19:
            existUser = _context.sent;

            if (!(JSON.stringify(existUser) !== "[]")) {
              _context.next = 23;
              break;
            }

            res.send(new errors.BadRequestError("A user with that already exists!"));
            return _context.abrupt("return", next());

          case 23:
            _context.next = 25;
            return (0, _index.default)("users").insert(User).returning("*");

          case 25:
            newUser = _context.sent;
            // Get response
            res.json(newUser[0]);
            return _context.abrupt("return", next());

          case 30:
            _context.prev = 30;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0.message);
            res.send(new errors.InternalServerError("Something went wrong with our servers."));
            return _context.abrupt("return", next());

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 30]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;