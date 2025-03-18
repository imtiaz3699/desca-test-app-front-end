import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(Cookies.get("token") ?? "");
  const [token, setToken] = useState(Cookies.get("user") ? JSON.parse(Cookies.get("user")) : "");


  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setUser(null);
    setToken(null);
  };
  console.log(token,user,';afsdfkasdk')
  return (
    <UserContext.Provider value={{ user, token, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook to Use UserContext
export const useUser = () => useContext(UserContext);
