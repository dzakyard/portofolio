# Analisis Proyek Portofolio Web
**Nama:** Oktavian Dzaky Ardhani  
**Program Studi:** S1 Informatika — Universitas Teknologi Yogyakarta  
**Mata Kuliah:** Pemrograman Web  

---

## 1. Keputusan Desain (Design Decisions)

### A. Konsep Visual & Identitas Personal
Portofolio ini mengusung perpaduan konsep **Modern Minimalist UI** dan **Cybersecurity / System Administrator Theme**. Desain ini dirancang khusus untuk merefleksikan latar belakang vokasi penulis di bidang Teknik Komputer dan Jaringan (TKJ) serta kompetensi saat ini sebagai mahasiswa S1 Informatika yang berfokus pada Web Development, Networking (MikroTik MTCNA), dan Ethical Hacking.

### B. Tipografi Hibrida (Dual-Font Strategy)
Untuk memastikan antarmuka tetap memiliki nuansa teknikal tanpa mengorbankan kenyamanan membaca pengguna, diterapkan strategi tipografi hibrida:
* **Plus Jakarta Sans (Sans-Serif Modern):** Diterapkan pada komponen navigasi, judul artikel, dan seluruh teks paragraf panjang (*About Me*, deskripsi proyek, serta capaian sertifikasi). Font proporsional ini memiliki *kerning* yang seimbang dan keterbacaan (*readability*) tinggi, sehingga tidak melelahkan mata saat membaca konten deskriptif.
* **JetBrains Mono (Monospace Programmer):** Diterapkan secara selektif pada elemen teknis seperti logo `<h1>`, sub-judul profesi, label kode terminal, statistik counter follower, tanggal/badge timeline, dan kartu simulasi jumpbox SSH.
* **Skala Tipografi Modular:** Menggunakan unit berbasis `rem` dengan penataan hierarki ukuran yang tegas (`h1: 1.6rem`, `h2: 1.4rem`, `h3: 1.15rem`, `body: 0.95rem` dengan *line-height: 1.7*).

### C. Design Tokens & Arsitektur Palet Warna (CSS Variables)
Pewarnaan dikelola secara terpusat melalui CSS Custom Properties pada `:root` dan `body.dark-mode`:
* **Light Mode:** Menggunakan latar kanvas abu-abu sangat muda (`#f8fafc`) dengan kartu berwarna putih murni (`#ffffff`), teks gelap (`#0f172a`), dan bayangan elevasi halus.
* **Dark Mode:** Menggunakan latar gelap pekat (`#0b0f19`) berpadu dengan kartu *dark navy* (`#151d2e`) dan teks terang kontras (`#f8fafc`).
* **Aksen Warna Fungsional:** Hijau neon (`#10b981` / `#22c55e`) sebagai indikator status aktif (tombol Following, terminal success, badge aktif), dan biru langit (`#0284c7` / `#38bdf8`) untuk tautan navigasi dan fokus aksesibilitas.

### D. Tata Letak Fleksibel (Flexbox & CSS Grid)
* **Flexbox:** Digunakan untuk komponen tata letak satu dimensi, seperti penataan navbar header, penyusunan kartu profil dengan kartu *About Me*, pengelompokan tombol sosial media, dan struktur internal modal.
* **CSS Grid (`auto-fit, minmax`):** Diterapkan pada galeri **Certificates** (`minmax(280px, 1fr)`) dan **Projects** (`minmax(300px, 1fr)`). Pendekatan ini memungkinkan kartu tertata secara responsif dan simetris di berbagai resolusi layar tanpa memerlukan banyak aturan media query manual.
* **Sticky Glassmorphism Header:** Header navigasi ditempatkan secara melayang di bagian atas layar (`position: sticky; top: 0`) dengan efek blur latar (`backdrop-filter: blur(12px)`) agar pengunjung dapat mengakses navigasi kapan saja dengan mulus.
* **Education Timeline:** Ditampilkan dalam format linimasa vertikal dengan indikator node dan garis penghubung (*border-left*) untuk mempertegas urutan riwayat pendidikan secara *reverse-chronological*.

---

## 2. Kendala yang Dihadapi (Challenges)

1. **Header Sticky Menutupi Judul Section (*Anchor Scroll Overlap*):**
   * *Kendala:* Saat menu navigasi diklik (misalnya `#skills` atau `#projects`), browser menggulir halaman hingga elemen target berada tepat di ujung atas jendela peramban (`y = 0`). Karena header navigasi bersifat *sticky* dengan tinggi sekitar 70–80px, header tersebut menutupi judul dan bagian atas kartu section target.
   * *Solusi:* Menerapkan properti CSS `scroll-padding-top: 5.5rem` pada elemen `html` serta `scroll-margin-top: 5.5rem` pada elemen section/artikel target. Untuk layar ponsel (≤ 640px) di mana header membungkus menjadi lebih tinggi, offset diperlebar menjadi `7.5rem`.

