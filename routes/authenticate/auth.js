import passport from "passport";
import { ExtractJwt } from "passport-jwt";
const JWTStrategy = require("passport-jwt").Strategy;
import db from "../../database/index";

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET
    },
    async (payload, done) => {
      try {
        // Find the user that matches the token payload.
        const user = await db("users")
          .select("*")
          .where("email", payload.email)
          .returning("*");
        // If the token doesn't exist then return nothing
        if (JSON.stringify(user[0]) === "[]") {
          return done(null, false);
        }
        // Return only if it does exist.
        return done(null, { ...user[0], hash: undefined });
      } catch (err) {
        return done(err, false);
      }
    }
  )
);
