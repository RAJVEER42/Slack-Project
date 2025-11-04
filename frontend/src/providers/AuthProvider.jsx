import { createContext, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const { getToken } = useAuth(); // getting token from clerk

  useEffect(() => {
    // setup axios interceptor

    const interceptor = axiosInstance.interceptors.request.use( // at every request we get a token
      async (config) => {
        try {
          const token = await getToken(); // we get are token
          if (token) config.headers.Authorization = `Bearer ${token}`; // if we get the token from clerk or auth by clerk, add the token under Bearer key.
        } catch (error) {
          if (error.message?.includes("auth") || error.message?.includes("token")) {
            toast.error("Authentication issue. Please refresh the page.");
          }
          console.log("Error getting token:", error);
        }
        return config;
      },
      (error) => {
        console.error("Axios request error:", error);
        return Promise.reject(error);
      }
    );

    // cleanup function to remove the interceptor, this is important to avoid memory leaks
    return () => axiosInstance.interceptors.request.eject(interceptor);
  }, [getToken]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}