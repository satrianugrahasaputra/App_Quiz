<template>
  <div class="space-y-8 animate-fade-in max-w-2xl mx-auto">
    <!-- Results Card -->
    <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-8 text-center space-y-6 relative overflow-hidden">
      <!-- Confetti or background glow -->
      <div class="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>

      <!-- Badge Icon -->
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 text-4xl shadow-inner">
        {{ badge.icon }}
      </div>

      <div class="space-y-2">
        <h2 class="text-3xl font-black text-slate-800 dark:text-white">Hasil Kuis Selesai!</h2>
        <p :class="['text-xl font-bold uppercase tracking-wider', badge.color]">
          {{ badge.label }}
        </p>
      </div>

      <!-- Score Ring/Grid -->
      <div class="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        <!-- Score Card -->
        <div class="bg-slate-50 dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Skor Akhir</p>
          <p class="text-3xl font-black text-blue-600 dark:text-blue-400 mt-1 font-mono">
            {{ score }} <span class="text-lg font-normal text-slate-400">/ 10</span>
          </p>
        </div>
        
        <!-- Accuracy Card -->
        <div class="bg-slate-50 dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Akurasi</p>
          <p class="text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-1 font-mono">
            {{ accuracy }}%
          </p>
        </div>
      </div>

      <!-- Stats Metrics -->
      <div class="border-t border-slate-100 dark:border-slate-700/50 pt-6 grid grid-cols-2 gap-4 text-left">
        <div>
          <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Kecepatan Rata-Rata</p>
          <p class="text-lg font-black text-slate-800 dark:text-white mt-0.5 font-mono">
            ⏱️ {{ avgSpeed }} <span class="text-sm font-normal text-slate-500">detik/soal</span>
          </p>
        </div>
        <div>
          <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Ketepatan Jawaban</p>
          <p class="text-lg font-black text-slate-800 dark:text-white mt-0.5">
            🎯 {{ score }} Benar, {{ 10 - score }} Salah
          </p>
        </div>
      </div>
    </div>

    <!-- Leaderboard Submission Card -->
    <div v-if="!submitted" class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-6 md:p-8 space-y-4">
      <h3 class="text-lg font-bold text-slate-800 dark:text-white flex items-center space-x-2">
        <span>✏️</span>
        <span>Simpan Skor Anda</span>
      </h3>
      <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        Masukkan nama Anda di bawah ini untuk menyimpan skor ke papan peringkat lokal di perangkat ini.
      </p>
      
      <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        <input
          v-model="playerName"
          type="text"
          placeholder="Nama Anda (contoh: Budi)"
          maxlength="15"
          class="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
        />
        <button
          @click="submitScore"
          :disabled="!playerName.trim()"
          class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
        >
          Simpan Skor
        </button>
      </div>
    </div>

    <!-- Leaderboard Display -->
    <div v-if="leaderboard && leaderboard.length > 0" class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-6 md:p-8 space-y-4">
      <h3 class="text-lg font-bold text-slate-800 dark:text-white flex items-center space-x-2">
        <span>🏆</span>
        <span>Papan Peringkat Terbaru</span>
      </h3>
      
      <div class="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-750">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">
              <th class="p-4">Rank</th>
              <th class="p-4">Nama</th>
              <th class="p-4 text-center">Akurasi</th>
              <th class="p-4 text-center">Kec. Rata-Rata</th>
              <th class="p-4 text-right">Skor</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-750 text-sm">
            <tr
              v-for="(entry, index) in leaderboard"
              :key="entry.id"
              :class="[
                'text-slate-700 dark:text-slate-350 hover:bg-slate-50/50 dark:hover:bg-slate-900/20',
                entry.isCurrent ? 'bg-blue-50/20 dark:bg-blue-950/10 font-semibold' : ''
              ]"
            >
              <td class="p-4 font-bold flex items-center space-x-2">
                <span v-if="index === 0">🥇</span>
                <span v-else-if="index === 1">🥈</span>
                <span v-else-if="index === 2">🥉</span>
                <span v-else>{{ index + 1 }}</span>
              </td>
              <td class="p-4">{{ entry.name }}</td>
              <td class="p-4 text-center">{{ entry.accuracy }}%</td>
              <td class="p-4 text-center font-mono">{{ entry.avgSpeed }}s</td>
              <td class="p-4 text-right font-bold text-blue-600 dark:text-blue-400">
                {{ entry.score }} / {{ entry.total }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
      <button
        @click="emit('restart')"
        class="flex-1 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center space-x-2"
      >
        <span>🔄</span>
        <span>Ulangi Kuis</span>
      </button>
      <button
        @click="emit('home')"
        class="flex-1 px-8 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold rounded-2xl border border-slate-200 dark:border-slate-700 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center space-x-2"
      >
        <span>🏠</span>
        <span>Kembali ke Beranda</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  score: {
    type: Number,
    required: true
  },
  accuracy: {
    type: Number,
    required: true
  },
  avgSpeed: {
    type: Number,
    required: true
  },
  badge: {
    type: Object,
    required: true
  },
  leaderboard: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['restart', 'home', 'save-score']);

const playerName = ref('');
const submitted = ref(false);

const submitScore = () => {
  if (playerName.value.trim()) {
    emit('save-score', playerName.value.trim());
    submitted.value = true;
  }
};
</script>
