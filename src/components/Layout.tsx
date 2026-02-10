import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  LogOut,
  UserCircle,
  Menu,
  X,
  GraduationCap
} from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  if (!user) return <>{children}</>;

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive(to)
          ? 'bg-mmdu-red text-white shadow-md'
          : 'text-gray-600 hover:bg-red-50 hover:text-mmdu-red'
        }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 h-16">
        <div className="flex items-center justify-between px-4 h-full">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-md lg:hidden"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-2 text-mmdu-red font-bold text-xl tracking-tight">
              <GraduationCap size={28} />
              <span className="hidden sm:inline">MM(DU) Placement Portal</span>
              <span className="sm:hidden">MM(DU)</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-semibold text-gray-800">{user.name}</span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{user.role}</span>
            </div>
            <UserCircle className="text-gray-400 w-8 h-8" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-10
            w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            lg:block flex flex-col justify-between pb-6 pt-4
          `}
        >
          <nav className="space-y-1 px-3">
            <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
            <NavItem to="/students" icon={Users} label="Student Records" />
            <NavItem to="/drives" icon={Briefcase} label="Placement Drives" />
          </nav>

          <div className="px-3">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-600 hover:bg-red-50 hover:text-mmdu-red rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto min-h-[85vh]">
            {children}
          </div>

          {/* Footer */}
          <footer className="mt-8 border-t border-gray-200 pt-6 pb-8 text-center text-gray-500 text-sm">
            <p className="font-medium text-gray-700">Maharishi Markandeshwar (Deemed to be University)</p>
            <div className="mt-2 space-x-4">
              <a href="#" className="hover:text-mmdu-red transition-colors">Terms & Conditions</a>
              <span>|</span>
              <a href="#" className="hover:text-mmdu-red transition-colors">About</a>
              <span>|</span>
              <a href="#" className="hover:text-mmdu-red transition-colors">Contact Support</a>
            </div>
            <p className="mt-4 text-xs">
              © 2026 | All Rights Reserved | MMDU Placement Cell & Developers Student
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};