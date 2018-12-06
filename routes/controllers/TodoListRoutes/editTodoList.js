import db from "../../../database/index";
import * as errors from "restify-errors";
import validator from "validator";
import { validateTodoList } from "../../validators/validators";
export default async (req, res, next) => {
  try {
    // Validate todo title
    const isValid = validateTodoList(req.body.item);
    if (!isValid) {
      res.send(new errors.BadRequestError("Invalid request."));
      return next();
    }

    // Update todo title
    const updateTodoList = await db("todolists")
      .update({
        item: req.body.item === "" ? undefined : validator.escape(req.body.item)
      })
      .where("id", req.query.id)
      .returning("*");

    res.send(updateTodoList[0]);
    return next();
  } catch (e) {
    res.send(
      new errors.InternalServerError("Something has went wonky " + e.message)
    );
    return next();
  }
};
