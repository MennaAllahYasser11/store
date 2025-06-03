export const generateToken = () => {
  const chars = "0123456789abcdef";
  let token = "";
  for (let i = 0; i < 64; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
};

export const getSessionToken = () => {
  let token = localStorage.getItem("sessionToken");
  if (!token) {
    token = generateToken();
    localStorage.setItem("sessionToken", token);
  }
  return token;
};

export const checkAuth = () => {
  return localStorage.getItem("authToken");
};

// export const getAuthToken = () => {
//   return localStorage.getItem("authToken");
// };
