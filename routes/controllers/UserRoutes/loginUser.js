import * as errors from "restify-errors";
import db from "../../../database/index";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export default async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Check if the login user exist
    const foundedUser = await db("users")
      .select("*")
      .where("email", email)
      .returning("*");
    if (JSON.stringify(foundedUser) === "[]") {
      res.send(new errors.BadRequestError("Invalid username or password"));
      return next();
    }
    const isSame = await bcrypt.compare(password, foundedUser[0].hash);
    if (!isSame) {
      res.send(new errors.BadRequestError("Invalid username or password"));
      return next();
    }
    const newToken = await jwt.sign(
      { ...foundedUser[0], hash: undefined },
      process.env.SECRET,
      {
        expiresIn: "5h"
      }
    );
    res.json({ token: newToken });
    return next();
  } catch (e) {
    res.send(new errors.InternalServerError(e));
    return next();
  }
};
