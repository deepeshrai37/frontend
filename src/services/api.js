const API_URL = "https://backend-chat-app-ey4p.onrender.com/api"; // Update this URL based on your Strapi setup

export const signup = async (username, email, password) => {
  const response = await fetch(`${API_URL}/auth/local/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await response.json();
  return data;
};

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier: email, password }),
  });
  const data = await response.json();
  return data;
};
