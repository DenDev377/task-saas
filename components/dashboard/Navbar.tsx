"use client";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Bell, Search, Plus, Clock, CheckCircle2, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  // ── State: Search ──
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // ── State: Notifikasi ──
  const [notifs, setNotifs] = useState<any[]>([]);
  const [showNotif, setShowNotif] = useState(false);
  const [notifLoading, setNotifLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const notifRef = useRef<HTMLDivElement>(null);

  const configPage: Record<string, { title: string; subtitle: string; showTaskButton: boolean }> = {
    "/dashboard": { title: "Dashboard", subtitle: "Selamat datang kembali! Ini ringkasan hari ini.", showTaskButton: true },
    "/dashboard/tasks": { title: "My Tasks", subtitle: "Kelola dan pantau semua tugas Anda.", showTaskButton: false },
    "/dashboard/worklogs": { title: "Worklogs", subtitle: "Lacak dan catat jam kerja harian Anda.", showTaskButton: false },
    "/dashboard/team": { title: "Team Overview", subtitle: "Lihat daftar seluruh anggota tim Anda.", showTaskButton: false },
    "/dashboard/settings": { title: "Settings", subtitle: "Atur preferensi akun dan aplikasi Anda.", showTaskButton: false },
  };
  const currentConfig = configPage[pathname] || configPage["/dashboard"];

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "?";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  // ── DEBOUNCE SEARCH ──
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }
    setSearchLoading(true);

    const delay = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        if (res.ok) setSearchResults(data);
      } catch { }
      finally { setSearchLoading(false); }
    }, 350); // Tunggu 350ms setelah berhenti mengetik

    return () => clearTimeout(delay);
  }, [searchQuery]);

  // ── FETCH NOTIFIKASI ──
  const fetchNotifs = useCallback(async () => {
    if (notifLoading) return;
    setNotifLoading(true);
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      if (res.ok) setNotifs(data);
    } catch { }
    finally { setNotifLoading(false); }
  }, []);

  // ── KLIK DI LUAR = TUTUP DROPDOWN ──
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotifToggle = () => {
    if (!showNotif) {
      fetchNotifs();
      setHasUnread(false); // Titik merah hilang saat dibuka
    }
    setShowNotif((prev) => !prev);
  };

  const priorityColor: Record<string, string> = {
    HIGH: "bg-red-100 text-red-600",
    MEDIUM: "bg-amber-100 text-amber-600",
    LOW: "bg-emerald-100 text-emerald-600",
  };

  const formatTimeAgo = (date: string) => {
    const diff = (Date.now() - new Date(date).getTime()) / 1000;
    if (diff < 60) return "Baru saja";
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
    return `${Math.floor(diff / 86400)} hari lalu`;
  };

  return (
    <nav className="w-full bg-white border-b border-slate-200 shrink-0">
      <div className="max-w-full px-6 lg:px-8 py-4 flex items-center justify-between gap-4">

        {/* KIRI: Judul + Subtitle */}
        <div className="flex flex-col min-w-0">
          <h1 className="text-xl font-bold text-slate-800 leading-tight truncate">{currentConfig.title}</h1>
          <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">{currentConfig.subtitle}</p>
        </div>

        {/* KANAN: Semua Kontrol */}
        <div className="flex items-center gap-3 shrink-0">

          {/* ── SEARCH ── */}
          <div ref={searchRef} className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setShowSearch(true)}
              onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(true); }}
              onKeyDown={(e) => e.key === "Escape" && (setShowSearch(false), setSearchQuery(""))}
              placeholder="Cari tugas..."
              className="bg-slate-100 hover:bg-slate-50 text-slate-700 placeholder-slate-400 text-sm py-2.5 pl-9 pr-8 rounded-xl w-52 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:w-72 border border-transparent focus:border-indigo-300"
            />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(""); setSearchResults([]); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Dropdown Hasil Search */}
            {showSearch && (searchQuery.length >= 2) && (
              <div className="absolute top-full mt-2 left-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50">
                {searchLoading ? (
                  <div className="p-4 text-sm text-slate-400 text-center animate-pulse">Mencari...</div>
                ) : searchResults.length === 0 ? (
                  <div className="p-6 text-center">
                    <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">Tidak ada hasil untuk <strong>"{searchQuery}"</strong></p>
                  </div>
                ) : (
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider px-4 pt-3 pb-1">
                      {searchResults.length} Tugas Ditemukan
                    </p>
                    {searchResults.map((task) => (
                      <Link
                        key={task.id}
                        href="/dashboard/tasks"
                        onClick={() => { setShowSearch(false); setSearchQuery(""); }}
                        className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 ${task.completed ? "text-emerald-500" : "text-slate-300"}`} />
                          <span className={`text-sm font-medium truncate ${task.completed ? "line-through text-slate-400" : "text-slate-700"}`}>
                            {task.title}
                          </span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ml-2 shrink-0 ${priorityColor[task.priority] || "bg-slate-100 text-slate-600"}`}>
                          {task.priority === "HIGH" ? "Tinggi" : task.priority === "MEDIUM" ? "Menengah" : "Rendah"}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── NOTIFIKASI ── */}
          <div ref={notifRef} className="relative">
            <button
              onClick={handleNotifToggle}
              className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
            >
              <Bell className="w-4 h-4" />
              {hasUnread && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              )}
            </button>

            {/* Dropdown Panel Notifikasi */}
            {showNotif && (
              <div className="absolute top-full mt-2 right-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/70">
                  <h3 className="font-bold text-slate-700 text-sm">Notifikasi</h3>
                  <button onClick={() => setShowNotif(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {notifLoading ? (
                  <div className="p-6 text-center text-sm text-slate-400 animate-pulse">Memuat notifikasi...</div>
                ) : notifs.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">Belum ada notifikasi.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {notifs.map((notif) => (
                      <div key={notif.id} className="flex items-start gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors">
                        <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${notif.type === "worklog" ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"}`}>
                          {notif.type === "worklog"
                            ? <Clock className="w-3.5 h-3.5" />
                            : <CheckCircle2 className="w-3.5 h-3.5" />
                          }
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-700 leading-snug">{notif.message}</p>
                          <p className="text-xs text-slate-500 truncate mt-0.5">{notif.detail}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{formatTimeAgo(notif.time)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/70">
                  <p className="text-[10px] text-slate-400 text-center">Menampilkan 5 aktivitas terbaru</p>
                </div>
              </div>
            )}
          </div>

          {/* Tombol Tugas Baru */}
          {currentConfig.showTaskButton && (
            <Link
              href="/dashboard/tasks"
              className="bg-[#635BFF] flex items-center gap-1.5 hover:bg-[#534be0] text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#635BFF]/50"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Tugas Baru</span>
            </Link>
          )}

          {/* Avatar + Nama */}
          <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
            <div className="flex-col items-end hidden sm:flex">
              <p className="text-sm font-semibold text-slate-700 leading-none">{session?.user?.name || "User"}</p>
              <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[120px]">{session?.user?.email || ""}</p>
            </div>
            {session?.user?.image ? (
              <img src={session.user.image} alt={session.user.name || "Avatar"} className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm ring-2 ring-[#635BFF]/30" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#635BFF] to-indigo-400 flex items-center justify-center text-white text-xs font-bold shadow-sm ring-2 ring-[#635BFF]/30">
                {getInitials(session?.user?.name)}
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
