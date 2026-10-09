# 🌍 ClimateSense

**Understand the Earth, Act Together.**

ClimateSense adalah platform web interaktif yang membantu pengguna memahami kondisi iklim dan lingkungan secara real-time melalui visualisasi data, peta interaktif, dan analisis berbasis AI.

## ✨ Fitur Utama

- **Peta Interaktif** — Eksplorasi data lingkungan menggunakan Leaflet maps
- **AI Climate Analyst** — Analisis iklim cerdas berbasis kecerdasan buatan
- **Visualisasi Data** — Grafik dan chart interaktif menggunakan Recharts
- **Program Komunitas** — Informasi program dan dampak komunitas terhadap lingkungan
- **Responsif** — Tampilan optimal di berbagai ukuran perangkat

## 🛠️ Tech Stack

| Kategori | Teknologi |
|---|---|
| Framework | React 19 |
| Bundler | Vite 8 |
| Styling | Tailwind CSS 3 |
| Routing | React Router DOM 7 |
| Peta | Leaflet + React Leaflet |
| Grafik | Recharts |
| Linting | oxlint |
| Font | Plus Jakarta Sans, Nunito |

## 📁 Struktur Proyek

```
climateSense/
├── apps/
│   └── web/              # Aplikasi web utama
│       ├── src/
│       │   ├── components/   # Komponen UI
│       │   ├── pages/        # Halaman (Home, Explore)
│       │   ├── context/      # React Context
│       │   ├── hooks/        # Custom hooks
│       │   ├── services/     # Service layer
│       │   ├── utils/        # Utility functions
│       │   └── assets/       # Aset statis
│       └── public/           # File publik
└── package.json          # Monorepo root config
```

## 🚀 Cara Menjalankan

### Prasyarat

- [Node.js](https://nodejs.org/) (v18 atau lebih baru)
- npm

### Instalasi

```bash
# Clone repository
git clone https://github.com/username/climateSense.git
cd climateSense

# Install dependencies
npm install
```

### Development

```bash
# Jalankan development server
cd apps/web
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`.

### Build

```bash
# Build untuk production
cd apps/web
npm run build
```

### Preview

```bash
# Preview hasil build
cd apps/web
npm run preview
```

## 📄 Lisensi

MIT License — Silakan gunakan dan modifikasi sesuai kebutuhan.
