<template>
  <div class="space-y-6 max-w-xl mx-auto animate-fade-in">
    <!-- Config screen (before playing) -->
    <div v-if="!gameStarted && !gameFinished" class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-8 space-y-6">
      <div class="text-center space-y-3">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400">
          <span class="text-3xl">🧩</span>
        </div>
        <h2 class="text-2xl font-black text-slate-800 dark:text-white">Kuis Logika</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
          Uji kemampuan analisis sandi kata, pola huruf, serta kelanjutan deret angka logis.
        </p>
      </div>

      <!-- Difficulty Selector -->
      <div class="space-y-3 pt-2">
        <label class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block text-center">
          Pilih Tingkat Kesulitan
        </label>
        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="lvl in ['easy', 'medium', 'hard']"
            :key="lvl"
            @click="difficulty = lvl"
            type="button"
            :class="[
              'py-3 px-4 rounded-2xl border text-center font-bold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 capitalize',
              difficulty === lvl
                ? lvl === 'easy'
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-700 dark:text-emerald-400 ring-2 ring-emerald-500/20'
                  : lvl === 'medium'
                  ? 'bg-teal-50/50 dark:bg-teal-950/20 border-teal-550 text-teal-700 dark:text-teal-400 ring-2 ring-teal-500/20'
                  : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-500 text-rose-700 dark:text-rose-450 ring-2 ring-rose-500/20'
                : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-400 hover:border-slate-350'
            ]"
          >
            {{ lvl === 'easy' ? '🟢 Mudah' : lvl === 'medium' ? '🟡 Sedang' : '🔴 Sulit' }}
          </button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-3 pt-2">
        <button
          @click="emit('home')"
          class="flex-1 py-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-655 text-slate-700 dark:text-white font-bold rounded-2xl transition-all duration-300"
        >
          Kembali
        </button>
        <button
          @click="startGame"
          class="flex-[2] py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-lg shadow-teal-500/20 transition-all duration-300"
        >
          Mulai Kuis
        </button>
      </div>
    </div>

    <!-- Active quiz play -->
    <div v-else-if="gameStarted && !gameFinished" class="space-y-6">
      
      <!-- Stats Header -->
      <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-lg p-5 md:p-6 space-y-4">
        <div class="flex items-center justify-between text-sm md:text-base">
          <div class="flex items-center space-x-2">
            <span class="text-lg">🎯</span>
            <span class="font-semibold text-slate-500 dark:text-slate-400">Skor:</span>
            <span class="font-bold text-slate-800 dark:text-white">{{ score }}</span>
          </div>
          <div class="text-right">
            <span class="font-semibold text-slate-500 dark:text-slate-400">Soal </span>
            <span class="font-bold text-slate-800 dark:text-white">{{ currentIdx + 1 }}</span>
            <span class="font-semibold text-slate-500 dark:text-slate-400"> dari 5</span>
          </div>
        </div>
        <div class="relative w-full h-2.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-300"
            :style="{ width: `${(currentIdx / 5) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Logic Question Card -->
      <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-8 space-y-4 text-center relative overflow-hidden min-h-[160px] flex flex-col justify-center">
        <span class="text-xs font-bold tracking-widest text-teal-600 dark:text-teal-400 uppercase">PERTANYAAN LOGIKA</span>
        <p class="text-lg md:text-xl font-semibold text-slate-800 dark:text-white leading-relaxed">
          {{ activeQuestion.text }}
        </p>
      </div>

      <!-- Answer Buttons -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          v-for="(option, idx) in activeQuestion.options"
          :key="idx"
          @click="selectAnswer(option)"
          :disabled="selectedAnswer !== null"
          :class="[
            'relative p-5 text-lg font-bold rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-4 text-left pl-12',
            getButtonClass(option)
          ]"
        >
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded">
            {{ String.fromCharCode(65 + idx) }}
          </span>
          {{ option.value }}
        </button>
      </div>

      <!-- Next question button -->
      <div class="h-16 flex items-center justify-center">
        <button
          v-if="selectedAnswer !== null"
          @click="nextQuestion"
          class="w-full py-4 bg-slate-800 dark:bg-slate-700 text-white font-bold rounded-2xl shadow-md hover:bg-slate-900 dark:hover:bg-slate-655 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <span>{{ currentIdx < 4 ? 'Pertanyaan Selanjutnya' : 'Lihat Hasil' }}</span>
          <span>→</span>
        </button>
      </div>

    </div>

    <!-- Final Result screen -->
    <div v-else class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-8 text-center space-y-6">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal-500/10 text-teal-500 text-4xl shadow-inner">
        🏆
      </div>
      
      <div class="space-y-2">
        <h2 class="text-3xl font-black text-slate-800 dark:text-white">Latihan Selesai!</h2>
        <p class="text-lg font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
          Kuis Logika
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        <div class="bg-slate-50 dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Skor Akhir</p>
          <p class="text-3xl font-black text-teal-650 dark:text-teal-400 mt-1 font-mono">
            {{ score }} <span class="text-lg font-normal text-slate-400">/ 5</span>
          </p>
        </div>
        <div class="bg-slate-50 dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Akurasi</p>
          <p class="text-3xl font-black text-blue-600 dark:text-blue-400 mt-1 font-mono">
            {{ Math.round((score / 5) * 100) }}%
          </p>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center pt-4">
        <button
          @click="startGame"
          class="flex-1 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-lg transition-all duration-300"
        >
          Ulangi Latihan
        </button>
        <button
          @click="emit('home')"
          class="flex-1 px-8 py-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-655 text-slate-700 dark:text-white font-bold rounded-2xl border border-slate-200 dark:border-slate-700 transition-all duration-300"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useLogicGenerator } from '../composables/useLogicGenerator.js';
import { playBeep } from '../composables/useQuiz.js';

const emit = defineEmits(['home']);
const { generateLogicQuiz } = useLogicGenerator();

const difficulty = ref('medium');
const gameStarted = ref(false);
const gameFinished = ref(false);
const questions = ref([]);
const currentIdx = ref(0);
const activeQuestion = ref(null);
const selectedAnswer = ref(null);
const score = ref(0);

const startGame = () => {
  playBeep('click');
  questions.value = generateLogicQuiz(difficulty.value);
  currentIdx.value = 0;
  score.value = 0;
  gameFinished.value = false;
  gameStarted.value = true;
  loadQuestion();
};

const loadQuestion = () => {
  selectedAnswer.value = null;
  activeQuestion.value = questions.value[currentIdx.value];
};

const selectAnswer = (option) => {
  if (selectedAnswer.value !== null) return;
  selectedAnswer.value = option;
  
  if (option.correct) {
    score.value++;
    playBeep('correct');
  } else {
    playBeep('wrong');
  }
};

const nextQuestion = () => {
  playBeep('click');
  if (currentIdx.value < 4) {
    currentIdx.value++;
    loadQuestion();
  } else {
    gameFinished.value = true;
  }
};

const getButtonClass = (option) => {
  const isAnswered = selectedAnswer.value !== null;
  const isSelected = selectedAnswer.value?.value === option.value;
  
  if (!isAnswered) {
    return 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white hover:border-teal-500 hover:bg-teal-50/20 dark:hover:bg-slate-750 hover:scale-[1.01]';
  }
  if (option.correct) {
    return 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-400 border-2 font-bold';
  }
  if (isSelected && !option.correct) {
    return 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-700 dark:text-rose-455 border-2 font-bold';
  }
  return 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-60';
};
</script>
