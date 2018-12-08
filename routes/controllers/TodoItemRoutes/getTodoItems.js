import * as errors from "restify-errors";
import db from "../../../database/index";

export default async (req, res, next) => {
  try {
    const todoList = await db("todoitems")
      .where("listid", req.query.id)
      .returning("*");

    res.json(todoList);
    return next();
  } catch (e) {
    res.send(new errors.InternalServerError("Unable to fetch todos"));
    return next();
  }
};
