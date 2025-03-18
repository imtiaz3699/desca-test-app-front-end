import { createContext, useContext } from "react";
import axios from "axios";
import { useUser } from "./userContext";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const { token } = useUser();
  const postRequest = async (
    url,
    data,
    isToken = false,
    customHeaders = {}
  ) => {
    const baseUrl = import.meta.env.VITE_BASE_URL + url;
    try {
      const headers = {
        "Content-Type": "application/json",
        ...(isToken && { Authorization: `Bearer ${token}` }),
        ...customHeaders,
      };
      const response = await axios.post(baseUrl, data, { headers });
      return response?.data || response;
    } catch (error) {
      console.error("Error:", error);
      if (error) {
        throw error;
      }
    }
  };
  const getRequest = async (url, id) => {
    const baseUrl = import.meta.env.VITE_BASE_URL + url;
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(baseUrl, { headers });
      return response?.data || response;
    } catch (error) {
      console.error("Error:", error);
      if (error) {
        throw error;
      }
    }
  };
  return (
    <ApiContext.Provider value={{ postRequest, getRequest }}>
      {children}
    </ApiContext.Provider>
  );
};
export const useApi = () => useContext(ApiContext);
