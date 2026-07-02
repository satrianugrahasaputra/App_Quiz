<template>
  <div class="space-y-12 animate-fade-in max-w-4xl mx-auto py-4 md:py-8">
    
    <!-- Hero Banner -->
    <div class="text-center space-y-6 max-w-2xl mx-auto">
      <div class="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
        <span>🚀</span>
        <span>Aplikasi Pembelajaran Matematika Interaktif</span>
      </div>
      
      <h1 class="text-4xl md:text-6xl font-black tracking-tight leading-none text-slate-800 dark:text-white">
        Asah Otak dengan <br class="hidden md:inline" />
        <span class="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
          Suara & Aritmatika
        </span>
      </h1>
      
      <p class="text-slate-655 dark:text-slate-300 text-lg md:text-xl leading-relaxed">
        Pilih salah satu metode belajar yang menyenangkan di bawah ini untuk menguji kecepatan berpikir, ketepatan berhitung, dan daya dengar Anda.
      </p>
    </div>

    <!-- Mode Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
      
      <!-- Card 1: Standard Arithmetic Quiz -->
      <div class="group relative overflow-hidden bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-8 flex flex-col justify-between hover:border-blue-500/50 hover:shadow-blue-500/10 hover:scale-[1.01] transition-all duration-300">
        <div class="absolute -top-12 -left-12 w-24 h-24 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-colors"></div>
        
        <div class="space-y-6">
          <div class="w-14 h-14 bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 rounded-2xl flex items-center justify-center text-3xl">
            🎯
          </div>
          
          <div class="space-y-2">
            <h3 class="text-2xl font-bold text-slate-850 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Kuis Aritmatika Standar
            </h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Jawab 10 soal acak satu per satu. Tersedia opsi audio untuk membacakan pertanyaan secara mandiri, lengkap dengan 3 tingkat kesulitan.
            </p>
          </div>

          <!-- Feature Points -->
          <ul class="space-y-2.5 text-sm text-slate-600 dark:text-slate-350">
            <li class="flex items-center space-x-2.5">
              <span class="text-emerald-500">✓</span>
              <span>Mode Visual (Teks) & Mode Listening (Audio)</span>
            </li>
            <li class="flex items-center space-x-2.5">
              <span class="text-emerald-500">✓</span>
              <span>Tingkat kesulitan Mudah, Sedang, dan Sulit</span>
            </li>
            <li class="flex items-center space-x-2.5">
              <span class="text-emerald-500">✓</span>
              <span>Batasan waktu 30 detik per soal</span>
            </li>
          </ul>
        </div>

        <div class="pt-8">
          <button
            @click="emit('select-mode', 'standard')"
            class="w-full py-4 bg-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-md transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg"
          >
            <span>Masuk Kuis Standar</span>
            <span>→</span>
          </button>
        </div>
      </div>

      <!-- Card 2: Stereo Arithmetic (Mental Math Chain) -->
      <div class="group relative overflow-hidden bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-8 flex flex-col justify-between hover:border-indigo-500/50 hover:shadow-indigo-500/10 hover:scale-[1.01] transition-all duration-300">
        <div class="absolute -top-12 -left-12 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/10 transition-colors"></div>
        
        <div class="space-y-6">
          <div class="w-14 h-14 bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 rounded-2xl flex items-center justify-center text-3xl">
            🎧
          </div>
          
          <div class="space-y-2">
            <h3 class="text-2xl font-bold text-slate-850 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Aritmatika Stereo (Mental)
            </h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Latih pendengaran dan ingatan jangka pendek. Dengarkan rantai perhitungan panjang yang dibacakan berurutan dengan jeda cepat 2 detik.
            </p>
          </div>

          <!-- Feature Points -->
          <ul class="space-y-2.5 text-sm text-slate-600 dark:text-slate-350">
            <li class="flex items-center space-x-2.5">
              <span class="text-emerald-500">✓</span>
              <span>Dihitung berurutan dari kiri ke kanan (tanpa hierarki)</span>
            </li>
            <li class="flex items-center space-x-2.5">
              <span class="text-emerald-500">✓</span>
              <span>Jeda cepat 2 detik per langkah operasi</span>
            </li>
            <li class="flex items-center space-x-2.5">
              <span class="text-emerald-500">✓</span>
              <span>Menantang ingatan visual & kalkulasi internal kepala</span>
            </li>
          </ul>
        </div>

        <div class="pt-8">
          <button
            @click="emit('select-mode', 'stereo')"
            class="w-full py-4 bg-indigo-650 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold rounded-2xl shadow-md transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg"
          >
            <span>Masuk Aritmatika Stereo</span>
            <span>→</span>
          </button>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['select-mode']);
</script>
