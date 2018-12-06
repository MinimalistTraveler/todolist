import * as errors from "restify-errors";
import db from "../../../database/index";

export default async (req, res, next) => {
  try {
    const getAllTodos = await db("todolists")
      .where("userid", req.user.id)
      .returning("*");

    res.send(getAllTodos);
    return next();
  } catch (e) {
    res.send(
      new errors.InternalServerError("Something is wrong here " + e.message)
    );
    return next();
  }
};
