import * as errors from "restify-errors";
import db from "../../../database/index";
import bcrypt from "bcrypt";
import {
  validateEmail,
  validatePass,
  validateUsername
} from "../../validators/validators";
// Helper
function notValid(res, next) {
  res.send(
    new errors.BadRequestError("Invalid credentials please, try again.")
  );
  return next();
}
// Main Route Controller.
export default async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    // Validate Email
    const isValidEmail = await validateEmail(email);
    if (!isValidEmail) {
      return notValid(res, next);
    }

    // Validate Password
    const isValidPass = validatePass(password);
    if (!isValidPass) {
      return notValid(res, next);
    }

    // Validate Username
    const isValidUsername = validateUsername(username);
    if (!isValidUsername) {
      return notValid(res, next);
    }

    // Hash
    const hash = await bcrypt.hash(password, 14);
    // Create User
    const User = {
      username,
      email,
      hash
    };
    // Find user with same username or email
    const existUser = await db("users")
      .where("email", User.email)
      .orWhere("username", User.username)
      .returning("*");
    if (JSON.stringify(existUser) !== "[]") {
      res.send(new errors.BadRequestError("A user with that already exists!"));
      return next();
    }
    // Add user to db
    const newUser = await db("users")
      .insert(User)
      .returning("*");

    // Get response
    res.json(newUser[0]);
    return next();
  } catch (e) {
    console.log(e.message);
    res.send(
      new errors.InternalServerError("Something went wrong with our servers.")
    );
    return next();
  }
};
