import * as errors from "restify-errors";
import db from "../../../database/index";

export default async (req, res, next) => {
  try {
    console.log(req.query.id);
    const deleteTodo = await db("todoitems")
      .del()
      .where("id", req.query.id)
      .returning("*");

    res.json(deleteTodo[0]);
    return next();
  } catch (e) {
    res.send(
      new errors.InternalServerError(
        "Something is wrong with our servers. Error:" + e.message
      )
    );
    return next();
  }
};
