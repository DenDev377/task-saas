# TaskMaster SaaS 🚀

> Platform manajemen tugas berbasis web yang dibangun dengan **Next.js 16**, **Prisma ORM**, **MySQL**, dan **NextAuth.js** — dirancang untuk individu maupun tim kecil yang ingin melacak pekerjaan secara terstruktur.

---

## 📸 Tampilan Aplikasi

| Halaman | Deskripsi |
|---|---|
| `/dashboard` | Ringkasan statistik & daftar tugas aktif |
| `/dashboard/tasks` | Manajemen tugas penuh (CRUD) |
| `/dashboard/worklogs` | Pencatatan jam kerja harian |
| `/dashboard/team` | Daftar anggota tim beserta statistik mereka |

---

## ✨ Fitur Utama

### 🔐 Autentikasi
- Sistem **Login & Registrasi** dengan password di-*hash* menggunakan `bcryptjs`
- Sesi aman berbasis **JWT** dikelola oleh **NextAuth.js**
- *Protected routes* via **Next.js Middleware**

### ✅ Manajemen Tugas (Full C.R.U.D)
- **Tambah** tugas baru dengan judul, kategori, prioritas, dan batas waktu
- **Tampilkan** daftar tugas dengan filter status (semua / selesai)
- **Edit** tugas melalui modal form yang sudah terisi otomatis
- **Hapus** tugas dengan konfirmasi
- **Toggle** status selesai dengan *Optimistic UI Update*

### ⏱️ Worklogs (Catatan Jam Kerja)
- Catat berapa jam yang dihabiskan untuk suatu tugas tertentu
- Edit atau hapus catatan yang sudah ada
- Statistik total jam kerja ditampilkan secara real-time
- Histori catatan diurutkan dari terbaru ke terlama

### 👥 Team Overview
- Tampilkan seluruh anggota yang terdaftar di aplikasi
- Kartu profil menampilkan **Avatar**, **Role** (Admin/User), total tugas aktif, dan total worklog
- Data diambil langsung dari database

### 🔔 Navbar Interaktif
- **Search Real-time** — Cari tugas berdasarkan kata kunci dengan *debounce 350ms*
- **Panel Notifikasi** — 5 aktivitas terbaru (worklog baru + tugas selesai) tanpa perlu model database tambahan
- **Avatar + Nama User** — Ditampilkan dari sesi login aktif

---

## 🛠️ Tech Stack

| Teknologi | Versi | Kegunaan |
|---|---|---|
| **Next.js** | 16.3.1 | Framework full-stack (App Router) |
| **React** | 19.2.8 | UI library |
| **TypeScript** | ^5 | Type safety |
| **Tailwind CSS** | ^4 | Styling |
| **Prisma ORM** | ^7.9.1 | Akses database |
| **MySQL / MariaDB** | — | Database utama |
| **NextAuth.js** | ^4.24.15 | Autentikasi & sesi |
| **bcryptjs** | ^3.0.3 | Hash password |
| **Lucide React** | ^1.33.0 | Ikon UI |

---

## 📁 Struktur Folder

```
task-saas/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/   # NextAuth handler
│   │   ├── notifications/        # GET aktivitas terbaru
│   │   ├── register/             # POST registrasi user
│   │   ├── search/               # GET pencarian tugas
│   │   ├── tasks/
│   │   │   ├── route.ts          # GET semua tugas, POST buat tugas
│   │   │   └── [id]/route.ts     # PATCH toggle, PUT edit, DELETE hapus
│   │   ├── team/                 # GET daftar anggota tim
│   │   └── worklogs/
│   │       ├── route.ts          # GET histori, POST buat log
│   │       └── [id]/route.ts     # PUT edit, DELETE hapus log
│   ├── dashboard/
│   │   ├── page.tsx              # Halaman utama dashboard
│   │   ├── tasks/page.tsx        # Halaman manajemen tugas
│   │   ├── worklogs/page.tsx     # Halaman catatan jam kerja
│   │   └── team/page.tsx         # Halaman tim
│   ├── login/page.tsx
│   └── register/page.tsx
├── components/
│   └── dashboard/
│       ├── Navbar.tsx            # Navbar interaktif (search, notif, avatar)
│       ├── Sidebar.tsx           # Navigasi sidebar dengan logout
│       ├── TaskModal.tsx         # Modal form tambah/edit tugas
│       └── WorklogModal.tsx      # Modal form tambah/edit worklog
├── lib/
│   └── prisma.ts                 # Singleton Prisma Client
├── prisma/
│   └── schema.prisma             # Skema database
└── middleware.ts                 # Proteksi rute dashboard
```

---

## 🗄️ Skema Database

```prisma
model User {
  id            Int      @id @default(autoincrement())
  name          String
  email         String   @unique
  password      String
  role          Role     @default(ADMIN)  // ADMIN | USER
  avatar        String
  createdTasks  Task[]   @relation("CreatedTasks")
  assignedTasks Task[]   @relation("AssignedTasks")
  worklogs      Worklog[]
}

model Task {
  id          Int      @id @default(autoincrement())
  title       String
  category    String?
  priority    Priority  // LOW | MEDIUM | HIGH
  status      Status    // PENDING | IN_PROGRESS | COMPLETED
  completed   Boolean
  dueDate     DateTime?
  createdById Int
  assigneeId  Int
  worklogs    Worklog[]
}

model Worklog {
  id      Int      @id @default(autoincrement())
  taskId  Int
  userId  Int
  hours   Float
  date    DateTime
  note    String?
}
```

---

## 🚀 Cara Menjalankan Proyek

### 1. Clone dan Install Dependensi

```bash
git clone <url-repo>
cd task-saas
npm install
```

### 2. Konfigurasi Environment

Buat file `.env` di root proyek dan isi dengan:

```env
# Koneksi Database MySQL / MariaDB
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/saas_db"

# Kunci rahasia untuk NextAuth (bebas, gunakan string acak panjang)
NEXTAUTH_SECRET="isi-dengan-string-acak-yang-aman"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Jalankan Migrasi Database

```bash
# Push skema ke database & generate Prisma Client
npx prisma db push
npx prisma generate
```

### 4. Jalankan Server Development

```bash
npm run dev
```

Buka browser di **http://localhost:3000** dan daftar akun baru untuk mulai menggunakan aplikasi.

---

## 🔗 API Reference

| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/api/register` | Registrasi user baru |
| `GET` | `/api/tasks` | Ambil semua tugas milik user |
| `POST` | `/api/tasks` | Buat tugas baru |
| `PUT` | `/api/tasks/[id]` | Edit tugas berdasarkan ID |
| `PATCH` | `/api/tasks/[id]` | Toggle status selesai |
| `DELETE` | `/api/tasks/[id]` | Hapus tugas |
| `GET` | `/api/worklogs` | Ambil histori log kerja |
| `POST` | `/api/worklogs` | Catat log kerja baru |
| `PUT` | `/api/worklogs/[id]` | Edit log kerja |
| `DELETE` | `/api/worklogs/[id]` | Hapus log kerja |
| `GET` | `/api/team` | Ambil daftar anggota tim |
| `GET` | `/api/search?q=...` | Pencarian tugas berdasarkan kata kunci |
| `GET` | `/api/notifications` | Ambil 5 aktivitas terbaru |

---

## 📝 Lisensi

Proyek ini dibuat untuk tujuan pembelajaran dan pengembangan portofolio pribadi.

---

> Dibuat dengan ❤️ menggunakan **Next.js** + **Prisma** + **MySQL**
