"use client"
import { useState, useEffect } from "react";
import { Plus, Clock, FileText, Calendar, CheckSquare } from "lucide-react";
import WorklogModal from "@/components/dashboard/WorklogModal";

export default function WorklogsPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); // Untuk modal (tahap selanjutnya)

    // FITUR GET: Mengambil Histori Log Kerja
    const fetchLogs = async () => {
        try {
            const res = await fetch("/api/worklogs");
            const data = await res.json();
            if (res.ok) setLogs(data);
        } catch (error) {
            console.error("Gagal mengambil log kerja", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchLogs();
    }, []);

    // RUMUS STATISTIK: Menghitung total semua angka durasi (Jam)
    const totalHours = logs.reduce((sum, log) => sum + (log.hours || 0), 0);

    return (
        <div className="flex flex-col max-w-full mx-auto pb-10">
            {/* HEADER */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Catatan Waktu (Worklogs)</h1>
                    <p className="text-slate-600 mt-1">Lacak dan laporkan jam kerja harian Anda</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#635BFF] flex items-center gap-1.5 hover:bg-[#534be0] text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#635BFF]/50"
                >
                    <Plus className="w-4 h-4" />
                    Tambah Log Baru
                </button>
            </div>

            {/* DASHBOARD CARD MINI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 flex items-center gap-4 shadow-sm">
                    <div className="bg-indigo-500 text-white p-3 rounded-lg">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-indigo-600">Total Waktu Dikerjakan</p>
                        <h2 className="text-2xl font-bold text-indigo-900">{totalHours} Jam</h2>
                    </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 flex items-center gap-4 shadow-sm">
                    <div className="bg-emerald-500 text-white p-3 rounded-lg">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-emerald-600">Total Laporan Disubmit</p>
                        <h2 className="text-2xl font-bold text-emerald-900">{logs.length} Laporan</h2>
                    </div>
                </div>
            </div>

            {/* TABEL LOG KERJA */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-semibold">Tugas Terkait</th>
                                <th scope="col" className="px-6 py-4 font-semibold">Tanggal Log</th>
                                <th scope="col" className="px-6 py-4 font-semibold">Durasi</th>
                                <th scope="col" className="px-6 py-4 font-semibold">Catatan Laporan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading && (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-slate-400 animate-pulse">Memuat data log kerja...</td>
                                </tr>
                            )}

                            {!loading && logs.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-12 text-slate-500">
                                        <Clock className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                                        <p className="font-medium text-slate-700">Belum ada jam kerja yang dicatat.</p>
                                        <p className="text-sm mt-1">Klik [Tambah Log Baru] untuk mulai menghitung.</p>
                                    </td>
                                </tr>
                            )}

                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-start gap-2 max-w-[200px]">
                                            <CheckSquare className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                                            {/* Karena kita menggunakan "include: { task: true }" di API, kita bisa memanggil judul tugasnya! */}
                                            <span className="font-semibold text-slate-700 truncate">{log.task?.title || "Tugas Dihapus"}</span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-slate-600">
                                        <div className="flex items-center gap-1.5 flex-nowrap">
                                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                            {new Date(log.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-700">
                                            {log.hours} Jam
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-slate-600 max-w-sm">
                                        <p className="truncate" title={log.note}>{log.note || "-"}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <WorklogModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSuccess={() => {
                    setIsModalOpen(false);
                    fetchLogs(); // Auto-refresh!
                }} 
            />
        </div>
    )
}
