"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateEmail = validateEmail;
exports.validatePass = validatePass;
exports.validateUsername = validateUsername;
exports.validateTodoList = validateTodoList;
exports.validateTodoItem = validateTodoItem;

var _validator = _interopRequireDefault(require("validator"));

var _superagent = _interopRequireDefault(require("superagent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function validateEmail(_x) {
  return _validateEmail.apply(this, arguments);
}

function _validateEmail() {
  _validateEmail = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(email) {
    var isEmpty, isEmail, resp;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isEmpty = _validator.default.isEmpty(email);

            if (!isEmpty) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", false);

          case 3:
            // Check Email
            isEmail = _validator.default.isEmail(email);

            if (isEmail) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", false);

          case 6:
            _context.next = 8;
            return _superagent.default.get("https://www.validator.pizza/email/".concat(email));

          case 8:
            resp = _context.sent;

            if (!resp.body.disposable) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", false);

          case 11:
            return _context.abrupt("return", true);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _validateEmail.apply(this, arguments);
}

function validatePass(pass) {
  var isEmpty = _validator.default.isEmpty(pass);

  if (isEmpty) {
    return false;
  } // Minimum eight and maximum 100 characters, at least one uppercase letter, one lowercase letter, one number and one special character:


  var isValidPassReg = _validator.default.matches(pass, /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,100}$/);

  if (!isValidPassReg) {
    return false;
  }

  return true;
}

function validateUsername(username) {
  var isEmpty = _validator.default.isEmpty(username);

  if (isEmpty) {
    return false;
  } // Min 8 Max 30 cannot contain a _ or . at the beginning, middle nor the end. letters and numbers are allowed


  var isValidUserReg = _validator.default.matches(username, /^(?=.{8,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/);

  if (!isValidUserReg) {
    return false;
  }

  return true;
}

function validateTodoList(name) {
  var isEmpty = _validator.default.isEmpty(name);

  if (isEmpty) {
    return false;
  }

  var lengthCheck = _validator.default.isLength(name, {
    min: 3,
    max: 100
  });

  if (!lengthCheck) {
    return false;
  }

  return true;
}

function validateTodoItem(item) {
  var isEmpty = _validator.default.isEmpty(item);

  if (isEmpty) {
    return false;
  }

  var lengthCheck = _validator.default.isLength(item, {
    min: 3,
    max: 100
  });

  if (!lengthCheck) {
    return false;
  }

  return true;
}