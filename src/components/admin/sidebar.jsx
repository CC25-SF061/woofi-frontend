import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; 

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Users", path: "/admin/users", icon: <Users size={20} /> },
    { name: "Posts", path: "/admin/posts", icon: <FileText size={20} /> },
    { name: "Contact", path: "/admin/contact", icon: <Mail size={20} /> },
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-56 bg-[#252527] shadow-xl z-30 flex flex-col justify-between py-6 px-4 font-quicksand">
      <div className="relative space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div key={item.path} className="relative">
              {/* Animate background for active item */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg bg-[#FFA666]/20 z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  />
                )}
              </AnimatePresence>

              <Link
                to={item.path}
                className={`relative z-10 flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-[#FFA666] font-bold"
                    : "text-white hover:bg-white/10 hover:text-[#FFA666]"
                }`}
              >
                {item.icon}
                <span className="whitespace-nowrap">{item.name}</span>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Footer dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <div className="rounded-full border-white border-2 w-3 h-3"></div>
        <div className="rounded-full border-white border-2 w-3 h-3"></div>
        <div className="rounded-full border-white border-2 w-3 h-3"></div>
      </div>
    </div>
  );
};

export default AdminSidebar;
