# Aplikasi Kuis Aritmatika Suara

Aplikasi Kuis Aritmatika Numerik adalah Single Page Application (SPA) berbasis web yang interaktif, didesain untuk melatih kemampuan berhitung cepat melalui soal-soal matematika numerik yang dibacakan dalam Bahasa Indonesia dengan teknologi Text-to-Speech (TTS).

Aplikasi ini dibuat menggunakan **Vue 3 (Composition API dengan `<script setup>`)**, **Vite**, dan **Tailwind CSS**.

---

## Fitur Utama

- **TTS Bahasa Indonesia (Web Speech API):** Membacakan soal secara verbal menggunakan suara Bahasa Indonesia (`id-ID`).
- **Generator Soal Dinamis:** Menghasilkan soal aritmatika (+, -, *, ÷) secara acak dengan jawaban bulat positif.
- **Batasan Waktu (Timer):** Waktu mundur 30 detik per pertanyaan untuk melatih kecepatan berpikir.
- **Efek Suara Sintetis (Web Audio API):** Umpan balik audio retro untuk jawaban benar, salah, dan klik tombol tanpa berkas suara tambahan.
- **Mode Gelap (Dark Mode):** Perpindahan tema terang dan gelap secara instan dengan transisi halus.
- **Papan Peringkat (Leaderboard):** Menyimpan 5 skor terbaik secara lokal menggunakan `localStorage`.
- **Statistik Hasil Kuis:** Menampilkan akurasi, waktu respons rata-rata, akurasi pengerjaan, dan lencana performa di akhir sesi.

---

## Teknologi

- **Core:** Vue 3, JavaScript (ES6+), HTML5
- **Styling:** Tailwind CSS v3 (Custom fonts: Inter & Poppins)
- **Announce/Audio:** Web Speech API (`SpeechSynthesis`) & Web Audio API (`AudioContext`)
- **Build Tool:** Vite v5

---

## Struktur Folder

```text
src/
├── assets/          # Aset statis
├── components/      # Komponen antarmuka (Start, Quiz, Result, dll.)
│   ├── StartScreen.vue
│   ├── QuizScreen.vue
│   ├── ResultScreen.vue
│   ├── QuestionCard.vue
│   ├── AnswerButtons.vue
│   └── AudioPlayer.vue
├── composables/     # Logika reaktif (useQuiz, useSpeechSynthesis, dll.)
│   ├── useQuiz.js
│   ├── useSpeechSynthesis.js
│   └── useQuestionGenerator.js
├── utils/           # Fungsi pembantu (numberToIndonesian, shuffle)
│   ├── numberToIndonesian.js
│   └── shuffle.js
├── App.vue          # Cangkang aplikasi utama
└── main.js          # Entrypoint JavaScript utama
```

---

## Instalasi & Cara Menjalankan

### Prasyarat
Pastikan Anda telah menginstal **Node.js** (rekomendasi versi 18 ke atas) di komputer Anda.

### Langkah-langkah
1. Pasang dependensi proyek:
   ```bash
   npm install
   ```

2. Jalankan server pengembangan lokal:
   ```bash
   npm run dev
   ```
   Buka peramban di alamat yang tertera (biasanya `http://localhost:5173`).

3. Lakukan build untuk produksi:
   ```bash
   npm run build
   ```

4. Jalankan preview build produksi lokal:
   ```bash
   npm run preview
   ```
