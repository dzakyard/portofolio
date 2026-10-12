# Portofolio Pribadi — Oktavian Dzaky Ardhani

## 📑 Laporan Analisis Proyek

### 1. Keputusan Desain (Design Decisions)

#### A. Konsep Visual & Identitas Personal
Portofolio ini mengusung perpaduan konsep **Modern Minimalist UI** dan tema **System Administrator / Cybersecurity**. Desain ini dirancang khusus untuk merefleksikan latar belakang vokasi di bidang Teknik Komputer dan Jaringan (TKJ) serta kompetensi akademik saat ini sebagai mahasiswa S1 Informatika.

#### B. Tipografi Hibrida (Dual-Font Strategy)
Untuk memastikan antarmuka tetap memiliki nuansa teknis tanpa mengorbankan kenyamanan membaca:
* **Plus Jakarta Sans (Sans-Serif):** Diterapkan pada komponen navigasi, judul artikel, dan seluruh teks paragraf panjang (*About Me*, deskripsi proyek, sertifikasi). Font proporsional ini memiliki *kerning* yang seimbang dan keterbacaan (*readability*) tinggi.
* **JetBrains Mono (Monospace Programmer):** Diterapkan pada elemen teknologi spesifik seperti logo `<h1>`, profesi/sub-judul, label terminal lab, statistik counter follower, tanggal/badge timeline, dan kartu jumpbox SSH.
* **Skala Tipografi Modular:** Menggunakan unit berbasis `rem` dengan penataan hierarki ukuran yang tegas (`h1: 1.6rem`, `h2: 1.4rem`, `h3: 1.15rem`, `body: 0.95rem` dengan *line-height: 1.7*).

#### C. Design Tokens & Palet Warna (CSS Variables)
Pewarnaan dikelola secara terpusat melalui CSS Custom Properties pada `:root` dan `body.dark-mode`:
* **Light Mode:** Latar kanvas netral (`#f8fafc`), kartu putih (`#ffffff`), teks gelap (`#0f172a`), dan border halus (`#e2e8f0`).
* **Dark Mode:** Latar gelap pekat (`#0b0f19`), kartu *dark navy* (`#151d2e`), dan teks terang kontras (`#f8fafc`).
* **Aksen Fungsional:** Hijau neon (`#10b981` / `#22c55e`) untuk status sukses/aktif, serta biru langit (`#0284c7` / `#38bdf8`) untuk tautan navigasi dan fokus aksesibilitas.

#### D. Tata Letak Fleksibel (Flexbox & CSS Grid)
* **Flexbox:** Digunakan untuk komponen satu dimensi (navbar header, kartu profil berdampingan dengan *About Me*, grup tombol sosial, dan modal header).
* **CSS Grid (`auto-fit, minmax`):** Diterapkan pada galeri **Certificates** (`minmax(280px, 1fr)`) dan **Projects** (`minmax(300px, 1fr)`) agar kartu tertata rapi dan simetris di semua ukuran layar tanpa aturan media query berlebih.
* **Sticky Glassmorphism Header:** Header navigasi melayang di bagian atas layar (`position: sticky; top: 0`) dengan efek blur latar (`backdrop-filter: blur(12px)`).
* **Education Timeline:** Linimasa vertikal dengan indikator node dan garis pembatas vertikal (*border-left*) untuk memperjelas urutan riwayat pendidikan.

---

### 2. Kendala yang Dihadapi (Challenges)

1. **Header Sticky Menutupi Judul Section (*Anchor Scroll Overlap*):**
   * **Masalah:** Saat tautan menu navigasi diklik (`#skills`, `#certificates`, dll.), browser menggulir halaman hingga batas atas elemen tepat berada di koordinat `y = 0`. Karena header bersifat *sticky* dengan tinggi sekitar 70–80px, header menutupi bagian atas judul section target.
   * **Solusi:** Menerapkan `scroll-padding-top: 5.5rem` pada elemen `html` serta `scroll-margin-top: 5.5rem` pada seluruh section dan artikel target (disesuaikan menjadi `7.5rem` pada layar ponsel ≤ 640px).

