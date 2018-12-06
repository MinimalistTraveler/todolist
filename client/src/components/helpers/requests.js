import axios from "axios";
import { validateUser, validateTodoName, validateTodoItem } from "./validators";

/* User Requests
______________________________*/
// Login User
export async function loginUser(userInfo) {
  try {
    const { email, password } = userInfo;
    const resp = await axios.post("http://localhost:5000/api/login", {
      email,
      password
    });
    localStorage.removeItem("token");
    localStorage.setItem("token", resp.data.token);
    return { error: false, success: true };
  } catch (e) {
    console.error(e.message);
    return { error: true, errorMessage: "Invalid username or password" };
  }
}
// Register User
export async function registerUser(userInfo) {
  try {
    const { username, email, password } = userInfo;
    const isValid = await validateUser(userInfo);
    if (!isValid.status) {
      throw new Error(isValid.errorMessage);
    }
    const resp = await axios.post("http://localhost:5000/api/register", {
      username,
      email,
      password
    });
    return resp.data;
  } catch (e) {
    console.log(e);
    console.error(e.message);
    if (e.message.includes("400")) {
      return {
        error: true,
        errorMessage:
          "A user with that username or email already exist. Try another one."
      };
    }
    if (e.message.includes("500") || e.message.includes("Server")) {
      return { error: true, errorMessage: "Invalid Entry." };
    }
    return { error: true, errorMessage: e.message };
  }
}
// Get Logged In User
export async function getUser() {
  try {
    const resp = await axios.get("http://localhost:5000/api/users", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    return { results: resp.data };
  } catch (e) {
    console.log(e.message);
    return { logout: true };
  }
}
// Update User
export async function updateUser(userInfo) {
  const { username, email, password } = userInfo;
  console.log(userInfo);
  try {
    if (username === undefined && email === undefined && password === "") {
      return {
        error: true,
        errorMessage: "Everything is empty. Try inputting something first."
      };
    }
    const resp = await axios.patch(
      "http://localhost:5000/api/users",
      {
        username,
        email,
        password
      },
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    return resp.data;
  } catch (e) {
    console.log(e.message);
    return {
      error: true,
      errorMessage: "Unable to update user. Try again later."
    };
  }
}
// Delete User
export async function deleteUser() {
  try {
    const resp = await axios.delete("http://localhost:5000/api/users", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    return resp.data;
  } catch (e) {
    return { error: true };
  }
}

/* Todo List Requests
____________________________________*/
// Get All Todo Lists
export async function getAllTodoList() {
  try {
    const resp = await axios.get("http://localhost:5000/api/todo-lists", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    return resp.data;
  } catch (e) {
    console.log(e.message);
    if (e.message.includes("401")) {
      return { logout: true };
    }
    if (e.message.includes("500")) {
      console.log("Server issues...");
      return { logout: true };
    }
    return { error: true, errorMessage: "Nothing to show here." };
  }
}
// Get Todo List By Id
export async function getTodoList(todoInfo) {
  const { id } = todoInfo;
  try {
    const resp = await axios.get(
      `http://localhost:5000/api/todo-lists?id=${id}`,
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      }
    );
    return resp.data[0];
  } catch (e) {
    console.log(e.message);
    if (e.message.includes("401")) {
      return { logout: true };
    }
    return {
      error: true,
      errorMessage: "An unexpected error has occured. Please try again later."
    };
  }
}
// Get All Items from Todo List
export async function getTodoItems(todoInfo) {
  const { id } = todoInfo;
  try {
    const resp = await axios.get(
      `http://localhost:5000/api/todo-items?id=${id}`,
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    return resp.data;
  } catch (e) {
    console.error(e.message);
    if (e.message.includes("401")) {
      return { logout: true };
    }
    return { error: true, errorMessage: "Nothing to show here." };
  }
}
// Add Todo List
export async function addTodoList(todoInfo) {
  const { title } = todoInfo;

  const isValid = await validateTodoName(title);
  if (!isValid.status) {
    return { error: true, errorMessage: isValid.errorMessage };
  }
  try {
    const resp = await axios.post(
      "http://localhost:5000/api/todo-list/new",
      {
        item: isValid.result
      },
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    return resp.data;
  } catch (e) {
    console.error(e.message);
    return { error: true, errorMessage: "Invalid Entry" };
  }
}
// Edit Todo List
export async function editTodoList(todoInfo) {
  const { id, item } = todoInfo;
  try {
    const resp = await axios.patch(
      `http://localhost:5000/api/todo-list/edit?id=${id}`,
      {
        item
      },
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    return resp.data;
  } catch (e) {
    console.error(e.message);
    return { error: true };
  }
}
// Delete Todo List
export async function deleteTodoList(id) {
  try {
    const resp = await axios.delete(
      `http://localhost:5000/api/todo-list/delete?id=${id}`,
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      }
    );
    return resp.data;
  } catch (e) {
    console.error(e.message);
    return { error: true };
  }
}
/* Todo Item Requests
_________________________________*/
// Add Todo Item To A Todo list
export async function addTodoItem(todoItem) {
  const { listid, item } = todoItem;
  try {
    const isValid = await validateTodoItem(item);
    console.log(isValid);
    if (!isValid) {
      return {
        error: true,
        errorMessage: isValid.errorMessage
      };
    }
    const resp = await axios.post(
      `http://localhost:5000/api/todo-items/new?listid=${listid}`,
      {
        item
      },
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    return resp.data;
  } catch (e) {
    console.error(e.message);
    if (e.message.includes("400")) {
      return {
        error: true,
        errorMessage: "Your entry is incorrect. Please try again."
      };
    }
    return {
      error: true,
      errorMessage:
        "Cannot add item to your todo list. Make sure the item you adding doesn't already exist."
    };
  }
}
// Edit existing todo item from existing todo list
export async function editTodoItem(todoItem) {
  const { item, checked, id } = todoItem;
  try {
    const resp = await axios.patch(
      `http://localhost:5000/api/todo-items/edit?id=${id}`,
      {
        item,
        checked
      },
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    return resp.data;
  } catch (e) {
    console.error(e.message);
    return;
  }
}
// Delete todo item from existing todo list
export async function deleteTodoItem(id) {
  try {
    const resp = await axios.delete(
      `http://localhost:5000/api/todo-items/delete?id=${id}`,
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    return resp.data;
  } catch (e) {
    console.error(e.message);
    return;
  }
}
