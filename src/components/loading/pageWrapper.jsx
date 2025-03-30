// src/components/PageWrapper.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "./loadingScreen";

const PageWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true); // Set awalnya true agar halaman tidak muncul dulu
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // Simulasi loading selama 3 detik
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div className="relative">
      {loading ? <LoadingScreen /> : <div className="opacity-100">{children}</div>}
    </div>
  );
};

export default PageWrapper;
