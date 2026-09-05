"use client"
import { useState, useEffect } from "react"
import { ClipboardList, Clock, TrendingUp } from "lucide-react";
import { Priority } from "@prisma/client";
export default function DashboardPage() {

  const [task, setTask] = useState<any[]>([]);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch('/api/tasks')
        const data = await res.json();

        if (res.ok) {
          setTask(data)
        }
      } catch (error) {
        console.error("Gagal terhubung ke API", error)
      }
    }

    const fetchWorklogs = async () => {
      try {
        const res = await fetch("/api/worklogs");
        const data = await res.json();
        if (res.ok) setTotalHours(data.reduce((acc: number, log: any) => acc + log.hours, 0));
      } catch (err) { }
    }

    fetchTask()
    fetchWorklogs()

  }, [])
  const totalTugas = task.length;

  const tugasSelesai = task.filter((t: any) => t.completed === true).length;
  const progressPersen = totalTugas === 0 ? 0 : Math.round((tugasSelesai / totalTugas) * 100)

  const renderPriorityBadge = (priority: string) => {
    if (priority === "HIGH") {
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Tinggi</span>
    } else if (priority === "MEDIUM") {
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">Menengah</span>
    } else {
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Rendah</span>
    }

  }

  return (
    <div className="max-w-full mx-auto w-full flex flex-col pb-8">
      {/*Card statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-250 p-6 flex flex-col justify-between min-h-[130px]">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-semibold text-slate-500">Total Tugas</h3>
            <div className="p-2 bg-[#635BFF]/10 text-[#635BFF] rounded-lg">
              <ClipboardList className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900 mt-2">{totalTugas}</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-250 p-6 flex flex-col justify-between min-h-[130px]">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-semibold text-slate-500">Total Jam Kerja</h3>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900 mt-2">{totalHours}j</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-250 p-6 flex flex-col justify-between min-h-[130px]">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-semibold text-slate-500">Tingkat Penyelesaian</h3>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900 mt-2">{progressPersen}</p>
          </div>
        </div>

      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">


        <div className="lg:col-span-3 bg-white border border-slate-250 rounded-xl shadow-sm overflow-hidden">
          {/* Table Header Area */}
          <div className="px-6 py-5 border-b border-slate-250 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Tugas Aktif Terkini</h2>
            <a href="/dashboard/tasks" className="bg-neutral-50 hover:bg-neutral-100 text-[#635BFF] font-semibold py-2.5 px-4 rounded-xl text-sm transition-all focus:ring focus:ring-indigo-100">
              Lihat Semua
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-100 border-b border-slate-200/80">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">Nama Tugas</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Prioritas</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Assignee</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Batas Waktu</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {task.slice(0, 5).map((task: any) => (
                  <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{task.title}</td>
                    <td className="px-6 py-4">{renderPriorityBadge(task.priority)}</td>
                    <td className="px-6 py-4 text-slate-600">{task.assignee?.name || "-"}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : "-"}
                    </td>
                    <td className="px-6 py-4">
                      {task.completed ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600">Selesai</span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#635BFF]/10 text-[#635BFF]">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
                {task.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-slate-400">Belum ada tugas!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>


      </div>
    </div>
  )
}
