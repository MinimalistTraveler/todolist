import * as errors from "restify-errors";
export default (req, res, next) => {
  try {
    res.send({ ...req.user, hash: undefined });
    return next();
  } catch (e) {
    res.send(new errors.InternalServerError("Server issues"));
    return next();
  }
};
