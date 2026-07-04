<template>
  <div class="space-y-6 max-w-2xl mx-auto animate-fade-in">
    <!-- Config screen (before playing) -->
    <div v-if="!gameStarted && !gameFinished" class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-8 space-y-6">
      <div class="text-center space-y-3">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-455">
          <span class="text-3xl">🎴</span>
        </div>
        <h2 class="text-2xl font-black text-slate-800 dark:text-white">Kuis Memori</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
          Uji daya ingat jangka pendek Anda. Hafalkan posisi kartu, angka, atau kata sebelum semuanya dibalik, lalu temukan yang diminta!
        </p>
      </div>

      <!-- Difficulty Selector -->
      <div class="space-y-3 pt-2">
        <label class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block text-center">
          Pilih Tingkat Kesulitan
        </label>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            v-for="lvl in ['easy', 'medium', 'hard']"
            :key="lvl"
            @click="difficulty = lvl"
            type="button"
            :class="[
              'p-4 rounded-2xl border text-center font-bold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 flex flex-col items-center justify-center space-y-1',
              difficulty === lvl
                ? lvl === 'easy'
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-700 dark:text-emerald-400 ring-2 ring-emerald-500/20'
                  : lvl === 'medium'
                  ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-500 text-rose-705 dark:text-rose-450 ring-2 ring-rose-500/20'
                  : 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-500 text-indigo-755 dark:text-indigo-400 ring-2 ring-indigo-500/20'
                : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-400 hover:border-slate-350'
            ]"
          >
            <span class="capitalize text-base font-black">
              {{ lvl === 'easy' ? '🟢 Mudah' : lvl === 'medium' ? '🟡 Sedang' : '🔴 Sulit' }}
            </span>
            <span class="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
              {{ lvl === 'easy' ? '10 Item / 20 Detik' : lvl === 'medium' ? '20 Item / 40 Detik' : '30 Item / 60 Detik' }}
            </span>
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
          <span class="text-xs font-bold tracking-widest text-rose-500 uppercase">FASE MENGHAFAL (Tipe: {{ getTypeName(itemType) }})</span>
          <h3 class="text-xl font-black text-slate-800 dark:text-white">
            Hafalkan posisi item dalam <span class="font-mono text-rose-500 animate-pulse text-2xl">{{ memorizationTimer }}</span> detik!
          </h3>
        </div>
        <!-- Phase 2: Guessing -->
        <div v-else-if="selectedCardIdx === null" class="space-y-2">
          <span class="text-xs font-bold tracking-widest text-amber-500 uppercase">FASE TEBAKAN</span>
          <h3 class="text-xl font-black text-slate-800 dark:text-white flex items-center justify-center space-x-2">
            <span>Di manakah letak item: </span>
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
            Item <span :class="targetCard.color">{{ targetCard.name }}</span> berada di posisi berbingkai hijau.
          </h3>
        </div>
      </div>

      <!-- Card Grid -->
      <div 
        :class="[
          'grid gap-2 justify-center mx-auto my-6',
          difficulty === 'easy' ? 'grid-cols-5 max-w-lg' : difficulty === 'medium' ? 'grid-cols-5 max-w-lg' : 'grid-cols-6 max-w-2xl'
        ]"
      >
        <div
          v-for="(card, idx) in cards"
          :key="card.id"
          @click="clickCard(idx)"
          :class="[
            'rounded-xl border-2 flex flex-col justify-center items-center cursor-pointer select-none relative shadow-sm transition-all duration-300',
            // Scale card sizes according to difficulty
            difficulty === 'easy' ? 'w-20 h-28 p-2 text-sm' : difficulty === 'medium' ? 'w-16 h-24 p-1.5 text-xs' : 'w-14 h-20 p-1 text-[10px]',
            getCardClass(idx)
          ]"
        >
          <!-- Card Front Face -->
          <template v-if="isMemorizingPhase || selectedCardIdx !== null">
            <!-- Card Type -->
            <template v-if="itemType === 'cards'">
              <div class="w-full text-left font-bold font-mono leading-none" :class="card.color">
                {{ card.value }}
              </div>
              <div class="text-center font-mono my-auto leading-none" :class="[card.color, difficulty === 'easy' ? 'text-3xl' : 'text-2xl']">
                {{ card.suit }}
              </div>
              <div class="w-full text-right font-bold font-mono rotate-180 leading-none" :class="card.color">
                {{ card.value }}
              </div>
            </template>
            
            <!-- Word Type -->
            <template v-else-if="itemType === 'words'">
              <div class="text-center font-bold px-1 py-0.5 break-words max-w-full truncate leading-tight text-slate-700 dark:text-slate-200">
                {{ card.name }}
              </div>
            </template>
            
            <!-- Number Type -->
            <template v-else>
              <div class="text-center font-black font-mono leading-none text-indigo-600 dark:text-indigo-400" :class="difficulty === 'easy' ? 'text-xl' : 'text-lg'">
                {{ card.name }}
              </div>
            </template>
            
            <!-- Checkmark / Cross overlay in feedback phase -->
            <span v-if="selectedCardIdx !== null && card.id === targetCard.id" class="absolute inset-0 bg-emerald-500/10 rounded-xl flex items-center justify-center text-2xl text-emerald-600">
              ✓
            </span>
            <span v-else-if="selectedCardIdx === idx && card.id !== targetCard.id" class="absolute inset-0 bg-rose-500/10 rounded-xl flex items-center justify-center text-2xl text-rose-600">
              ✗
            </span>
          </template>

          <!-- Card Back Face -->
          <template v-else>
            <div class="absolute inset-0 bg-gradient-to-br from-rose-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-inner border border-white/5">
              <div class="w-[85%] h-[85%] border border-white/10 rounded-lg flex items-center justify-center opacity-40 text-sm">
                ?
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
          <span>{{ currentIdx < totalQuestions - 1 ? 'Pertanyaan Selanjutnya' : 'Lihat Hasil' }}</span>
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
            {{ score }} <span class="text-lg font-normal text-slate-400">/ {{ totalQuestions }}</span>
          </p>
        </div>
        <div class="bg-slate-50 dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Akurasi</p>
          <p class="text-3xl font-black text-blue-600 dark:text-blue-400 mt-1 font-mono">
            {{ Math.round((score / totalQuestions) * 100) }}%
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
import { ref, onUnmounted, computed } from 'vue';
import { useMemoryGenerator } from '../composables/useMemoryGenerator.js';
import { playBeep } from '../composables/useQuiz.js';

