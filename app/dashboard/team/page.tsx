"use client"
import { useState, useEffect } from "react";
import { Users, Mail, Shield, CheckCircle, Clock } from "lucide-react";

export default function TeamPage() {
    const [team, setTeam] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await fetch("/api/team");
                if (res.ok) {
                    const data = await res.json();
                    setTeam(data);
                }
            } catch (error) {
                console.error("Gagal memuat tim", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeam();
    }, []);

    return (
        <div className="flex flex-col max-w-full mx-auto pb-10">
            {/* Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Team Overview</h1>
                    <p className="text-slate-600 mt-1">Daftar rekan kerja yang ada di dalam platform Anda</p>
                </div>
                <div className="bg-indigo-50 text-indigo-700 px-4 py-2.5 flex rounded-xl items-center gap-2 font-semibold text-sm shadow-sm border border-indigo-100">
                    <Users className="w-5 h-5" />
                    <span>{team.length} Anggota</span>
                </div>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading && (
                    <div className="col-span-full py-20 text-center flex flex-col items-center">
                        <Users className="w-10 h-10 text-slate-300 animate-pulse mb-3" />
                        <p className="text-slate-500 font-medium">Memuat data tim...</p>
                    </div>
                )}
                
                {team.map((user) => (
                    <div key={user.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative flex flex-col h-full">
                        
                        {/* Cover pattern */}
                        <div className="h-16 w-full bg-gradient-to-r from-indigo-500 to-[#635BFF]"></div>
                        
                        {/* Avatar & Role Badge */}
                        <div className="px-6 relative -mt-10 mb-2 flex justify-between items-end">
                            <div className="rounded-full bg-white p-1 shadow-sm w-[76px] h-[76px]">
                                <img 
                                    src={user.avatar} 
                                    alt={user.name} 
                                    className="w-full h-full rounded-full object-cover bg-slate-100"
                                />
                            </div>
                            <div className={`mb-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm border ${
                                user.role === 'ADMIN' 
                                ? "bg-amber-50 text-amber-600 border-amber-200" 
                                : "bg-white text-slate-600 border-slate-200"
                            }`}>
                                {user.role === 'ADMIN' && <Shield className="w-3 h-3" />}
                                {user.role}
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="px-6 flex-grow">
                            <h2 className="text-lg font-bold text-slate-800">{user.name}</h2>
                            <p className="flex items-center gap-1.5 text-sm text-slate-500 mt-1">
                                <Mail className="w-3.5 h-3.5" />
                                {user.email}
                            </p>
                        </div>

                        {/* Stats Footer */}
                        <div className="mt-6 border-t border-slate-100 bg-slate-50/50 p-4 px-6 grid grid-cols-2 gap-4 divide-x divide-slate-200">
                            <div className="flex flex-col items-center justify-center p-1">
                                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1 rounded bg-indigo-50 text-indigo-700 px-2 py-0.5">
                                    <Clock className="w-3 h-3" />
                                    Aktif
                                </span>
                                <span className="text-xl font-bold text-slate-800">{user.activeTasks}</span>
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tugas</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-1">
                                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1 rounded bg-emerald-50 text-emerald-700 px-2 py-0.5">
                                    <CheckCircle className="w-3 h-3" />
                                    Laporan
                                </span>
                                <span className="text-xl font-bold text-slate-800">{user.totalWorklogs}</span>
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Worklog</span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}