import * as errors from "restify-errors";
import db from "../../../database/index";
import { validateTodoList } from "../../validators/validators";
import shortid from "shortid";
export default async (req, res, next) => {
  try {
    const { item } = req.body;

    // Validate TodoList Title
    const isValid = validateTodoList(item);
    if (!isValid) {
      res.send(new errors.BadRequestError("Not a valid entry"));
      return next();
    }

    // Create new todolist
    const newTodoList = await db("todolists")
      .insert({
        id: shortid.generate(),
        item,
        datecreated: new Date(),
        userid: req.user.id
      })
      .returning("*");

    res.send(newTodoList[0]);
    return next();
  } catch (e) {
    console.log(e.message);
    res.send(
      new errors.InternalServerError("Something went wrong " + e.message)
    );
    return next();
  }
};
