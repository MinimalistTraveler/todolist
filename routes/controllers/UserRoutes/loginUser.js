"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var errors = _interopRequireWildcard(require("restify-errors"));

var _index = _interopRequireDefault(require("../../../database/index"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var jwt = _interopRequireWildcard(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, email, password, foundedUser, isSame, newToken;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, email = _req$body.email, password = _req$body.password; // Check if the login user exist

            _context.next = 4;
            return (0, _index.default)("users").select("*").where("email", email).returning("*");

          case 4:
            foundedUser = _context.sent;

            if (!(JSON.stringify(foundedUser) === "[]")) {
              _context.next = 8;
              break;
            }

            res.send(new errors.BadRequestError("Invalid username or password"));
            return _context.abrupt("return", next());

          case 8:
            _context.next = 10;
            return _bcrypt.default.compare(password, foundedUser[0].hash);

          case 10:
            isSame = _context.sent;

            if (isSame) {
              _context.next = 14;
              break;
            }

            res.send(new errors.BadRequestError("Invalid username or password"));
            return _context.abrupt("return", next());

          case 14:
            _context.next = 16;
            return jwt.sign(_objectSpread({}, foundedUser[0], {
              hash: undefined
            }), process.env.SECRET, {
              expiresIn: "5h"
            });

          case 16:
            newToken = _context.sent;
            res.json({
              token: newToken
            });
            return _context.abrupt("return", next());

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](0);
            res.send(new errors.InternalServerError(_context.t0));
            return _context.abrupt("return", next());

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 21]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;