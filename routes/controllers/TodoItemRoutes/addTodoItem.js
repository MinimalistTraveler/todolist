import * as errors from "restify-errors";
import db from "../../../database/index";
import { validateTodoItem } from "../../validators/validators";
import shortid from "shortid";
export default async (req, res, next) => {
  try {
    const { item, duedate } = req.body;
    if (req.query.listid === undefined) {
      res.send(new errors.BadRequestError("No list id was specified"));
      return next();
    }
    // Validate Todo Item
    const isValid = validateTodoItem(item);
    if (!isValid) {
      res.send(new errors.BadRequestError("Not a valid entry"));
      return next();
    }
    // Create new todo item
    const newTodoItem = {
      id: shortid.generate(),
      item,
      listid: req.query.listid,
      checked: false,
      duedate: !duedate ? null : new Date()
    };

    // Create new Todo
    const newTodo = await db("todoitems")
      .insert(newTodoItem)
      .returning("*");

    // Return Response
    res.json(newTodo[0]);
    return next();
  } catch (e) {
    res.send(new errors.InternalServerError("Something went wrong " + e));
    return next();
  }
};
