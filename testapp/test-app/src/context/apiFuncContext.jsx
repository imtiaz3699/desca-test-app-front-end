import { createContext, useContext } from "react";
import axios from "axios";
import { useUser } from "./userContext";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const {token} = useUser();
    const postRequest = async (url, data, isToken = false, customHeaders = {}) => {
        const baseUrl = import.meta.env.VITE_BASE_URL + url;
        try {
          const headers = {
            "Content-Type": "application/json",
            ...(isToken && { Authorization: `Bearer ${token}` }),
            ...customHeaders,
          };
          const response = await axios.post(baseUrl, data, { headers });
          return response.data;
        } catch (error) {
          console.error("Error:", error);
          throw error;
        }
      };
  

  return (
    <ApiContext.Provider value={{ postRequest }}>
      {children}
    </ApiContext.Provider>
  );
};
export const useApi = () => useContext(ApiContext);
