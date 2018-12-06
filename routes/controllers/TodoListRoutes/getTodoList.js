import * as errors from "restify-errors";
import db from "../../../database/index";

export default async (req, res, next) => {
  try {
    const todoList = await db("todolists")
      .where("id", req.query.id)
      .returning("*");
    res.send(todoList[0]);
    return next();
  } catch (e) {
    res.send(
      new errors.InternalError("Something went wrong with our servers.")
    );
    return next();
  }
};
