"use client";
import { usePathname } from "next/navigation";
import { ListFilter, Plus } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const configPage: Record<
    string,
    {
      title: string;
      badge: string;
      badgeColor: string;
      showTaskButton: boolean;
    }
  > = {
    "/dashboard": {
      title: "Dashboard",
      badge: "Operasional",
      badgeColor: "bg-green-100 text-green-600",
      showTaskButton: true,
    },
    "/dashboard/tasks": {
      title: "Tasks",
      badge: "Operasional",
      badgeColor: "bg-green-100 text-green-600",
      showTaskButton: false,
    },
    "/dashboard/worklogs": {
      title: "Worklogs",
      badge: "Operasional",
      badgeColor: "bg-green-100 text-green-600",
      showTaskButton: true,
    },
    "/dashboard/calendar": {
      title: "Calendar",
      badge: "Operasional",
      badgeColor: "bg-green-100 text-green-600",
      showTaskButton: true,
    },
    "/dashboard/settings": {
      title: "Settings",
      badge: "Operasional",
      badgeColor: "bg-green-100 text-green-600",
      showTaskButton: true,
    },
  };

  // Fallback ke config dashboard jika route tidak terdaftar 
  const currentConfig = configPage[pathname] || configPage["/dashboard"];

  return (
    <nav className="w-full bg-white border-b border-slate-250 shrink-0">
      <div className="max-w-full px-4 py-6 sm:px-6 lg:px-8 justify-between flex items-center">
        <div className="flex items-center gap-3">

          <h1 className="text-2xl font-bold text-gray-900">
            {currentConfig.title}
          </h1>


          <div
            className={`${currentConfig.badgeColor} text-xs font-semibold px-3 py-1 rounded-full flex items-center`}
          >
            <span className="w-2 h-2 bg-current rounded-full mr-1.5 inline-block" />
            {currentConfig.badge}
          </div>
        </div>

        <div className="flex items-center gap-3">

          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-slate-200 hover:bg-slate-100 text-slate-700 placeholder-slate-400 text-sm py-2.5 px-4 rounded-xl transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] border border-transparent"
            />
          </div>

          <button className="bg-slate-100 flex items-center gap-1.5 hover:bg-slate-200 text-slate-600 font-semibold py-2.5 px-4 rounded-xl shadow-sm text-sm transition-all">
            <ListFilter className="w-4 h-4" />
            Status
          </button>


          {currentConfig.showTaskButton && (
            <button className="bg-[#635BFF] flex items-center gap-1.5 hover:bg-[#534be0] text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm text-sm transition-all">
              <Plus className="w-4 h-4" />
              Tugas Baru
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}