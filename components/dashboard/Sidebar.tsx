"use client";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: "🔲" },
    { name: "My Tasks", href: "/dashboard/tasks", icon: "📋" },
    { name: "Worklogs", href: "/dashboard/worklogs", icon: "🕒" },
    { name: "Team Overview", href: "/dashboard/team", icon: "👥" },
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
      </div>
    </aside>
  );
}
