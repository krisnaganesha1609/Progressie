import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true;
  }  
};