2. **Kekalahan Bobot Selector CSS (*Specificity Collision*):**
   * *Kendala:* Class `.follow-active` yang ditambahkan oleh JavaScript saat tombol Follow diklik tidak menghasilkan perubahan warna latar belakang. Hal ini terjadi karena selector tombol awal diatur menggunakan bobot spesifisitas yang sangat tinggi (`.container #profile #counter button` bernilai 2 ID + 1 Class + 1 Tag), sehingga mengabaikan aturan `.follow-active` biasa.
   * *Solusi:* Menyelaraskan spesifisitas selector di CSS menjadi `.container #profile #counter button.follow-active` dan memperbaiki selector `:hover` terkait.

3. **Hilangnya Status Interaksi Saat Halaman Dimuat Ulang (*State Persistence*):**
   * *Kendala:* Nilai counter follower dan pilihan mode gelap (*Dark Mode*) selalu ter-reset ke kondisi awal setiap kali halaman di-refresh.
   * *Solusi:* Memanfaatkan **Web Storage API (`localStorage`)** untuk menyimpan status `followCount`, `isFollowing`, dan `theme`. Logika inisialisasi pada event `DOMContentLoaded` memastikan browser memulihkan state terakhir secara instan saat halaman dibuka kembali.

4. **Integrasi Iframe SSH Jumpbox & Kebijakan Keamanan Browser (*Mixed Content*):**
   * *Kendala:* Komponen Live Terminal awalnya mengakses port internal ttyd melalui protokol HTTP (`http://100.100.100.100:7681`). Saat website di-deploy ke hosting publik berprotokol HTTPS (seperti GitHub Pages), browser secara otomatis memblokir pemuatan iframe karena melanggar aturan keamanan *Mixed Content*.
   * *Solusi:* Mengonfigurasi **Tailscale Funnel** untuk menyediakan endpoint HTTPS terenkripsi resmi (`https://light-arch.tailfc208b.ts.net`), menambahkan atribut `allow="clipboard-read; clipboard-write"`, serta mengimplementasikan teknik *lazy loading* (hanya memuat atribut `src` iframe saat tombol peluncur modal diklik dan mengosongkannya kembali saat ditutup guna menghemat sumber daya sistem).

---

## 3. Cara Debugging (Debugging Methods)

1. **Pemeriksaan Box Model & CSS Specificity (DevTools Elements Panel):**
   * Menggunakan panel *Elements* dan tab *Computed / Styles* pada browser untuk menginspeksi margin, padding, dan kalkulasi ukuran tiap elemen.
   * Mengamati hierarki penimpaan aturan (*cascading*) untuk mendeteksi aturan CSS yang tercoret (terkalahkan oleh selektor lain), yang menjadi kunci dalam menyelesaikan masalah spesifisitas `.follow-active`.
   * Menguji perubahan class secara *real-time* saat terjadi interaksi JavaScript (memantau penambahan class `.dark-mode` pada `<body>` dan class `.active` pada modal).

2. **Verifikasi Logika & Penanganan Error Runtime (DevTools Console Panel):**
   * Memanfaatkan `console.log()` dan pengamatan pesan galat (*error output*) untuk melacak alur eksekusi event listener pada tombol toggle dan modal.
   * Memastikan tidak ada galat *null pointer exception* saat script mencoba memanipulasi elemen DOM yang belum tersedia.

3. **Inspeksi Web Storage (DevTools Application Panel):**
   * Memeriksa tab **Application > Storage > Local Storage** untuk memvalidasi apakah kunci `followCount`, `isFollowing`, dan `theme` benar-benar tersimpan, terbarui secara akurat saat ada event klik, dan dapat dihapus sesuai siklus logika aplikasi.

4. **Audit Permintaan Jaringan & Deteksi Aset Rusak (DevTools Network Panel):**
   * Memonitor seluruh lalu lintas permintaan HTTP/HTTPS untuk memastikan berkas gambar, font web Google Fonts, dan script termuat dengan status `200 OK`.
   * Melacak dan memperbaiki status HTTP 404 pada pemanggilan berkas favicon (`favicon.ico`) sebelum proses deployment.

5. **Pengujian Responsivitas Multi-Perangkat (Device Toolbar Emulation):**
   * Memanfaatkan fitur *Responsive Design Mode* untuk menyimulasikan berbagai resolusi layar (Mobile: 375px/412px, Tablet: 768px/820px, dan Desktop: 1080px/1440px) guna memastikan tata letak Grid/Flexbox beradaptasi sempurna tanpa terjadi kebocoran scrollbar horizontal (*horizontal overflow*).
