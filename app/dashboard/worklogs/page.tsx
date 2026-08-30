"use client"
import { Timer, ClipboardList, Clock, TrendingUp } from "lucide-react";

export default function WorklogsPage() {
    return (
        <div className="flex flex-col mx-auto max-w-full">
            <div className="flex justify-between">
                <div>
                    <h1 className="font-bold text-slate-800">Halaman Worklogs</h1>
                    <p className="text-slate-600">Kelola worklogs Anda di sini</p>
                </div>

                <button className="bg-white flex items-center gap-1.5 hover:bg-gray-100 text-gray-600 font-semibold py-2.5 px-4 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 border border-gray-250 focus:ring-gray-100/50 focus:ring-offset-2">
                    <Timer className="w-4 h-4" />
                    Log Time
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {/* Card 1 */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-250 p-6 flex flex-col justify-between min-h-[130px]">
                    <div className="flex justify-between items-start">
                        <h3 className="text-sm font-semibold text-slate-500">Total Entires</h3>
                        <div className="p-2 bg-[#635BFF]/10 text-[#635BFF] rounded-lg">
                            <ClipboardList className="w-5 h-5" />
                        </div>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-slate-900 mt-2">12</p>
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
                        <p className="text-3xl font-bold text-slate-900 mt-2">34j</p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-250 p-6 flex flex-col justify-between min-h-[130px]">
                    <div className="flex justify-between items-start">
                        <h3 className="text-sm font-semibold text-slate-500">Avg. Daily</h3>
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-slate-900 mt-2">85%</p>
                    </div>
                </div>

            </div>
        </div>
    )
}