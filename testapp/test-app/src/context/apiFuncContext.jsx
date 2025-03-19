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
  const putRequest = async (
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
      const response = await axios.put(baseUrl, data, { headers });
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
  const deleteRequest = async (url) => {
    const baseUrl = `${import.meta.env.VITE_BASE_URL}${url}`;
  
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete(baseUrl, { headers });
      return response?.data || response;
    } catch (error) {
      console.error("DELETE Request Error:", error.response?.data || error.message);
      throw error; // Properly rethrow error for handling at the calling function
    }
  };
  return (
    <ApiContext.Provider value={{ postRequest, getRequest,putRequest,deleteRequest }}>
      {children}
    </ApiContext.Provider>
  );
};
export const useApi = () => useContext(ApiContext);
