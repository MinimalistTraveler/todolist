import validator from "validator";
import axios from "axios";
export async function validateUser(user) {
  const { username, email, password } = user;
  const userValues = Object.values(user);
  let isEmpty = false;
  for (let value of userValues) {
    console.log(validator.isEmpty(value));
    if (validator.isEmpty(value)) {
      isEmpty = true;
    }
  }
  console.log(isEmpty);
  if (isEmpty) {
    return { status: false, errorMessage: "No empty inputs are allowed." };
  }

  // Check if it is an email
  const isEmail = validator.isEmail(email);
  if (!isEmail) {
    return {
      status: false,
      errorMessage: "Not a valid email address."
    };
  }
  // Check for valid email
  const resp = await axios.get(`https://www.validator.pizza/email/${email}`);
  if (resp.data.disposable) {
    return {
      status: false,
      errorMessage: "Please enter a valid email address"
    };
  }
  // Check if username is length
  const isUser = validator.isLength(username, { min: 3, max: 100 });
  if (!isUser) {
    return { status: false, errorMessage: "Invalid username or password." };
  }
  // Check if password matches regex
  // Minimum eight and maximum 100 characters, at least one uppercase letter, one lowercase letter, one number and one special character:

  const isValidPassReg = validator.matches(
    password,
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,100}$/
  );
  if (!isValidPassReg) {
    return { status: false, errorMessage: "Invalid username or password." };
  }

  return { status: true };
}

export async function validateTodoName(title) {
  const isEmpty = validator.isEmpty(title);
  if (isEmpty) {
    return { status: false, errorMessage: "This cannot be empty." };
  }
  if (title === " ") {
    return { status: false, errorMessage: "This cannot be empty." };
  }
  const isLength = validator.isLength(title, { min: 3, max: 20 });

  if (!isLength) {
    return {
      status: false,
      errorMessage:
        "It cannot be less than 3 characters long or more that 20 characters long."
    };
  }
  return { status: true, result: validator.trim(title) };
}

export async function validateTodoItem(item) {
  const isEmpty = validator.isEmpty(item);
  if (isEmpty) {
    return { status: false, errorMessage: "This cannot be empty." };
  }
  const isLength = validator.isLength(item, { min: 3, max: 50 });

  if (!isLength) {
    return {
      status: false,
      errorMessage:
        "It cannot be less than 3 characters long or more that 50 characters long."
    };
  }
  return { status: true, result: validator.trim(item) };
}
