<template>
  <div class="space-y-6 max-w-xl mx-auto animate-fade-in">
    <!-- Config screen (before playing) -->
    <div v-if="!gameStarted && !gameFinished" class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-8 space-y-6">
      <div class="text-center space-y-3">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-455">
          <span class="text-3xl">🎴</span>
        </div>
        <h2 class="text-2xl font-black text-slate-800 dark:text-white">Kuis Memori Kartu</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
          Ingat posisi kartu remi yang ditampilkan selama 6 detik, kemudian temukan kartu target setelah semuanya dibalik!
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
              'py-3 px-4 rounded-2xl border text-center font-bold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 capitalize',
              difficulty === lvl
                ? lvl === 'easy'
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-700 dark:text-emerald-450 ring-2 ring-emerald-500/20'
                  : lvl === 'medium'
                  ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-500 text-rose-705 dark:text-rose-450 ring-2 ring-rose-500/20'
                  : 'bg-slate-900 text-white border-slate-900 dark:bg-slate-700 dark:border-slate-600 ring-2 ring-slate-500/20'
                : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-400 hover:border-slate-350'
            ]"
          >
            {{ lvl === 'easy' ? '🟢 4 Kartu' : lvl === 'medium' ? '🟡 6 Kartu' : '🔴 8 Kartu' }}
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
          class="flex-[2] py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-lg shadow-rose-500/20 transition-all duration-300"
        >
          Mulai Latihan
        </button>
      </div>
    </div>

    <!-- Active game screen -->
    <div v-else-if="gameStarted && !gameFinished" class="space-y-6">
      
      <!-- Score Header -->
      <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-lg p-5 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <span class="text-xl">🎯</span>
          <span class="font-bold text-slate-800 dark:text-white">Skor: {{ score }}</span>
        </div>
        <div class="font-bold text-slate-500 dark:text-slate-400">
          Soal {{ currentIdx + 1 }} dari 5
        </div>
      </div>

      <!-- Instruction Panel -->
      <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-6 text-center space-y-4">
        <!-- Phase 1: Memorizing -->
        <div v-if="isMemorizingPhase" class="space-y-2">
          <span class="text-xs font-bold tracking-widest text-rose-500 uppercase">FASE MENGHAFAL</span>
          <h3 class="text-xl font-black text-slate-800 dark:text-white">
            Hafalkan posisi kartu dalam <span class="font-mono text-rose-500 animate-pulse text-2xl">{{ memorizationTimer }}</span> detik!
          </h3>
        </div>
        <!-- Phase 2: Guessing -->
        <div v-else-if="selectedCardIdx === null" class="space-y-2">
          <span class="text-xs font-bold tracking-widest text-amber-500 uppercase">FASE TEBAKAN</span>
          <h3 class="text-xl font-black text-slate-800 dark:text-white flex items-center justify-center space-x-2">
            <span>Di manakah letak kartu: </span>
            <span class="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-750 text-2xl font-mono" :class="targetCard.color">
              {{ targetCard.name }}
            </span>
          </h3>
        </div>
        <!-- Phase 3: Feedback -->
        <div v-else class="space-y-1">
          <span class="text-xs font-bold tracking-widest uppercase" :class="isCorrect ? 'text-emerald-500' : 'text-rose-500'">
            {{ isCorrect ? 'BENAR!' : 'SALAH!' }}
          </span>
          <h3 class="text-lg font-bold text-slate-800 dark:text-white">
            Kartu <span :class="targetCard.color">{{ targetCard.name }}</span> berada di posisi berbingkai hijau.
          </h3>
        </div>
      </div>

      <!-- Card Grid -->
      <div 
        :class="[
          'grid gap-4 justify-center mx-auto my-6',
          difficulty === 'easy' ? 'grid-cols-2 max-w-xs' : difficulty === 'medium' ? 'grid-cols-3 max-w-sm' : 'grid-cols-4 max-w-lg'
        ]"
      >
        <div
          v-for="(card, idx) in cards"
          :key="card.id"
          @click="clickCard(idx)"
          :class="[
            'w-24 h-36 rounded-2xl border-2 flex flex-col justify-between p-4 cursor-pointer select-none relative shadow-md transition-all duration-350',
            getCardClass(idx)
          ]"
        >
          <!-- Card Front Face -->
          <template v-if="isMemorizingPhase || selectedCardIdx !== null">
            <div class="text-lg font-bold font-mono text-left leading-none" :class="card.color">
              {{ card.value }}
            </div>
            <div class="text-4xl text-center font-mono my-auto" :class="card.color">
              {{ card.suit }}
            </div>
            <div class="text-lg font-bold font-mono text-right rotate-180 leading-none" :class="card.color">
              {{ card.value }}
            </div>
            
            <!-- Checkmark / Cross overlay in feedback phase -->
            <span v-if="selectedCardIdx !== null && card.id === targetCard.id" class="absolute inset-0 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-4xl text-emerald-600">
              ✓
            </span>
            <span v-else-if="selectedCardIdx === idx && card.id !== targetCard.id" class="absolute inset-0 bg-rose-500/10 rounded-2xl flex items-center justify-center text-4xl text-rose-600">
              ✗
            </span>
          </template>

          <!-- Card Back Face -->
          <template v-else>
            <div class="absolute inset-0 bg-gradient-to-br from-rose-500 to-indigo-650 rounded-2xl flex items-center justify-center shadow-inner border border-white/10">
              <!-- Grid ornament representing card backing -->
              <div class="w-[85%] h-[85%] border border-white/20 rounded-xl flex items-center justify-center opacity-30">
                🎴
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Next question navigator -->
      <div class="h-16 flex items-center justify-center">
        <button
          v-if="selectedCardIdx !== null"
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
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-500/10 text-rose-500 text-4xl shadow-inner">
        🏆
      </div>
      
      <div class="space-y-2">
        <h2 class="text-3xl font-black text-slate-800 dark:text-white">Latihan Selesai!</h2>
        <p class="text-lg font-bold text-rose-600 dark:text-rose-500 uppercase tracking-widest">
          Kuis Memori
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        <div class="bg-slate-50 dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Skor Akhir</p>
          <p class="text-3xl font-black text-rose-600 dark:text-rose-455 mt-1 font-mono">
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
          class="flex-1 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-lg transition-all duration-300"
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
import { ref, onUnmounted } from 'vue';
import { useMemoryGenerator } from '../composables/useMemoryGenerator.js';
import { playBeep } from '../composables/useQuiz.js';

