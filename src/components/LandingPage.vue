<template>
  <div class="space-y-12 animate-fade-in max-w-5xl mx-auto py-4 md:py-8">
    
    <!-- Hero Banner -->
    <div class="text-center space-y-5 max-w-2xl mx-auto">
      <div class="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
        <span>🧠</span>
        <span>Asah Kognitif & Psikotes Interaktif</span>
      </div>
      
      <h1 class="text-4xl md:text-5xl font-black tracking-tight leading-none text-slate-800 dark:text-white">
        BrainForge <br class="hidden md:inline" />
        <span class="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
          Uji Kognitif & Psikotes
        </span>
      </h1>
      
      <p class="text-slate-600 dark:text-slate-350 text-base md:text-lg leading-relaxed">
        Kembangkan potensi berpikir Anda dengan latihan terukur lintas bidang kecerdasan: matematika, analisis logis, daya ingat, dan visualisasi spasial.
      </p>
    </div>

    <!-- 4 Cognitive Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
      
      <!-- Card 1: Numerik -->
      <div class="group relative overflow-hidden bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-lg p-7 flex flex-col justify-between hover:border-blue-500/50 hover:shadow-blue-500/5 hover:scale-[1.01] transition-all duration-300">
        <div class="space-y-5">
          <div class="w-12 h-12 bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 rounded-2xl flex items-center justify-center text-2xl font-bold">
            12
          </div>
          <div class="space-y-1.5">
            <h3 class="text-xl font-extrabold text-slate-850 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Kemampuan Numerik
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Latih kalkulasi aritmatika cepat dan fokus dengar angka dengan kuis matematika standar atau mode stereo rantai cepat.
            </p>
          </div>
        </div>
        <div class="pt-6 flex flex-col sm:flex-row gap-3">
          <button
            @click="emit('select-mode', 'standard')"
            class="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md transition-all duration-300"
          >
            Kuis Standar
          </button>
          <button
            @click="emit('select-mode', 'stereo')"
            class="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-md transition-all duration-300"
          >
            Aritmatika Stereo
          </button>
        </div>
      </div>

      <!-- Card 2: Logika -->
      <div class="group relative overflow-hidden bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-lg p-7 flex flex-col justify-between hover:border-teal-500/50 hover:shadow-teal-500/5 hover:scale-[1.01] transition-all duration-300">
        <div class="space-y-5">
          <div class="w-12 h-12 bg-teal-500/10 text-teal-650 dark:bg-teal-500/20 dark:text-teal-400 rounded-2xl flex items-center justify-center text-2xl font-bold">
            🧩
          </div>
          <div class="space-y-1.5">
            <h3 class="text-xl font-extrabold text-slate-850 dark:text-white group-hover:text-teal-655 dark:group-hover:text-teal-400 transition-colors">
              Kemampuan Logika
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Pecahkan sandi kata terenkripsi (cipher) dan temukan kelanjutan deret angka berdasarkan pola relasi yang tersembunyi.
            </p>
          </div>
        </div>
        <div class="pt-6">
          <button
            @click="emit('select-mode', 'logic')"
            class="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-xl shadow-md transition-all duration-300"
          >
            Mulai Kuis Logika
          </button>
        </div>
      </div>

      <!-- Card 3: Memori -->
      <div class="group relative overflow-hidden bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-lg p-7 flex flex-col justify-between hover:border-rose-500/50 hover:shadow-rose-500/5 hover:scale-[1.01] transition-all duration-300">
        <div class="space-y-5">
          <div class="w-12 h-12 bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-455 rounded-2xl flex items-center justify-center text-2xl font-bold">
            🎴
          </div>
          <div class="space-y-1.5">
            <h3 class="text-xl font-extrabold text-slate-850 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              Kemampuan Memori
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Hafalkan letak dan rincian kartu remi acak dalam waktu singkat, kemudian uji seberapa tajam daya ingat jangka pendek Anda.
            </p>
          </div>
        </div>
        <div class="pt-6">
          <button
            @click="emit('select-mode', 'memory')"
            class="w-full py-3 bg-rose-600 hover:bg-rose-750 text-white text-sm font-bold rounded-xl shadow-md transition-all duration-300"
          >
            Mulai Kuis Memori
          </button>
        </div>
      </div>

      <!-- Card 4: Spasial -->
      <div class="group relative overflow-hidden bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-lg p-7 flex flex-col justify-between hover:border-violet-500/50 hover:shadow-violet-500/5 hover:scale-[1.01] transition-all duration-300">
        <div class="space-y-5">
          <div class="w-12 h-12 bg-violet-500/10 text-violet-650 dark:bg-violet-500/20 dark:text-violet-400 rounded-2xl flex items-center justify-center text-2xl font-bold">
            📐
          </div>
          <div class="space-y-1.5">
            <h3 class="text-xl font-extrabold text-slate-850 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              Kemampuan Spasial
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Uji rotasi geometri tiga dimensi, hitung tumpukan susunan balok kubus, dan visualisasikan jaring-jaring prisma/kubus.
            </p>
          </div>
        </div>
        <div class="pt-6">
          <button
            @click="emit('select-mode', 'spatial')"
            class="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold rounded-xl shadow-md transition-all duration-300"
          >
            Mulai Kuis Spasial
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['select-mode']);
</script>
