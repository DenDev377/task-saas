"use client"

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    taskToEdit?: any;
    onSave?: () => void;
}

export default function TaskModal({ isOpen, onClose, taskToEdit, onSave }: TaskModalProps) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setCategory(taskToEdit.category || "");
            setPriority(taskToEdit.priority);
            setDueDate(taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : "");
        } else {
            setTitle("");
            setCategory("");
            setPriority("MEDIUM");
            setDueDate("");
        }
    }, [taskToEdit])

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        setError("")

        try {
            const apiUrl = taskToEdit ? `/api/tasks/${taskToEdit.id}` : "/api/tasks";
            const apiMethod = taskToEdit ? "PUT" : "POST";

            //request post ke api
            const res = await fetch(apiUrl, {
                method: apiMethod,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title, category, priority, dueDate
                })

            })
            const data = await res.json()
            if (!res.ok) {
                setError(data.message || "Gagal menyimpan tugas.")
            } else {
                setTitle("");
                setCategory("");
                setPriority("MEDIUM");
                setDueDate("");
                if (onSave) onSave();
                onClose();
            }
        } catch (err) {
            setError("koneksi bermasalah.")
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                    <h2 className="text-lg font-bold text-slate-800">Tambah Tugas Baru</h2>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Judul Tugas</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Mendesain Landing Page..."
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF] transition-all text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kategori</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Marketing, Design, dll"
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF] transition-all text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Prioritas</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF] transition-all text-sm"
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Batas Waktu</label>
                            <input
                                type="date"
                                required
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF] transition-all text-sm"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
                        >
                            Batal
                        </button>
                        <button

                            type="submit"
                            className="px-6 py-2 text-sm font-bold text-white bg-[#635BFF] hover:bg-[#534be0] rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#635BFF]/50 focus:ring-offset-2"
                        >
                            Simpan Tugas
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
