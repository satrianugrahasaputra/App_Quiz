<template>
  <div class="space-y-8 animate-fade-in max-w-2xl mx-auto">
    <!-- Header Illustration and Title -->
    <div class="text-center space-y-4">
      <div class="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 mb-2 relative group hover:scale-105 transition-transform duration-300">
        <!-- SVG Math/Voice Logo -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
        </svg>
        <span class="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900"></span>
      </div>
      <h1 class="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
        Kuis Aritmatika Suara
      </h1>
      <p class="text-slate-600 dark:text-slate-300 text-lg max-w-md mx-auto leading-relaxed">
        Latih kemampuan berhitung dan dengarkan soal menggunakan suara Bahasa Indonesia.
      </p>
    </div>

    <!-- Quick Settings Card -->
    <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-6 md:p-8 space-y-6">
      <h3 class="text-lg font-bold text-slate-800 dark:text-white flex items-center space-x-2">
        <span>⚙️</span>
        <span>Pengaturan Kuis</span>
      </h3>

      <!-- Quiz Mode Selector -->
      <div class="space-y-3">
        <label class="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
          Tipe Kuis
        </label>
        <div class="grid grid-cols-2 gap-4">
          <button
            @click="modelValue.quizMode.value = 'visual'"
            type="button"
            :class="[
              'flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500',
              modelValue.quizMode.value === 'visual'
                ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-500 text-blue-700 dark:text-blue-450 font-bold ring-2 ring-blue-500/20'
                : 'bg-slate-50 dark:bg-slate-900/50 border-slate-250 dark:border-slate-800 text-slate-650 dark:text-slate-400 hover:border-slate-350'
            ]"
          >
            <span class="text-2xl mb-1">👁️</span>
            <span class="text-sm">Teks & Suara</span>
            <span class="text-[10px] text-slate-400 dark:text-slate-500 font-normal">Soal terlihat di layar</span>
          </button>
          <button
            @click="modelValue.quizMode.value = 'listening'"
            type="button"
            :class="[
              'flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500',
              modelValue.quizMode.value === 'listening'
                ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-500 text-blue-700 dark:text-blue-450 font-bold ring-2 ring-blue-500/20'
                : 'bg-slate-50 dark:bg-slate-900/50 border-slate-250 dark:border-slate-800 text-slate-650 dark:text-slate-400 hover:border-slate-350'
            ]"
          >
            <span class="text-2xl mb-1">🎧</span>
            <span class="text-sm">Hanya Listening</span>
            <span class="text-[10px] text-slate-400 dark:text-slate-500 font-normal">Fokus dengarkan audio soal</span>
          </button>
        </div>
      </div>

      <!-- Difficulty Level Selector -->
      <div class="space-y-3">
        <label class="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
          Tingkat Kesulitan
        </label>
        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="lvl in ['easy', 'medium', 'hard']"
            :key="lvl"
            @click="modelValue.difficultyLevel.value = lvl"
            type="button"
            :class="[
              'py-3 px-4 rounded-2xl border text-center font-bold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize',
              modelValue.difficultyLevel.value === lvl
                ? lvl === 'easy'
                  ? 'bg-emerald-50/55 dark:bg-emerald-950/20 border-emerald-500 text-emerald-700 dark:text-emerald-400 ring-2 ring-emerald-500/20'
                  : lvl === 'medium'
                  ? 'bg-blue-50/55 dark:bg-blue-950/20 border-blue-500 text-blue-700 dark:text-blue-400 ring-2 ring-blue-500/20'
                  : 'bg-rose-50/55 dark:bg-rose-950/20 border-rose-500 text-rose-700 dark:text-rose-450 ring-2 ring-rose-500/20'
                : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-400 hover:border-slate-350'
            ]"
          >
            {{ lvl === 'easy' ? '🟢 Mudah' : lvl === 'medium' ? '🟡 Sedang' : '🔴 Sulit' }}
          </button>
        </div>
      </div>
      
      <!-- Operations Selector -->
      <div class="space-y-3">
        <label class="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
          Pilih Operasi Matematika
        </label>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <label
            v-for="op in operationsList"
            :key="op.value"
            :class="[
              'flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer select-none font-semibold transition-all duration-200',
              modelValue.selectedOperations.value.includes(op.value)
                ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-500 text-blue-700 dark:text-blue-400'
                : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
            ]"
          >
            <span class="flex items-center space-x-2">
              <span class="text-lg">{{ op.icon }}</span>
              <span class="text-sm">{{ op.label }}</span>
            </span>
            <input
              type="checkbox"
              :value="op.value"
              v-model="modelValue.selectedOperations.value"
              class="hidden"
            />
            <span
              :class="[
                'w-4 h-4 rounded-full border flex items-center justify-center',
                modelValue.selectedOperations.value.includes(op.value)
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-slate-300 dark:border-slate-700'
              ]"
            >
              <svg v-if="modelValue.selectedOperations.value.includes(op.value)" class="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
            </span>
          </label>
        </div>
      </div>

      <!-- Toggles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <!-- Timer Toggle -->
        <div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div class="flex items-center space-x-3">
            <span class="text-xl">⏱️</span>
            <div>
              <p class="text-sm font-bold text-slate-850 dark:text-white">Batasan Waktu</p>
              <p class="text-xs text-slate-500">30 detik per pertanyaan</p>
            </div>
          </div>
          <button
            @click="modelValue.timerEnabled.value = !modelValue.timerEnabled.value"
            :class="[
              'w-12 h-6 flex items-center rounded-full p-1 duration-300 focus:outline-none',
              modelValue.timerEnabled.value ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
            ]"
          >
            <div
              :class="[
                'bg-white w-4 h-4 rounded-full shadow-md transform duration-300',
                modelValue.timerEnabled.value ? 'translate-x-6' : ''
              ]"
            ></div>
          </button>
        </div>

        <!-- Speech Auto-play Toggle -->
        <div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div class="flex items-center space-x-3">
            <span class="text-xl">🗣️</span>
            <div>
              <p class="text-sm font-bold text-slate-850 dark:text-white">Bicara Otomatis</p>
              <p class="text-xs text-slate-500">Bacakan soal secara otomatis</p>
            </div>
          </div>
          <button
            @click="modelValue.speechEnabled.value = !modelValue.speechEnabled.value"
            :class="[
              'w-12 h-6 flex items-center rounded-full p-1 duration-300 focus:outline-none',
              modelValue.speechEnabled.value ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
            ]"
          >
            <div
              :class="[
                'bg-white w-4 h-4 rounded-full shadow-md transform duration-300',
                modelValue.speechEnabled.value ? 'translate-x-6' : ''
              ]"
            ></div>
          </button>
        </div>

        <!-- Voice Selector Dropdown (Visible if speech is enabled) -->
        <div v-if="modelValue.speechEnabled.value && voices.length > 0" class="flex flex-col space-y-2 p-4 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-800 text-left">
          <label class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Pilih Karakter Suara (TTS)
          </label>
          <div class="relative">
            <select
              :value="selectedVoiceName"
              @change="changeVoice($event.target.value)"
              class="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-250 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="" disabled>Pilih suara...</option>
              
              <!-- Indonesian Voices Group -->
              <optgroup label="Bahasa Indonesia (Sangat Direkomendasikan)">
                <option
                  v-for="voice in indonesianVoices"
                  :key="voice.name"
                  :value="voice.name"
                >
                  {{ voice.name }} {{ voice.name.includes('Natural') ? '🌟 (Suara Alami)' : '💻' }}
                </option>
              </optgroup>
              
              <!-- Other System Voices -->
              <optgroup label="Suara Sistem Lainnya (Mungkin Beraksen Asing)">
                <option
                  v-for="voice in otherVoices"
                  :key="voice.name"
                  :value="voice.name"
                >
                  {{ voice.name }} ({{ voice.lang }})
                </option>
              </optgroup>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
              ▼
            </div>
          </div>
          <p class="text-[10px] text-slate-400 dark:text-slate-500">
            *Suara berlabel <strong>Natural</strong> (jika ada pada peramban Microsoft Edge) memiliki intonasi bicara seperti manusia sungguhan.
          </p>
        </div>
      </div>
    </div>

    <!-- Start Button -->
    <div class="text-center">
      <button
        @click="handleStart"
        :disabled="modelValue.selectedOperations.value.length === 0"
        class="w-full max-w-sm px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-indigo-500/30 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
      >
        Mulai Kuis
      </button>
    </div>

    <!-- Leaderboard Card -->
    <div v-if="leaderboard && leaderboard.length > 0" class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-6 md:p-8 space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold text-slate-800 dark:text-white flex items-center space-x-2">
          <span>🏆</span>
          <span>Papan Peringkat (Top 5)</span>
        </h3>
        <button
          @click="emit('clear-leaderboard')"
          class="text-xs text-rose-500 hover:text-rose-600 font-bold focus:outline-none"
        >
          Hapus Semua
        </button>
      </div>
      
      <div class="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-750">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">
              <th class="p-4">Rank</th>
              <th class="p-4">Tanggal</th>
              <th class="p-4 text-center">Akurasi</th>
              <th class="p-4 text-center">Kec. Rata-Rata</th>
              <th class="p-4 text-right">Skor</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-750 text-sm">
            <tr
              v-for="(entry, index) in leaderboard"
              :key="entry.id"
              class="text-slate-700 dark:text-slate-350 hover:bg-slate-50/50 dark:hover:bg-slate-900/20"
            >
              <td class="p-4 font-bold flex items-center space-x-2">
                <span v-if="index === 0">🥇</span>
                <span v-else-if="index === 1">🥈</span>
                <span v-else-if="index === 2">🥉</span>
                <span v-else>{{ index + 1 }}</span>
              </td>
              <td class="p-4 font-medium">{{ entry.date }}</td>
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
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useSpeechSynthesis } from '../composables/useSpeechSynthesis.js';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  leaderboard: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['start', 'clear-leaderboard']);

const { voices, selectedVoiceName, changeVoice } = useSpeechSynthesis();

// Filter for Indonesian voices
const indonesianVoices = computed(() => {
  return voices.value.filter(voice => 
    voice.lang === 'id-ID' || 
    voice.lang === 'id_ID' || 
    voice.lang.toLowerCase().includes('id')
  );
});

// Filter for other system voices
const otherVoices = computed(() => {
  return voices.value.filter(voice => 
    !(voice.lang === 'id-ID' || 
      voice.lang === 'id_ID' || 
      voice.lang.toLowerCase().includes('id'))
  );
});

const operationsList = [
  { label: 'Tambah', value: 'addition', icon: '➕' },
  { label: 'Kurang', value: 'subtraction', icon: '➖' },
  { label: 'Kali', value: 'multiplication', icon: '✖️' },
  { label: 'Bagi', value: 'division', icon: '➗' },
  { label: 'Pangkat', value: 'power', icon: '⚡' },
  { label: 'Akar', value: 'sqrt', icon: '√' }
];

const handleStart = () => {
  emit('start');
};
</script>
