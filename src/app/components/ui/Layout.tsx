import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { LayoutDashboard, FileText, Wrench, Mail, BriefcaseBusiness, Menu, X, LogOut, ChevronUp, Palette } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Logo } from "./Logo";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Resume Studio", href: "/dashboard/cv-studio", icon: Palette },
  { name: "Resume Builder", href: "/dashboard/resume-builder", icon: FileText },
  { name: "Resume Repair", href: "/dashboard/resume-repair", icon: Wrench },
  { name: "Cover Letter", href: "/dashboard/cover-letter", icon: Mail },
  { name: "Email Writer", href: "/dashboard/email-writer", icon: BriefcaseBusiness },
];

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { logout, user } = useAuth();

  // Scroll to top on mount and path change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex h-screen bg-[#FDFBF7] overflow-hidden font-sans text-[#3B2F2F]">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 shadow-sm transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
          <Link to="/dashboard" className="flex items-center space-x-2 text-xl font-bold">
            <Logo className="size-8" />
            <span>ElevateCV</span>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden p-2 text-gray-500">
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1 mt-4">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== "/dashboard" && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-[#3B2F2F] text-white shadow-md shadow-[#3B2F2F]/20"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#3B2F2F]"
                )}
              >
                <item.icon className={cn("mr-3 size-5", isActive ? "text-[#D6A85F]" : "text-gray-400 group-hover:text-[#D6A85F]")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
          <div className="relative">
            {isUserMenuOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-100 rounded-xl shadow-lg shadow-black/5 overflow-hidden z-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="size-4 mr-2" />
                  Log out
                </button>
              </div>
            )}
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-full flex items-center justify-between p-3 space-x-3 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="size-9 bg-gradient-to-tr from-[#D6A85F] to-yellow-200 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  U
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'User Account'}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
              </div>
              <ChevronUp className={cn("size-4 text-gray-400 transition-transform", isUserMenuOpen && "rotate-180")} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-100 md:hidden z-40">
          <Link to="/dashboard" className="flex items-center space-x-2 text-lg font-bold">
            <Logo className="size-6" />
            <span>ElevateCV</span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-gray-500 bg-gray-50 rounded-md"
          >
            <Menu size={20} />
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50/50">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
