import validator from "validator";
import request from "superagent";
export async function validateEmail(email) {
  const isEmpty = validator.isEmpty(email);
  if (isEmpty) {
    return false;
  }
  // Check Email
  const isEmail = validator.isEmail(email);
  if (!isEmail) {
    return false;
  }
  // Check if it is disposible
  const resp = await request.get(`https://www.validator.pizza/email/${email}`);
  if (resp.body.disposable) {
    return false;
  }
  return true;
}
export function validatePass(pass) {
  const isEmpty = validator.isEmpty(pass);
  if (isEmpty) {
    return false;
  }
  // Minimum eight and maximum 100 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
  const isValidPassReg = validator.matches(
    pass,
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,100}$/
  );

  if (!isValidPassReg) {
    return false;
  }
  return true;
}
export function validateUsername(username) {
  const isEmpty = validator.isEmpty(username);
  if (isEmpty) {
    return false;
  }
  // Min 8 Max 30 cannot contain a _ or . at the beginning, middle nor the end. letters and numbers are allowed
  const isValidUserReg = validator.matches(
    username,
    /^(?=.{8,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
  );
  if (!isValidUserReg) {
    return false;
  }
  return true;
}

export function validateTodoList(name) {
  const isEmpty = validator.isEmpty(name);
  if (isEmpty) {
    return false;
  }
  const lengthCheck = validator.isLength(name, { min: 3, max: 100 });
  if (!lengthCheck) {
    return false;
  }
  return true;
}
export function validateTodoItem(item) {
  const isEmpty = validator.isEmpty(item);
  if (isEmpty) {
    return false;
  }
  const lengthCheck = validator.isLength(item, { min: 3, max: 100 });
  if (!lengthCheck) {
    return false;
  }
  return true;
}
