export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-slate-200/80 shrink-0">
      <div className="max-w-full px-4 py-6 sm:px-6 lg:px-8 justify-between flex items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          {/* badge */}
          <div className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full flex items-center">
            <span className="w-2 h-2 bg-green-600 rounded-full mr-1.5 inline-block"></span>
            Operasional
          </div>

        </div>

        <div className="flex items-center gap-3">
          {/* search bar */}
          <div className="relative">
            <input type="text" placeholder="Search" className="bg-slate-200 hover:bg-slate-100 text-slate-700 placeholder-slate-400 text-sm py-2.5 px-4 rounded-xl transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] border border-transparent" />
          </div>
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-2.5 px-4 rounded-xl shadow-sm text-sm transition-all">
            Status
          </button>
          <button className="bg-[#635BFF] hover:bg-[#534be0] text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm text-sm transition-all">
            New Task
          </button>
        </div>
      </div>

    </nav>
  );
}
