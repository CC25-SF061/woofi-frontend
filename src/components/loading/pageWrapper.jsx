// src/components/PageWrapper.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "./loadingScreen";

const PageWrapper = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 3000); // Simulasi loading selama 1 detik
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div className="relative">
      {loading && <LoadingScreen />}
      <div className={`${loading ? "opacity-50 blur-sm" : "opacity-100"} transition-all duration-500`}>
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
