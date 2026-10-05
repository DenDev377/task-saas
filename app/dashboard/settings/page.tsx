"use client"
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { User as UserIcon, Lock, Save, Camera, Mail } from "lucide-react";

export default function SettingsPage() {
    const { data: session, update } = useSession();
    
    // Status
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Form Profil
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    
    // Form Password
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || "");
            setAvatar((session.user as any).avatar || "https://mockmind-api.uifaces.co/content/human/80.jpg");
        }
    }, [session]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await fetch("/api/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, avatar })
            });
            const data = await res.json();
            
            if (!res.ok) {
                setError(data.message || "Gagal memperbarui profil.");
            } else {
                setSuccess("Profil berhasil diperbarui!");
                // Force session update kalau dibutuhkan di browser
                await update({ name: data.user.name, avatar: data.user.avatar });
            }
        } catch (err) {
            setError("Koneksi bermasalah saat menyimpan.");
        } finally {
            setLoading(false);
            setTimeout(() => setSuccess(""), 5000);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!oldPassword || !newPassword) {
            setError("Password lama dan baru harus diisi.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await fetch("/api/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ oldPassword, newPassword })
            });
            const data = await res.json();
            
            if (!res.ok) {
                setError(data.message || "Gagal mengubah password.");
            } else {
                setSuccess("Password berhasil diubah! Silakan login kembali dengan password baru.");
                setOldPassword("");
                setNewPassword("");
                setTimeout(() => signOut({ callbackUrl: "/login" }), 3000);
            }
        } catch (err) {
            setError("Koneksi bermasalah.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col max-w-4xl mx-auto pb-10">
            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Halaman Pengaturan & Akun</h1>
                <p className="text-slate-600 mt-1">Kelola identitas, foto profil, dan keamanan akun Anda</p>
            </div>

            {/* NOTIFIKASI */}
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-medium border border-red-100 flex items-center gap-3">
                    <span className="block w-2 h-2 rounded-full bg-red-600"></span>
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl mb-6 font-medium border border-emerald-100 flex items-center gap-3">
                    <CheckSquareIcon className="w-2 h-2 rounded-full bg-emerald-600" />
                    {success}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* BAGIAN PROFIL & AVATAR */}
                <div className="md:col-span-2 space-y-8">
                    
                    {/* FORM INFO PROFIL */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                            <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                                <UserIcon className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800">Informasi Profil Primer</h2>
                        </div>
                        
                        <form onSubmit={handleUpdateProfile} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Masukkan nama Anda..."
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF] transition-all text-sm"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Login (Read Only)</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <input
                                        type="email"
                                        value={session?.user?.email || ""}
                                        disabled
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed text-sm"
                                    />
                                </div>
                                <p className="text-xs text-slate-400 mt-2">Untuk mengganti email, hubungi Administrator sistem Anda.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">URL Foto Profil (Avatar)</label>
                                <div className="relative">
                                    <Camera className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <input
                                        type="url"
                                        value={avatar}
                                        onChange={(e) => setAvatar(e.target.value)}
                                        placeholder="https://images.unsplash.com/xxx..."
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF] transition-all text-sm"
                                    />
                                </div>
                            </div>
                            
                            <div className="pt-2">
                                <button type="submit" disabled={loading} className="flex items-center justify-center gap-2 bg-[#635BFF] hover:bg-[#534be0] disabled:bg-indigo-300 text-white font-bold py-2.5 px-6 rounded-xl shadow-sm text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#635BFF]/50 w-full sm:w-auto">
                                    <Save className="w-4 h-4" />
                                    <span className="tracking-wide">Simpan Perubahan</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* FORM KEAMANAN / PASSWORD */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                            <div className="bg-amber-50 p-2 rounded-lg text-amber-600">
                                <Lock className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800">Keamanan & Ubah Password</h2>
                        </div>
                        
                        <form onSubmit={handleUpdatePassword} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Password Saat Ini</label>
                                <input
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    placeholder="Masukkan password lama..."
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all text-sm"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Password Baru</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Masukkan password baru..."
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all text-sm"
                                />
                                <p className="text-xs text-slate-400 mt-2">Gunakan password yang kuat agar akun Anda aman dari pencurian sesi.</p>
                            </div>
                            
                            <div className="pt-2">
                                <button type="submit" disabled={loading} className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-400 text-white font-bold py-2.5 px-6 rounded-xl shadow-sm text-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-800/50 w-full sm:w-auto">
                                    <Lock className="w-4 h-4" />
                                    <span className="tracking-wide">Perbarui Password</span>
                                </button>
                            </div>
                        </form>
                    </div>

                </div>

                {/* BAGIAN SIDEBAR PREVIEW (Card 3) */}
                <div className="md:col-span-1">
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden sticky top-6">
                        <div className="h-24 bg-gradient-to-r from-indigo-500 to-[#635BFF]"></div>
                        <div className="px-6 flex justify-center -mt-12 relative">
                            <div className="bg-white rounded-full p-1 shadow-sm">
                                <img 
                                    src={avatar || "https://mockmind-api.uifaces.co/content/human/80.jpg"}
                                    alt="Preview"
                                    className="w-24 h-24 rounded-full object-cover border border-slate-100 bg-slate-50"
                                />
                            </div>
                        </div>
                        <div className="px-6 pb-8 pt-4 text-center">
                            <h3 className="text-base font-bold text-slate-800 leading-tight">{name || "Nama Pengguna"}</h3>
                            <div className="mt-1 flex items-center justify-center gap-1">
                                <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 uppercase tracking-wider border border-slate-200">
                                    {(session?.user as any)?.role || "Role"}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5 mt-4 pt-4 border-t border-slate-100 font-medium">
                                <Mail className="w-3.5 h-3.5" />
                                {session?.user?.email || "email@perusahaan.com"}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

// Dummy Icon Component untuk meminimalisasi error import tambahan
const CheckSquareIcon = ({ className }: { className?: string }) => (
    <span className={className} />
);