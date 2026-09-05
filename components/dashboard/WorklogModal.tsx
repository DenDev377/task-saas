import { useState, useEffect } from "react";
import { X, Clock, Calendar, CheckSquare, FileText } from "lucide-react";

interface WorklogModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    logToEdit?: any;
}

export default function WorklogModal({ isOpen, onClose, onSuccess, logToEdit }: WorklogModalProps) {
    const [tasks, setTasks] = useState<any[]>([]);
    const [taskId, setTaskId] = useState("");
    const [hours, setHours] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch tasks for dropdown
    useEffect(() => {
        if (!isOpen) return;
        
        const fetchTasks = async () => {
            try {
                const res = await fetch("/api/tasks");
                const data = await res.json();
                if (res.ok) {
                    setTasks(data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchTasks();
        
        // Populate or reset form
        if (logToEdit) {
            setTaskId(logToEdit.taskId.toString());
            setHours(logToEdit.hours.toString());
            setNote(logToEdit.note || "");
            setDate(logToEdit.date ? new Date(logToEdit.date).toISOString().split('T')[0] : "");
        } else {
            setTaskId("");
            setHours("");
            setNote("");
            setDate(new Date().toISOString().split('T')[0]); // Default to today
        }
        
        setError("");
    }, [isOpen, logToEdit]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        if (!taskId || !hours || !date) {
            setError("Tugas, Jam, dan Tanggal wajib diisi.");
            return;
        }

        if (parseFloat(hours) <= 0) {
            setError("Jam kerja harus lebih dari 0.");
            return;
        }

        setLoading(true);

        try {
            const apiUrl = logToEdit ? `/api/worklogs/${logToEdit.id}` : "/api/worklogs";
            const apiMethod = logToEdit ? "PUT" : "POST";

            const res = await fetch(apiUrl, {
                method: apiMethod,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    taskId,
                    hours: parseFloat(hours),
                    date,
                    note
                })
            });

            if (res.ok) {
                onSuccess();
                onClose();
            } else {
                const data = await res.json();
                setError(data.message || "Gagal menyimpan log kerja.");
            }
        } catch (error) {
            setError("Terjadi kesalahan jaringan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">{logToEdit ? "Edit Log Kerja" : "Catat Log Kerja"}</h2>
                        <p className="text-slate-500 text-sm mt-0.5">{logToEdit ? "Ubah catatan log lama Anda." : "Berapa jam yang Anda habiskan untuk tugas ini?"}</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-100 p-2 rounded-full transition-colors border border-slate-200 shadow-sm"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    {error && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                                <CheckSquare size={14} className="text-indigo-500" />
                                Pilih Tugas
                            </label>
                            <select
                                value={taskId}
                                onChange={(e) => setTaskId(e.target.value)}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                                required
                            >
                                <option value="" disabled>-- Pilih salah satu tugas aktif --</option>
                                {tasks.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.title} {t.completed ? "(Selesai)" : ""}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                                    <Clock size={14} className="text-amber-500" />
                                    Durasi (Jam)
                                </label>
                                <input
                                    type="number"
                                    step="0.5"
                                    min="0.5"
                                    max="24"
                                    value={hours}
                                    onChange={(e) => setHours(e.target.value)}
                                    placeholder="Contoh: 2.5"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                                    <Calendar size={14} className="text-emerald-500" />
                                    Tanggal Kerja
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                                <FileText size={14} className="text-slate-400" />
                                Catatan Laporan
                            </label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Apa yang Anda kerjakan dalam rentang waktu tersebut?"
                                rows={3}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-slate-100 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-all shadow-indigo-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading ? "Menyimpan..." : (logToEdit ? "Update Perubahan" : "Simpan Log Kerja")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