2. **Kekalahan Bobot Selector CSS (*Specificity Collision*):**
   * **Masalah:** Class `.follow-active` yang ditambahkan JavaScript saat tombol diklik tidak mengubah warna tombol karena aturan tombol awal memiliki spesifisitas tinggi (`.container #profile #counter button` = 2 ID + 1 Class + 1 Tag).
   * **Solusi:** Menyelaraskan spesifisitas selector di CSS menjadi `.container #profile #counter button.follow-active` dan memperbaiki selector `:hover` terkait.

3. **Hilangnya Status Interaksi Saat Halaman Dimuat Ulang (*State Persistence*):**
   * **Masalah:** Nilai counter follower dan pilihan mode gelap selalu kembali ke kondisi awal saat halaman di-refresh.
   * **Solusi:** Memanfaatkan **Web Storage API (`localStorage`)** untuk menyimpan status `followCount`, `isFollowing`, dan `theme`. Event `DOMContentLoaded` memulihkan state terakhir secara instan.

4. **Integrasi Iframe SSH Jumpbox & Kebijakan Browser (*Mixed Content*):**
   * **Masalah:** Komponen Live Terminal awalnya mengakses port internal ttyd melalui protokol HTTP (`http://100.100.100.100:7681`). Saat website di-deploy ke HTTPS (GitHub Pages), browser memblokir pemuatan iframe karena aturan keamanan *Mixed Content*.
   * **Solusi:** Mengonfigurasi **Tailscale Funnel** resmi dengan endpoint HTTPS terenkripsi (`https://light-arch.tailfc208b.ts.net`), menambahkan atribut `allow="clipboard-read; clipboard-write"`, serta menerapkan teknik *lazy loading* iframe.

---

### 3. Cara Debugging (Debugging Methods)

1. **Pemeriksaan Box Model & CSS Specificity (DevTools Elements Panel):**
   * Menginspeksi margin, padding, dan hierarki penimpaan aturan (*cascading*) untuk melacak aturan CSS yang terkalahkan oleh selektor lain.
   * Memantau penambahan class dinamis secara *real-time* saat terjadi interaksi pengguna (`.dark-mode` pada `<body>` dan `.active` pada modal).
2. **Verifikasi Logika & Penanganan Error Runtime (DevTools Console Panel):**
   * Menggunakan `console.log()` dan inspeksi galat runtime untuk memvalidasi alur eksekusi event listener dan mencegah *null pointer exception*.
3. **Inspeksi Web Storage (DevTools Application Panel):**
   * Memeriksa tab **Application > Local Storage** untuk memvalidasi apakah nilai `followCount`, `isFollowing`, dan `theme` tersimpan dan diperbarui dengan benar.
4. **Audit Permintaan Jaringan & Aset (DevTools Network Panel):**
   * Memantau seluruh *traffic* HTTP/HTTPS untuk memastikan gambar, font Google Fonts, dan script termuat dengan status `200 OK`.
   * Mendeteksi dan memperbaiki error 404 pada pemanggilan berkas favicon sebelum deployment.
5. **Pengujian Responsivitas Multi-Perangkat (Device Toolbar Emulation):**
   * Memanfaatkan fitur *Responsive Design Mode* untuk menyimulasikan berbagai resolusi layar (Mobile: 375px/412px, Tablet: 768px/820px, dan Desktop: 1080px/1440px) guna memastikan tidak terjadi *horizontal overflow*.

---

## 🛠️ Teknologi yang Digunakan

* **HTML5:** Semantic Elements (`header`, `nav`, `main`, `section`, `article`, `footer`)
* **CSS3:** Flexbox, CSS Grid, CSS Variables / Design Tokens, Glassmorphism, Media Queries
* **JavaScript (ES6+):** DOM Manipulation, Event Listeners, Web Storage API (`localStorage`)
* **Deployment & Networking:** GitHub Pages, Tailscale Funnel (HTTPS SSH Terminal)