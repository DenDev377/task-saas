"use client"

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError(res.error === "CredentialsSignin" ? "Email atau password salah." : res.error);
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch {
            setError("Terjadi kesalahan jaringan. Coba lagi.");
        } finally {
            setLoading(false);
        }
    }
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

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Alamat Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="contoh@email.com" className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF] transition-all rounded-xl text-slate-900 text-sm" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="block text-sm font-semibold text-slate-700">Password</label>
                            <a href="#" className="text-xs font-semibold text-[#635BFF] hover:text-[#534be0]">Lupa password?</a>
                        </div>
                        <div className="relative">
                            <input value={password} onChange={(e) => setPassword(e.target.value)} required type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full px-4 py-2.5 pr-10 bg-slate-50 hover:bg-slate-100 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF] transition-all rounded-xl text-slate-900 text-sm" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    {error && (
                        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-sm">
                            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    )}
                    <button type="submit" disabled={loading} className="w-full bg-[#635BFF] hover:bg-[#534be0] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl shadow-md text-sm transition-all mt-2">
                        {loading ? "Memproses..." : "Masuk"}
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