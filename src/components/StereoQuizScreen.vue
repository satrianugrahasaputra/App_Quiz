<template>
  <div class="space-y-6 max-w-xl mx-auto animate-fade-in">
    
    <!-- Config screen (before playing) -->
    <div v-if="!gameStarted && !gameFinished" class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-8 space-y-6">
      <div class="text-center space-y-3">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
          <span class="text-3xl">🎧</span>
        </div>
        <h2 class="text-2xl font-black text-slate-800 dark:text-white">Aritmatika Stereo</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
          Kalkulasi mental tanpa henti. Angka akan dibacakan berurutan setiap 2 detik. Hitung dari kiri ke kanan!
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
              'py-3 px-4 rounded-2xl border text-center font-bold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 capitalize',
              difficulty === lvl
                ? lvl === 'easy'
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-700 dark:text-emerald-400 ring-2 ring-emerald-500/20'
                  : lvl === 'medium'
                  ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-500 text-indigo-750 dark:text-indigo-455 ring-2 ring-indigo-500/20'
                  : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-500 text-rose-700 dark:text-rose-450 ring-2 ring-rose-500/20'
                : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-350'
            ]"
          >
            {{ lvl === 'easy' ? '🟢 Mudah' : lvl === 'medium' ? '🟡 Sedang' : '🔴 Sulit' }}
          </button>
        </div>
        
        <!-- Explanation of Mode -->
        <div class="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl text-xs text-slate-500 dark:text-slate-400 leading-relaxed border border-slate-100 dark:border-slate-800">
          <p v-if="difficulty === 'easy'"><strong>🟢 Mudah:</strong> 4-5 operasi tambah/kurang saja. Sangat cocok untuk pemanasan.</p>
          <p v-else-if="difficulty === 'medium'"><strong>🟡 Sedang:</strong> 6-7 operasi termasuk perkalian dan pembagian sederhana.</p>
          <p v-else><strong>🔴 Sulit:</strong> 8-10 operasi panjang, termasuk perkalian cepat, pembagian, pangkat 2 & 3, serta akar kuadrat.</p>
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
          class="flex-[2] py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 transition-all duration-300"
        >
          Mulai Latihan
        </button>
      </div>
    </div>

    <!-- Active game screen -->
    <div v-else-if="gameStarted && !gameFinished" class="space-y-6">
      
      <!-- Score & Progress Header -->
      <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-lg p-6 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <span class="text-xl">🎯</span>
          <span class="font-bold text-slate-800 dark:text-white">Skor: {{ score }}</span>
        </div>
        <div class="font-bold text-slate-500 dark:text-slate-400">
          Soal {{ currentIdx + 1 }} dari 5
        </div>
      </div>

      <!-- Main Audio Wave & Step Indicator Panel -->
      <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-8 text-center space-y-6 relative overflow-hidden flex flex-col justify-center items-center min-h-[220px]">
        
        <span class="text-xs font-bold tracking-widest text-indigo-500 uppercase">
          ARITMATIKA STEREO
        </span>

        <!-- Playing/Speaking State -->
        <div v-if="isPlayingSequence" class="flex flex-col items-center space-y-6 w-full">
          <!-- Big pulsing audio logo -->
          <div class="relative w-20 h-20 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center text-4xl animate-pulse">
            🔊
            <span class="absolute inset-0 rounded-full bg-indigo-500/25 animate-ping"></span>
          </div>

          <div class="space-y-2 w-full max-w-xs">
            <div class="flex justify-between text-xs font-semibold text-slate-400">
              <span>Mendengarkan Rantai Soal...</span>
              <span>Langkah {{ currentStepIndex + 1 }} / {{ activeQuestion.steps.length }}</span>
            </div>
            <!-- Step Progress timer bar (2 seconds countdown per step) -->
            <div class="h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
              <div
                class="h-full bg-indigo-500 transition-all duration-100 ease-linear rounded-full"
                :style="{ width: `${(stepTimer / 2.0) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Answering state (Done speaking, waiting for answer) -->
        <div v-else-if="showChoices && selectedAnswer === null" class="flex flex-col items-center space-y-3">
          <div class="w-16 h-16 bg-amber-500/15 text-amber-500 rounded-full flex items-center justify-center text-3xl animate-bounce">
            ❓
          </div>
          <h3 class="text-xl font-bold text-slate-800 dark:text-white">Berapakah hasil akhirnya?</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">Pilih dari pilihan jawaban di bawah.</p>
        </div>

        <!-- Feedback state (Answer selected) -->
        <div v-else class="flex flex-col items-center space-y-3">
          <div 
            :class="[
              'w-16 h-16 rounded-full flex items-center justify-center text-3xl font-black',
              selectedAnswer.correct ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
            ]"
          >
            {{ selectedAnswer.correct ? '✓' : '✗' }}
          </div>
          <h3 class="text-2xl font-black text-slate-850 dark:text-white">
            Hasil Akhir: <span class="font-mono text-indigo-600 dark:text-indigo-400">{{ activeQuestion.answer }}</span>
          </h3>
          <p class="text-xs font-semibold" :class="selectedAnswer.correct ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-450'">
            {{ selectedAnswer.correct ? 'Jawaban Anda Benar!' : 'Jawaban Anda Kurang Tepat!' }}
          </p>
        </div>
      </div>

      <!-- Multiple Choice Options -->
      <div v-if="showChoices" class="grid grid-cols-2 gap-4">
        <button
          v-for="(option, idx) in activeQuestion.options"
          :key="idx"
          @click="selectAnswer(option)"
          :disabled="selectedAnswer !== null"
          :class="[
            'relative overflow-hidden p-5 text-xl font-bold rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-4 select-none font-mono',
            getButtonClass(option)
          ]"
        >
          {{ option.value }}
        </button>
      </div>

      <!-- Educational History Panel (Revealed after answering) -->
      <div v-if="selectedAnswer !== null" class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-lg p-6 space-y-4 animate-fade-in">
        <h4 class="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center space-x-2">
          <span>📖</span>
          <span>Rincian Kalkulasi (Kiri ke Kanan)</span>
        </h4>
        
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs md:text-sm font-mono">
          <div
            v-for="(step, idx) in activeQuestion.steps"
            :key="idx"
            class="p-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl flex flex-col justify-center items-center"
          >
            <span class="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-bold">Langkah {{ idx + 1 }}</span>
            <span class="text-base font-bold text-slate-800 dark:text-white my-0.5">
              {{ step.op === 'init' ? '' : step.text }}
              <span v-if="step.op === 'init'" class="text-indigo-650 dark:text-indigo-400">{{ step.text }}</span>
            </span>
            <span class="text-[10px] text-slate-450 dark:text-slate-400 font-semibold bg-slate-200/50 dark:bg-slate-800 px-1.5 py-0.5 rounded">Total: {{ step.runningTotal }}</span>
          </div>
        </div>
      </div>

      <!-- Next question navigator -->
      <div class="h-16 flex items-center justify-center">
        <button
          v-if="selectedAnswer !== null"
          @click="nextQuestion"
          class="w-full py-4 bg-slate-800 dark:bg-slate-700 text-white font-bold rounded-2xl shadow-md hover:bg-slate-900 dark:hover:bg-slate-655 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <span>{{ currentIdx < 4 ? 'Pertanyaan Selanjutnya' : 'Lihat Hasil Latihan' }}</span>
          <span>→</span>
        </button>
      </div>

    </div>

    <!-- Final Result screen -->
    <div v-else class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-8 text-center space-y-6">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-500/10 text-indigo-500 text-4xl shadow-inner">
        🏆
      </div>
      
      <div class="space-y-2">
        <h2 class="text-3xl font-black text-slate-800 dark:text-white font-sans">Latihan Selesai!</h2>
        <p class="text-lg font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
          Aritmatika Stereo
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        <div class="bg-slate-50 dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Skor Akhir</p>
          <p class="text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-1 font-mono">
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
          class="flex-1 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg transition-all duration-300"
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
import { useStereoGenerator } from '../composables/useStereoGenerator.js';
import { useSpeechSynthesis } from '../composables/useSpeechSynthesis.js';
import { playBeep } from '../composables/useQuiz.js';

