import db from "../../../database/index";
import * as errors from "restify-errors";
export default async (req, res, next) => {
  try {
    // Delete todolist by id
    const deletedItem = await db("todolists")
      .where("id", req.query.id)
      .del()
      .returning("*");

    res.send(deletedItem[0]);
    return next();
  } catch (e) {
    console.log(e.message);
    res.send(
      new errors.InternalServerError("Something has went wrong " + e.message)
    );
    return next();
  }
};
