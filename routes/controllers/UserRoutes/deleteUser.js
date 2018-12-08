import db from "../../../database/index";

export default async (req, res, next) => {
  /* Delete the user from the db */
  const deletedUser = await db("users")
    .del()
    .where("email", req.user.email)
    .andWhere("username", req.user.username)
    .returning("*");
  res.json(deletedUser);
  next();
};
