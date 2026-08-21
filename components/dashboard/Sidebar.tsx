"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, ListTodo, Clock, Users } from "lucide-react";
export default function Sidebar() {
  const pathname = usePathname();
  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "My Tasks", href: "/dashboard/tasks", icon: <ListTodo className="w-5 h-5" /> },
    { name: "Worklogs", href: "/dashboard/worklogs", icon: <Clock className="w-5 h-5" /> },
    { name: "Team Overview", href: "/dashboard/team", icon: <Users className="w-5 h-5" /> },
  ];
  return (
    <aside className="w-64 bg-s border-r bg-white border-slate-200/80 min-h-screem flex flex-col justify-between p-4 shrink-0">
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2 pt-2">
          <div className="w-10 h-10 bg-[#635BFF] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
            TM
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#635BFF] loading-tight">
              TaskMaster
            </h1>
            <p className="text-xs font-medium text-[#0A2540]">
              SaaS Management
            </p>
          </div>
        </div>
        <button className="w-full bg-[#635BFF] hover:bg-[#534be0] text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm text-sm transition-all">
          New Project
        </button>

        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#635BFF] text-white shadow-sm" // Style jika Aktif (Ungu)
                    : "text-slate-600 hover:bg-slate-100 hover:text-[#0A2540]" // Style Biasa
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
