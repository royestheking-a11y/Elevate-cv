import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { LayoutDashboard, Users, MessageSquare, Image as ImageIcon, LogOut } from "lucide-react";
import { Logo } from "./Logo";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const ADMIN_LINKS = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/users", icon: Users, label: "Users" },
  { href: "/admin/messages", icon: MessageSquare, label: "Messages" },
  { href: "/admin/assets", icon: ImageIcon, label: "All Assets" },
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Scroll to top on mount and path change
  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-[#FDFBF7] text-[#3B2F2F]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-100 flex items-center space-x-2">
          <Logo className="size-8" />
          <span className="text-xl font-bold tracking-tight">Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {ADMIN_LINKS.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                  isActive 
                    ? "bg-[#3B2F2F] text-[#D6A85F]" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#3B2F2F]"
                }`}
              >
                <link.icon className="size-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
           <button
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
          >
            <LogOut className="size-5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}