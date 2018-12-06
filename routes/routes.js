import { Router } from "restify-router";
// Authenticate
import passport from "passport";
import "./authenticate/auth";

// Controllers
// Users Controllers
import registerUser from "./controllers/UserRoutes/registerUser";
import loginUser from "./controllers/UserRoutes/loginUser";
import getUser from "./controllers/UserRoutes/getUser";
import editUser from "./controllers/UserRoutes/editUser";
import deleteUser from "./controllers/UserRoutes/deleteUser";
// TodoList Controllers
import getAllTodoLists from "./controllers/TodoListRoutes/getAllTodoLists";
import getTodoList from "./controllers/TodoListRoutes/getTodoList";
import addTodoList from "./controllers/TodoListRoutes/addTodoList";
import editTodoList from "./controllers/TodoListRoutes/editTodoList";
import deleteTodoList from "./controllers/TodoListRoutes/deleteTodoList";
// Todo Controllers
import getTodoItems from "./controllers/TodoItemRoutes/getTodoItems";
import addTodoItem from "./controllers/TodoItemRoutes/addTodoItem";
import editTodoItem from "./controllers/TodoItemRoutes/editTodoItem";
import deleteTodoItem from "./controllers/TodoItemRoutes/deleteTodoItem";

// Create Route Instance
const routerInstance = new Router();

// GET ALL TODOS (NOT MENT FOR FINAL BUILD)
routerInstance.get("/", getTodoItems);

/* User routes
_______________________________________ */

// Register Route
routerInstance.post("/register", registerUser);

// Login Route
routerInstance.post("/login", loginUser);

// Get User Route
routerInstance.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  getUser
);

// Edit User Route
routerInstance.patch(
  "/users",
  passport.authenticate("jwt", { session: false }),
  editUser
);

// Delete User Route
routerInstance.del(
  "/users",
  passport.authenticate("jwt", { session: false }),
  deleteUser
);

/* Todo list routes
________________________________*/

// Get all items in the todo list
routerInstance.get(
  "/todo-lists",
  passport.authenticate("jwt", { session: false }),
  getAllTodoLists
);
// Get a specified todo list
routerInstance.get(
  "/todo-list",
  passport.authenticate("jwt", { session: false }),
  getTodoList
);
// Add todolist in the todo list
routerInstance.post(
  "/todo-list/new",
  passport.authenticate("jwt", { session: false }),
  addTodoList
);

// Update todolist
routerInstance.patch(
  "/todo-list/edit",
  passport.authenticate("jwt", { session: false }),
  editTodoList
);

// Delete item in the todo list
routerInstance.del(
  "/todo-list/delete",
  passport.authenticate("jwt", { session: false }),
  deleteTodoList
);

/* Todo Item Routes
____________________________________ */

// Get All Todo Items From Todo List
routerInstance.get(
  "/todo-items",
  passport.authenticate("jwt", { session: false }),
  getTodoItems
);

// Add Todo Item to Todolist
routerInstance.post(
  "/todo-items/new",
  passport.authenticate("jwt", { session: false }),
  addTodoItem
);

// Edit Todo Item by id
routerInstance.patch(
  "/todo-items/edit",
  passport.authenticate("jwt", { session: false }),
  editTodoItem
);

// Delete Todo Item
routerInstance.del(
  "/todo-items/delete",
  passport.authenticate("jwt", { session: false }),
  deleteTodoItem
);

// Export the routes.
export default routerInstance;