const emit = defineEmits(['home']);
const { generateMemoryCards } = useMemoryGenerator();

const difficulty = ref('medium');
const gameStarted = ref(false);
const gameFinished = ref(false);
const cards = ref([]);
const targetCard = ref(null);
const currentIdx = ref(0);
const score = ref(0);

const isMemorizingPhase = ref(true);
const memorizationTimer = ref(6);
const selectedCardIdx = ref(null);
const isCorrect = ref(false);

let timerInterval = null;
let delayTimeout = null;

const startGame = () => {
  playBeep('click');
  currentIdx.value = 0;
  score.value = 0;
  gameFinished.value = false;
  gameStarted.value = true;
  loadQuestion();
};

const loadQuestion = () => {
  selectedCardIdx.value = null;
  isCorrect.value = false;
  isMemorizingPhase.value = true;
  memorizationTimer.value = 6;
  
  const setup = generateMemoryCards(difficulty.value);
  cards.value = setup.cards;
  targetCard.value = setup.target;
  
  // Start 6 seconds countdown
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (memorizationTimer.value > 1) {
      memorizationTimer.value--;
    } else {
      clearInterval(timerInterval);
      isMemorizingPhase.value = false;
    }
  }, 1000);
};

const clickCard = (idx) => {
  if (isMemorizingPhase.value || selectedCardIdx.value !== null) return;
  
  selectedCardIdx.value = idx;
  const clickedCard = cards.value[idx];
  
  if (clickedCard.id === targetCard.value.id) {
    isCorrect.value = true;
    score.value++;
    playBeep('correct');
  } else {
    isCorrect.value = false;
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

const getCardClass = (idx) => {
  const card = cards.value[idx];
  const isAnswered = selectedCardIdx.value !== null;
  const isTarget = card.id === targetCard.value.id;
  const isClicked = selectedCardIdx.value === idx;
  
  if (isMemorizingPhase.value) {
    return 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:scale-[1.03]';
  }
  
  if (!isAnswered) {
    return 'bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-800 hover:scale-[1.02]';
  }
  
  // Answered state
  if (isTarget) {
    // Show correct card with green border
    return 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 scale-[1.03] border-2';
  }
  if (isClicked && !isTarget) {
    // Clicked card was wrong
    return 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 border-2';
  }
  return 'bg-white dark:bg-slate-800 border-slate-105 dark:border-slate-800 opacity-60';
};

onUnmounted(() => {
  clearInterval(timerInterval);
  clearTimeout(delayTimeout);
});
</script>
