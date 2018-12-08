"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../../../database/index"));

var errors = _interopRequireWildcard(require("restify-errors"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _validators = require("../../validators/validators");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    var _req$body, username, email, password, updatedUser, isValEmail, isValPass, isValUser, userUpdate;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
            /* 
              Use updatedUser instead of req.body in case if it is undefined
              it will not crash the validator functions. Instead we will handle it ourselves. 
             */

            updatedUser = {
              username: username === undefined ? "" : username,
              email: email === undefined ? "" : email,
              password: password === undefined ? "" : password
            };
            /*
            During a patch request only does a partial update.
            It doesn't update the entire entity it only updates what is defined
            Thanks to validation, we can control what gets defined. 
            If it fails than we can set undefined so it would not update.
            */
            // Validation

            _context.next = 5;
            return (0, _validators.validateEmail)(updatedUser.email);

          case 5:
            isValEmail = _context.sent;

            if (!isValEmail) {
              updatedUser["email"] = undefined;
            }

            isValPass = (0, _validators.validatePass)(updatedUser.password);

            if (!isValPass) {
              updatedUser["password"] = undefined;
            }

            isValUser = (0, _validators.validateUsername)(updatedUser.username);

            if (!isValUser) {
              updatedUser["username"] = undefined;
            } // --------------------
            // Update the values if defined otherwise keep the old ones.


            _context.t0 = (0, _index.default)("users");
            _context.t1 = updatedUser.username;
            _context.t2 = updatedUser.email;

            if (isValPass) {
              _context.next = 18;
              break;
            }

            _context.t3 = undefined;
            _context.next = 21;
            break;

          case 18:
            _context.next = 20;
            return _bcrypt.default.hash(updatedUser.password, 14);

          case 20:
            _context.t3 = _context.sent;

          case 21:
            _context.t4 = _context.t3;
            _context.t5 = {
              username: _context.t1,
              email: _context.t2,
              hash: _context.t4
            };
            _context.t6 = req.user.id;
            _context.next = 26;
            return _context.t0.update.call(_context.t0, _context.t5).where("id", _context.t6).returning("*");

          case 26:
            userUpdate = _context.sent;
            // Return the response
            res.send(_objectSpread({}, userUpdate[0], {
              hash: undefined
            }));
            next();
            _context.next = 35;
            break;

          case 31:
            _context.prev = 31;
            _context.t7 = _context["catch"](0);
            // Return an error if there is something wrong.
            res.send(new errors.InternalServerError("Something is wrong here. " + _context.t7));
            return _context.abrupt("return", next());

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 31]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;