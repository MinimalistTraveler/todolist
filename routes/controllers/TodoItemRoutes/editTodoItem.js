import * as errors from "restify-errors";
import db from "../../../database/index";
import { validateTodoItem } from "../../validators/validators";
import validator from "validator";
export default async (req, res, next) => {
  try {
    const { item, checked, duedate } = req.body;
    const { id } = req.query;
    let updatedItem = {
      item: item === undefined ? "" : item,
      checked
    };
    // Validate Todo Item
    const isValid = validateTodoItem(updatedItem.item);
    if (!isValid) {
      updatedItem.item = undefined;
    } else {
      updatedItem.item = validator.escape(updatedItem.item);
    }
    // Edit The Todo
    const editTodo = await db("todoitems")
      .update({
        item: updatedItem.item,
        duedate: !duedate ? undefined : new Date(),
        checked
      })
      .where("id", id)
      .returning("*");

    // Return Response
    res.json(editTodo[0]);
    return next();
  } catch (e) {
    res.send(
      new errors.InternalServerError(
        "Something is wrong with our servers. " + e
      )
    );
    return next();
  }
};
