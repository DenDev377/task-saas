import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A2540] flex flex-col justify-between">
      <header className="border border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16 ">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#635BFF] rounded-xl flex items-center justify-center text-white font-bold text-base shadow-sm">
              T
            </div>
            <span className="font-bold text-lg text-[#0A2540] tracking-tight">
              TaskSaaS
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-[#0A2540] hover:text-[#635BFF] px-3.5 py-2 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="bg-[#635BFF] hover:bg-[#534be0] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-44 pb-16 flex-1 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.15] text-[#0A2540]">
          Manajemen Tugas Tim dan Pencatatan Jam Kerja Harian
        </h1>

        <p className="mt-5 text-slate-500 text-base md:text-lg max-w-xl leading-relaxed">
          Sistem manajemen tugas modern berbasis role (Admin & User). Pantau
          pengerjaan tim, catat jam kerja harian, dan tingkatkan produktivitas.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            href="/register"
            className="w-full sm:w-auto bg-[#635BFF] hover:bg-[#534be0] text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-sm text-sm"
          >
            Mulai Sekarang — Gratis
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto bg-white border border-slate-200 text-[#0A2540] hover:bg-slate-50 font-semibold px-6 py-3 rounded-xl transition-all shadow-sm text-sm"
          >
            Masuk ke Dashboard
          </Link>
        </div>

        <div className="mt-14 w-full max-w-4xl bg-white border border-slate-200/80 rounded-2xl shadow-sm p-4 md:p-6 text-left">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
            </div>
            <p className="text-xs font-mono text-slate-400">
              app.tasksaas.com/dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-100">
              <p className="text-xs text-slate-400 font-bold uppercase">
                Total Tasks
              </p>
              <p className="text-2xl font-bold text-[#0A2540] mt-1">24 Tasks</p>
            </div>
            <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-100">
              <p className="text-xs text-slate-400 font-bold uppercase">
                Hours Logged
              </p>
              <p className="text-2xl font-bold text-[#0A2540] mt-1">
                142.5 hrs
              </p>
            </div>
            <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-100">
              <p className="text-xs text-slate-400 font-bold uppercase">
                Role Active
              </p>
              <p className="text-2xl font-bold text-[#635BFF] mt-1">
                ADMIN / USER
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t border-slate-200/80 bg-white py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>
            © 2026 TaskSaaS. Built with Next.js, Prisma, & NextAuth.
          </p>
          <div className="flex gap-4">
            <span className="hover:text-[#635BFF] cursor-pointer">Privacy</span>
            <span className="hover:text-[#635BFF] cursor-pointer">Terms</span>
            <span className="hover:text-[#635BFF] cursor-pointer">
              Documentation
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
