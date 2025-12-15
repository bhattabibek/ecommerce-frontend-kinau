import { useEffect } from "react";
import { useNavigate, useNavigationType } from "react-router-dom";

export const useRedirectIfLoggedIn = (fallback?: string) => {
    const token = localStorage.getItem("accessToken");
    const navigate = useNavigate();
    const navigationType = useNavigationType()


  useEffect(() => {
    if (token) {
        if(navigationType === "PUSH") {
            navigate(-1);
        }else {
            navigate(fallback || "/", { replace: true });
        }
    }
  }, [token, navigationType, fallback, navigate]);
}

export const useHasToken = () => {
    const token = localStorage.getItem("accessToken");
    return !!token;
}