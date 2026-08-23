"use client"

import Link from "next/link";

export default function LoginPage() {
    return (
        <main className="min-h-screen relative flex items-center justify-center px-4 bg-[#F8FAFC] overflow-hidden">

            <div className="absolute inset-0 z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#635BFF]/10 blur-[100px]" />
                <div className="absolute top-[30%] -right-[15%] w-[40%] h-[40%] rounded-full bg-emerald-400/10 blur-[100px]" />
            </div>

            <div className="w-full max-w-[420px] bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/80 shadow-xl p-8 z-10">
                <div className="mb-8 text-center">
                    <div className="w-12 h-12 bg-[#635BFF] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md mx-auto mb-4">
                        TM
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Selamat Datang Kembali</h1>
                    <p className="text-slate-500 text-sm mt-2">Masuk ke akun TaskMaster Anda</p>
                </div>

                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Alamat Email</label>
                        <input type="email" placeholder="contoh@email.com" className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF] transition-all rounded-xl text-slate-900 text-sm" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="block text-sm font-semibold text-slate-700">Password</label>
                            <a href="#" className="text-xs font-semibold text-[#635BFF] hover:text-[#534be0]">Lupa password?</a>
                        </div>
                        <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF] transition-all rounded-xl text-slate-900 text-sm" />
                    </div>
                    <button type="submit" className="w-full bg-[#635BFF] hover:bg-[#534be0] text-white font-bold py-3 px-4 rounded-xl shadow-md text-sm transition-all mt-2">
                        Masuk
                    </button>
                </form>

                <div className="mt-8 flex items-center gap-3">
                    <div className="flex-1 h-px bg-slate-200"></div>
                    <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Atau masuk dengan</span>
                    <div className="flex-1 h-px bg-slate-200"></div>
                </div>

                <div className="mt-6 flex justify-center">
                    <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-600 shadow-sm">
                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#EA4335" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" /></svg>
                        Lanjutkan dengan Google
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500">Belum punya akun? <Link href="/register" className="text-[#635BFF] hover:text-[#534be0] font-bold">Daftar sekarang</Link></p>
                </div>
            </div>
        </main>
    )
}