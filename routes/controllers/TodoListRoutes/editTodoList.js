"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../../../database/index"));

var errors = _interopRequireWildcard(require("restify-errors"));

var _validator = _interopRequireDefault(require("validator"));

var _validators = require("../../validators/validators");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var isValid, updateTodoList;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            // Validate todo title
            isValid = (0, _validators.validateTodoList)(req.body.item);

            if (isValid) {
              _context.next = 5;
              break;
            }

            res.send(new errors.BadRequestError("Invalid request."));
            return _context.abrupt("return", next());

          case 5:
            _context.next = 7;
            return (0, _index.default)("todolists").update({
              item: req.body.item === "" ? undefined : _validator.default.escape(req.body.item)
            }).where("id", req.query.id).returning("*");

          case 7:
            updateTodoList = _context.sent;
            res.send(updateTodoList[0]);
            return _context.abrupt("return", next());

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            res.send(new errors.InternalServerError("Something has went wonky " + _context.t0.message));
            return _context.abrupt("return", next());

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 12]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;