const emit = defineEmits(['home']);

const { generateStereoQuiz } = useStereoGenerator();
const { speak, stop } = useSpeechSynthesis();

const difficulty = ref('medium');
const gameStarted = ref(false);
const gameFinished = ref(false);
const questions = ref([]);
const currentIdx = ref(0);
const activeQuestion = ref(null);

const isPlayingSequence = ref(false);
const showChoices = ref(false);
const currentStepIndex = ref(0);
const stepTimer = ref(2.0);
const selectedAnswer = ref(null);
const score = ref(0);

let sequenceTimeout = null;

const startGame = () => {
  playBeep('click');
  questions.value = generateStereoQuiz(difficulty.value);
  currentIdx.value = 0;
  score.value = 0;
  gameFinished.value = false;
  gameStarted.value = true;
  loadQuestion();
};

const loadQuestion = () => {
  selectedAnswer.value = null;
  showChoices.value = false;
  activeQuestion.value = questions.value[currentIdx.value];
  playStereoSequence();
};

const playStereoSequence = async () => {
  isPlayingSequence.value = true;
  currentStepIndex.value = 0;
  
  for (let i = 0; i < activeQuestion.value.steps.length; i++) {
    // If the game was stopped/navigated away, break the loop
    if (!gameStarted.value || gameFinished.value) return;
    
    currentStepIndex.value = i;
    const step = activeQuestion.value.steps[i];
    
    speak(step.speakText);
    
    // 2-second visual timer countdown
    stepTimer.value = 2.0;
    const intervalTime = 100; // tick every 100ms
    const timerInterval = setInterval(() => {
      if (stepTimer.value > 0) {
        stepTimer.value = parseFloat((stepTimer.value - 0.1).toFixed(1));
      }
    }, intervalTime);
    
    await new Promise(resolve => {
      sequenceTimeout = setTimeout(resolve, 2000);
    });
    
    clearInterval(timerInterval);
  }
  
  isPlayingSequence.value = false;
  showChoices.value = true;
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
    return 'bg-white dark:bg-slate-800 border-slate-205 dark:border-slate-700 text-slate-800 dark:text-white hover:border-indigo-500 hover:bg-indigo-50/20 dark:hover:bg-slate-750 hover:scale-[1.02] active:scale-[0.98]';
  }
  if (option.correct) {
    return 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-400 border-2';
  }
  if (isSelected && !option.correct) {
    return 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-700 dark:text-rose-455 border-2';
  }
  return 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-60';
};

onUnmounted(() => {
  clearTimeout(sequenceTimeout);
  stop();
});
</script>

<style scoped>
/* Wave Animations and Fade transitions */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>
