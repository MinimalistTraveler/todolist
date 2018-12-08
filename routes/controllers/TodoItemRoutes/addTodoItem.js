"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var errors = _interopRequireWildcard(require("restify-errors"));

var _index = _interopRequireDefault(require("../../../database/index"));

var _validators = require("../../validators/validators");

var _shortid = _interopRequireDefault(require("shortid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, item, duedate, isValid, newTodoItem, newTodo;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, item = _req$body.item, duedate = _req$body.duedate;

            if (!(req.query.listid === undefined)) {
              _context.next = 5;
              break;
            }

            res.send(new errors.BadRequestError("No list id was specified"));
            return _context.abrupt("return", next());

          case 5:
            // Validate Todo Item
            isValid = (0, _validators.validateTodoItem)(item);

            if (isValid) {
              _context.next = 9;
              break;
            }

            res.send(new errors.BadRequestError("Not a valid entry"));
            return _context.abrupt("return", next());

          case 9:
            // Create new todo item
            newTodoItem = {
              id: _shortid.default.generate(),
              item: item,
              listid: req.query.listid,
              checked: false,
              duedate: !duedate ? null : new Date()
            }; // Create new Todo

            _context.next = 12;
            return (0, _index.default)("todoitems").insert(newTodoItem).returning("*");

          case 12:
            newTodo = _context.sent;
            // Return Response
            res.json(newTodo[0]);
            return _context.abrupt("return", next());

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            res.send(new errors.InternalServerError("Something went wrong " + _context.t0));
            return _context.abrupt("return", next());

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 17]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;