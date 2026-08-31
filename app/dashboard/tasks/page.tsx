"use client"
import { useState, useEffect } from "react"
import { Plus, SlidersHorizontal, Calendar, Check, MoreHorizontal, ChevronDown } from "lucide-react";
import TaskModal from "@/components/dashboard/TaskModal";

export default function TaskPage() {
    const [activeTab, setActiveTab] = useState("all")
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [tasks, setTasks] = useState<any[]>
        ([])
    const [loading, setLoading] = useState(true)

    const fetchTasks = async () => {
        try {
            const res = await fetch("/api/tasks")
            const data = await res.json()
            if (res.ok) {
                setTasks(data)
            }
        } catch (error) {
            console.error("Gagal terhubung ke API task", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    // FUNGSI MENGHAPUS TUGAS
    const deleteTask = async (id: number) => {
        // Jendela konfirmasi bawaan browser
        if (!window.confirm("Apakah Anda yakin ingin menghapus tugas ini?")) return;

        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: "DELETE" // Memanggil blok export async function DELETE
            });

            if (res.ok) {

                setTasks(tasks.filter((t) => t.id !== id));
            } else {
                alert("Gagal menghapus tugas dari server.");
            }
        } catch (error) {
            alert("Terjadi masalah sistem lokal saat menghapus.");
        }
    }


    const menuItems = [
        {
            label: "Semua Tugas",
            value: "all",
        },
        {
            label: "Tugas Saya",
            value: "my-tasks",
        },
        {
            label: "Selesai",
            value: "completed",
        },
    ]

    const toggleTaskCompletion = (taskId: number) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed, status: task.completed ? "In Progress" : "Done" } : task
        ))
    }

    const filteredTasks = tasks.filter(task => {
        if (activeTab === "all") return true;
        if (activeTab === "completed") return task.completed;
        if (activeTab === "my-tasks") return true;
        return true;
    })

    const getPriorityStyle = (priority: string) => {
        const p = priority.toLowerCase();
        if (p.includes("high")) return "bg-red-50 text-red-500";
        if (p.includes("medium")) return "bg-amber-50 text-amber-600";
        if (p.includes("low")) return "bg-green-50 text-green-600";
        return "bg-slate-100 text-slate-500";
    }

    return (
        <div className="flex flex-col max-w-full mx-auto">
            <div className="flex justify-between">
                <div>
                    <h1 className=" font-bold text-slate-800">Halaman Tugas</h1>
                    <p className="text-slate-600">Kelola tugas Anda di sini</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#635BFF] flex items-center gap-1.5 hover:bg-[#534be0] text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#635BFF]/50 focus:ring-offset-2"
                >
                    <Plus className="w-4 h-4" />
                    Tambah Tugas
                </button>
            </div>

            <div className="mt-8 bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
                <div className="flex bg-slate-100 p-1 rounded-lg gap-1 overflow-x-auto w-full md:w-auto">
                    {menuItems.map((item) => (
                        <button
                            key={item.value}
                            onClick={() => setActiveTab(item.value)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${activeTab === item.value
                                ? "bg-white text-slate-800 shadow-sm"
                                : "text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative flex items-center">
                        <SlidersHorizontal size={14} className="absolute left-3 text-slate-400 pointer-events-none" />
                        <select className="pl-8 pr-8 py-1.5 text-sm bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-slate-700 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 cursor-pointer transition-colors">
                            <option value="all">Status: All</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 text-slate-400 pointer-events-none" />
                    </div>
                    <div className="relative flex items-center">
                        <Calendar size={14} className="absolute left-3 text-slate-400 pointer-events-none" />
                        <select className="pl-8 pr-8 py-1.5 text-sm bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-slate-700 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 cursor-pointer transition-colors">
                            <option value="due-date">Sort by: Due Date</option>
                            <option value="priority">Sort by: Priority</option>
                            <option value="title">Sort by: Title</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 text-slate-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <div
                            key={task.id}
                            className={`bg-white border hover:border-[#635BFF]/30 border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm transition-all group ${task.completed ? "opacity-60 hover:opacity-100" : ""
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => toggleTaskCompletion(task.id)}
                                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all flex-shrink-0 ${task.completed
                                        ? "bg-[#635BFF] border-[#635BFF] text-white"
                                        : "border-slate-300 hover:border-[#635BFF]"
                                        }`}
                                >
                                    {task.completed && <Check size={14} strokeWidth={3} />}
                                </button>
                                <div className="flex flex-col gap-1.5">
                                    <span className={`font-semibold text-slate-800 text-sm ${task.completed ? "line-through text-slate-400" : ""
                                        }`}>
                                        {task.title}
                                    </span>
                                    <div className="flex items-center gap-2 flex-wrap text-xs">
                                        <span className="bg-indigo-50 text-indigo-600 font-semibold px-2 py-0.5 rounded uppercase text-[10px] tracking-wider">
                                            {task.category}
                                        </span>

                                        {task.priority && (
                                            <span
                                                className={`font-semibold px-2 py-0.5 rounded text-[10px] tracking-wider flex items-center gap-1 ${getPriorityStyle(task.priority)}`}
                                            >
                                                • {task.priority}
                                            </span>
                                        )}

                                        <span className="text-slate-400 flex items-center gap-1">
                                            <Calendar size={12} />
                                            {task.dueDate ? new Date(task.dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : "No Due Date"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">

                                {task.assignee?.avatar && (
                                    <div className="flex -space-x-2 hidden sm:flex">
                                        <img
                                            src={task.assignee.avatar}
                                            alt={task.assignee.name || "Assignee"}
                                            title={task.assignee.name || "User"}
                                            className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-sm bg-slate-100"
                                        />
                                    </div>
                                )}



                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="text-red-400 font-semibold hover:text-red-600 p-2 text-xs rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                >
                                    Hapus
                                </button>

                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-slate-500 bg-white border border-slate-200 border-dashed rounded-xl overflow-hidden shadow-sm">
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                                <Check size={20} className="text-slate-400" />
                            </div>
                            <p className="font-medium text-slate-700">Tidak ada tugas ditemukan</p>
                            <p className="text-sm mt-1">Coba gunakan filter yang berbeda atau tambahkan tugas baru.</p>
                        </div>
                    </div>
                )}
            </div>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
}