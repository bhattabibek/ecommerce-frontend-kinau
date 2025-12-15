import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { logoutUser, profile } from "@/redux/features/thunks";
import type { RootState } from "@/redux/root-reducer";
import type { AppDispatch } from "@/redux/store";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: LayoutProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { me, isLoading, error } = useSelector((state: RootState) => state.auth);
  const [redirect, setRedirect] = useState(false);
  const [loaded, setLoaded] = useState(false); // to track profile fetch

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await dispatch(profile()).unwrap(); // wait for thunk to complete
        if (!user || user.role !== "admin") {
          dispatch(logoutUser());
          setRedirect(true);
        }
      } catch {
        setRedirect(true); // token invalid or API failed
      } finally {
        setLoaded(true);
      }
    };
    fetchProfile();
  }, [dispatch]);

  if (!loaded || isLoading) {
    return <p>Loading Auth...</p>;
  }

  if (error) {
    return <p className="text-red-500">Failed to load Auth</p>;
  }

  if (redirect) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <main className="mt-20">{children}</main>
      <Footer />
    </>
  );
};

export default AdminLayout;
