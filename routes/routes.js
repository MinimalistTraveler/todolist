"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restifyRouter = require("restify-router");

var _passport = _interopRequireDefault(require("passport"));

require("./authenticate/auth");

var _registerUser = _interopRequireDefault(require("./controllers/UserRoutes/registerUser"));

var _loginUser = _interopRequireDefault(require("./controllers/UserRoutes/loginUser"));

var _getUser = _interopRequireDefault(require("./controllers/UserRoutes/getUser"));

var _editUser = _interopRequireDefault(require("./controllers/UserRoutes/editUser"));

var _deleteUser = _interopRequireDefault(require("./controllers/UserRoutes/deleteUser"));

var _getAllTodoLists = _interopRequireDefault(require("./controllers/TodoListRoutes/getAllTodoLists"));

var _getTodoList = _interopRequireDefault(require("./controllers/TodoListRoutes/getTodoList"));

var _addTodoList = _interopRequireDefault(require("./controllers/TodoListRoutes/addTodoList"));

var _editTodoList = _interopRequireDefault(require("./controllers/TodoListRoutes/editTodoList"));

var _deleteTodoList = _interopRequireDefault(require("./controllers/TodoListRoutes/deleteTodoList"));

var _getTodoItems = _interopRequireDefault(require("./controllers/TodoItemRoutes/getTodoItems"));

var _addTodoItem = _interopRequireDefault(require("./controllers/TodoItemRoutes/addTodoItem"));

var _editTodoItem = _interopRequireDefault(require("./controllers/TodoItemRoutes/editTodoItem"));

var _deleteTodoItem = _interopRequireDefault(require("./controllers/TodoItemRoutes/deleteTodoItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Authenticate
// Controllers
// Users Controllers
// TodoList Controllers
// Todo Controllers
// Create Route Instance
var routerInstance = new _restifyRouter.Router(); // GET ALL TODOS (NOT MENT FOR FINAL BUILD)

routerInstance.get("/", _getTodoItems.default);
/* User routes
_______________________________________ */
// Register Route

routerInstance.post("/register", _registerUser.default); // Login Route

routerInstance.post("/login", _loginUser.default); // Get User Route

routerInstance.get("/users", _passport.default.authenticate("jwt", {
  session: false
}), _getUser.default); // Edit User Route

routerInstance.patch("/users", _passport.default.authenticate("jwt", {
  session: false
}), _editUser.default); // Delete User Route

routerInstance.del("/users", _passport.default.authenticate("jwt", {
  session: false
}), _deleteUser.default);
/* Todo list routes
________________________________*/
// Get all items in the todo list

routerInstance.get("/todo-lists", _passport.default.authenticate("jwt", {
  session: false
}), _getAllTodoLists.default); // Get a specified todo list

routerInstance.get("/todo-list", _passport.default.authenticate("jwt", {
  session: false
}), _getTodoList.default); // Add todolist in the todo list

routerInstance.post("/todo-list/new", _passport.default.authenticate("jwt", {
  session: false
}), _addTodoList.default); // Update todolist

routerInstance.patch("/todo-list/edit", _passport.default.authenticate("jwt", {
  session: false
}), _editTodoList.default); // Delete item in the todo list

routerInstance.del("/todo-list/delete", _passport.default.authenticate("jwt", {
  session: false
}), _deleteTodoList.default);
/* Todo Item Routes
____________________________________ */
// Get All Todo Items From Todo List

routerInstance.get("/todo-items", _passport.default.authenticate("jwt", {
  session: false
}), _getTodoItems.default); // Add Todo Item to Todolist

routerInstance.post("/todo-items/new", _passport.default.authenticate("jwt", {
  session: false
}), _addTodoItem.default); // Edit Todo Item by id

routerInstance.patch("/todo-items/edit", _passport.default.authenticate("jwt", {
  session: false
}), _editTodoItem.default); // Delete Todo Item

routerInstance.del("/todo-items/delete", _passport.default.authenticate("jwt", {
  session: false
}), _deleteTodoItem.default); // Export the routes.

var _default = routerInstance;
exports.default = _default;