import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null
  );
  const [token, setToken] = useState(Cookies.get("token") || "");

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setUser(null);
    setToken(null);
  };
  return (
    <UserContext.Provider value={{ user, token, logout, setUser, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
