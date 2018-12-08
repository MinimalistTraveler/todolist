import db from "../../../database/index";
import * as errors from "restify-errors";
import bcrypt from "bcrypt";
import {
  validateEmail,
  validatePass,
  validateUsername
} from "../../validators/validators";

export default async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    /* 
      Use updatedUser instead of req.body in case if it is undefined
      it will not crash the validator functions. Instead we will handle it ourselves. 
     */
    const updatedUser = {
      username: username === undefined ? "" : username,
      email: email === undefined ? "" : email,
      password: password === undefined ? "" : password
    };
    /*
    During a patch request only does a partial update.
    It doesn't update the entire entity it only updates what is defined
    Thanks to validation, we can control what gets defined. 
    If it fails than we can set undefined so it would not update.
  */

    // Validation
    const isValEmail = await validateEmail(updatedUser.email);
    if (!isValEmail) {
      updatedUser["email"] = undefined;
    }
    const isValPass = validatePass(updatedUser.password);
    if (!isValPass) {
      updatedUser["password"] = undefined;
    }
    const isValUser = validateUsername(updatedUser.username);
    if (!isValUser) {
      updatedUser["username"] = undefined;
    }

    // --------------------

    // Update the values if defined otherwise keep the old ones.
    const userUpdate = await db("users")
      .update({
        username: updatedUser.username,
        email: updatedUser.email,
        hash: !isValPass
          ? undefined
          : await bcrypt.hash(updatedUser.password, 14)
      })
      .where("id", req.user.id)
      .returning("*");

    // Return the response
    res.send({ ...userUpdate[0], hash: undefined });
    next();
  } catch (e) {
    // Return an error if there is something wrong.
    res.send(new errors.InternalServerError("Something is wrong here. " + e));
    return next();
  }
};
