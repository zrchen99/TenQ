import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post("/user/login", {
    email,
    password,
  });
  if (response.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await response.data;
  return data
}

export const checkAuthStatus = async () => {
  const response = await axios.get("/user/auth-status");
  if (response.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await response.data;
  return data
}

export const sendChatRequest = async (message: string) => {
  const response = await axios.post("/chat/new", { message });
  if (response.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await response.data;
  return data
}

export const getUserChats = async () => {
  const response = await axios.get("/chat/all-chats");
  if (response.status !== 200) {
    throw new Error("Unable to get chat");
  }
  const data = await response.data;
  return data
}

export const deleteUserChats = async () => {
  const response = await axios.delete("/chat/delete");
  if (response.status !== 200) {
    throw new Error("Unable to delete chat");
  }
  const data = await response.data;
  return data
}

export const logoutUser = async () => {
  const response = await axios.get("/user/logout");
  if (response.status !== 200) {
    throw new Error("Unable to logout user");
  }
  const data = await response.data;
  return data
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};