const emit = defineEmits(['home']);
const { generateMemoryCards } = useMemoryGenerator();

const difficulty = ref('medium');

const totalQuestions = computed(() => {
  if (difficulty.value === 'easy') return 10;
  if (difficulty.value === 'medium') return 20;
  return 30;
});
const gameStarted = ref(false);
const gameFinished = ref(false);
const cards = ref([]);
const targetCard = ref(null);
const itemType = ref('cards');
const currentIdx = ref(0);
const score = ref(0);

const isMemorizingPhase = ref(true);
const memorizationTimer = ref(40);
const selectedCardIdx = ref(null);
const isCorrect = ref(false);

let timerInterval = null;

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
  
  // Set timers based on difficulty
  if (difficulty.value === 'easy') {
    memorizationTimer.value = 40;
  } else if (difficulty.value === 'medium') {
    memorizationTimer.value = 90;
  } else {
    memorizationTimer.value = 120;
  }
  
  const setup = generateMemoryCards(difficulty.value);
  cards.value = setup.cards;
  targetCard.value = setup.target;
  itemType.value = setup.itemType;
  
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
  if (currentIdx.value < totalQuestions.value - 1) {
    currentIdx.value++;
    loadQuestion();
  } else {
    gameFinished.value = true;
  }
};

const getTypeName = (type) => {
  if (type === 'cards') return 'Kartu Remi';
  if (type === 'words') return 'Kata';
  return 'Angka';
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
    return 'bg-slate-100 dark:bg-slate-900 border-slate-350 dark:border-slate-800 hover:scale-[1.02]';
  }
  
  // Answered state
  if (isTarget) {
    return 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 scale-[1.03] border-2';
  }
  if (isClicked && !isTarget) {
    return 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 border-2';
  }
  return 'bg-white dark:bg-slate-800 border-slate-105 dark:border-slate-800 opacity-60';
};

onUnmounted(() => {
  clearInterval(timerInterval);
});
</script>
