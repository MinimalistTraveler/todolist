import * as errors from "restify-errors";
import db from "../../database/index";
export default async (req, res, next) => {
  try {
    // Get Todo By Id
    const getTodo = await db("todos")
      .where("id", req.params.id)
      .andWhere("userid", req.user.id)
      .returning("*");

    // Return Response
    res.json(getTodo[0]);
    return next();
  } catch (e) {
    // Return an error when warrented.
    res.send(
      new errors.InternalServerError(
        "Something is went wrong. Error:" + e.message
      )
    );
    return next();
  }
};
