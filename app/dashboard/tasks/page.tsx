"use client"
import { useState } from "react"
import { Plus, SlidersHorizontal, Calendar, Check } from "lucide-react";

export default function TaskPage() {

    const [activeTab, setActiveTab] = useState("all")

    const task = [{
        id: 1,
        title: "Finalize Q3 Marketing Strategy Presentation",
        category: "Marketing",
        priority: "High Priority",
        dueDate: "Oct 15, 2026",
        avatars: ["https:/i.pravatar.cc/150?u=1"],
        complete: false,
        status: "In Progress",
    },
    {
        id: 2,
        title: "Review Design System Component Tokens",
        category: "Design",
        priority: "Medium Priority",
        dueDate: "Oct 18, 2026",
        avatars: ["https:/i.pravatar.cc/150?u=2"],
        complete: false,
        status: "In Progress",
    },
    {
        id: 3,
        title: "Implement User Authentication Flow",
        category: "Development",
        priority: "High Priority",
        dueDate: "Oct 20, 2026",
        avatars: ["https:/i.pravatar.cc/150?u=3"],
        complete: true,
        status: "Done",
    }
    ]

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
    return (
        <div className="flex flex-col max-w-full">
            <div className="flex justify-between">
                <div>
                    <h1 className=" font-bold text-slate-800">Halaman Tugas</h1>
                    <p className="text-slate-600">Kelola tugas Anda di sini</p>
                </div>

                <button className="bg-[#635BFF] flex items-center gap-1.5 hover:bg-[#534be0] text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm text-sm transition-all">
                    <Plus className="w-4 h-4" />
                    Tambah Tugas
                </button>
            </div>

            <div className="mt-8 bg-white border border-slate-250 rounded-xl shadow-sm p-6 h-20 flex justify-between items-center">
                <div className="flex bg-slate-100/80 p-1 rounded-lg gap-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.value}
                            onClick={() => setActiveTab(item.value)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === item.value
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
                        <SlidersHorizontal size={14} className="absolute left-3 text-slate-400" />
                        <select className="pl-8 py-1.5 px-4 bg-white border border-slate-250 rounded-lg text-slate-700 font-medium appearance-none focus:outline-none focus:ring-indigo-500/20">
                            <option> Status: All</option>

                        </select>


                    </div>
                    <div className="relative flex items-center">
                        <SlidersHorizontal size={14} className="absolute left-3 text-slate-400" />
                        <select className="pl-8 pr-8 py-1.5 bg-white border border-slate-250 rounded-lg text-slate-700 font-medium appearance-none focus:outline-none focus:ring-indigo-500/20">
                            <option>Sort by: Due Date</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3">


            </div>

        </div>


    )
}