<template>
  <div class="space-y-6 max-w-xl mx-auto animate-fade-in">
    <!-- Config screen (before playing) -->
    <div v-if="!gameStarted && !gameFinished" class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-8 space-y-6">
      <div class="text-center space-y-3">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-500/10 text-violet-650 dark:bg-violet-500/20 dark:text-violet-400">
          <span class="text-3xl">📐</span>
        </div>
        <h2 class="text-2xl font-black text-slate-800 dark:text-white">Kuis Spasial</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
          Uji kemampuan visualisasi 3D Anda dengan menghitung tumpukan kubus, menganalisis rotasi geometri, dan melipat jaring-jaring 3D.
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
              'py-3 px-4 rounded-2xl border text-center font-bold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 capitalize',
              difficulty === lvl
                ? lvl === 'easy'
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-700 dark:text-emerald-400 ring-2 ring-emerald-500/20'
                  : lvl === 'medium'
                  ? 'bg-violet-50/50 dark:bg-violet-950/20 border-violet-550 text-violet-755 dark:text-violet-400 ring-2 ring-violet-500/20'
                  : 'bg-slate-900 text-white border-slate-900 dark:bg-slate-700 dark:border-slate-600 ring-2 ring-slate-500/20'
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
          class="flex-[2] py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-2xl shadow-lg shadow-violet-500/20 transition-all duration-300"
        >
          Mulai Latihan
        </button>
      </div>
    </div>

    <!-- Active play screen -->
    <div v-else-if="gameStarted && !gameFinished" class="space-y-6">
      
      <!-- Stats Header -->
      <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-lg p-5 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <span class="text-xl">🎯</span>
          <span class="font-bold text-slate-800 dark:text-white">Skor: {{ score }}</span>
        </div>
        <div class="font-bold text-slate-500 dark:text-slate-400">
          Soal {{ currentIdx + 1 }} dari 3
        </div>
      </div>

      <!-- Question Text Panel -->
      <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-6 text-center space-y-2">
        <span class="text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 uppercase">KUIS SPASIAL</span>
        <h3 class="text-lg font-bold text-slate-850 dark:text-white leading-relaxed">
          {{ activeQuestion.text }}
        </h3>
      </div>

      <!-- SVG Illustration viewport -->
      <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-8 flex items-center justify-center min-h-[260px]">
        <!-- Stack of 4 Cubes (Easy 1) -->
        <svg v-if="activeQuestion.svgType === 'cube-stack-4'" width="220" height="200" viewBox="0 0 220 200" class="overflow-visible">
          <!-- Iso projections (0,0), (1,0), (0,1) Ground. (0,0) L1 -->
          <!-- Drawing order: back to front -->
          <!-- ground x=0, y=1 -->
          <g transform="translate(70, 110)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#a1a1a1" stroke="#333" stroke-width="1.5"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#7a7a7a" stroke="#333" stroke-width="1.5"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#c4c4c4" stroke="#333" stroke-width="1.5"/>
          </g>
          <!-- ground x=1, y=0 -->
          <g transform="translate(130, 80)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#a1a1a1" stroke="#333" stroke-width="1.5"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#7a7a7a" stroke="#333" stroke-width="1.5"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#c4c4c4" stroke="#333" stroke-width="1.5"/>
          </g>
          <!-- ground x=0, y=0 -->
          <g transform="translate(100, 95)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#b0c4de" stroke="#333" stroke-width="1.5"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#4682b4" stroke="#333" stroke-width="1.5"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#b0e0e6" stroke="#333" stroke-width="1.5"/>
          </g>
          <!-- level 1 x=0, y=0 -->
          <g transform="translate(100, 60)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#ffb6c1" stroke="#333" stroke-width="1.5"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#db7093" stroke="#333" stroke-width="1.5"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#ffc0cb" stroke="#333" stroke-width="1.5"/>
          </g>
        </svg>

        <!-- Stairs 3 Cubes (Easy 3) -->
        <svg v-else-if="activeQuestion.svgType === 'cube-stairs-3'" width="220" height="200" viewBox="0 0 220 200">
          <!-- Step 1: ground x=1, y=0 -->
          <g transform="translate(120, 110)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#a1a1a1" stroke="#333" stroke-width="1.5"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#7a7a7a" stroke="#333" stroke-width="1.5"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#c4c4c4" stroke="#333" stroke-width="1.5"/>
          </g>
          <!-- Step 2: ground x=0, y=0 -->
          <g transform="translate(90, 125)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#b0c4de" stroke="#333" stroke-width="1.5"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#4682b4" stroke="#333" stroke-width="1.5"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#b0e0e6" stroke="#333" stroke-width="1.5"/>
          </g>
          <!-- Step 3: level 1 x=0, y=0 -->
          <g transform="translate(90, 90)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#ffb6c1" stroke="#333" stroke-width="1.5"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#db7093" stroke="#333" stroke-width="1.5"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#ffc0cb" stroke="#333" stroke-width="1.5"/>
          </g>
        </svg>

        <!-- Stack of 8 Cubes (Medium 1) -->
        <svg v-else-if="activeQuestion.svgType === 'cube-stack-8'" width="220" height="200" viewBox="0 0 220 200">
          <!-- Stack representation -->
          <!-- Draw ground layer (5 cubes) -->
          <g transform="translate(60, 110)"><!-- x=0,y=2 -->
            <polygon points="0,0 30,-15 60,0 30,15" fill="#a1a1a1" stroke="#333"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#7a7a7a" stroke="#333"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#c4c4c4" stroke="#333"/>
          </g>
          <g transform="translate(120, 80)"><!-- x=2,y=0 -->
            <polygon points="0,0 30,-15 60,0 30,15" fill="#a1a1a1" stroke="#333"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#7a7a7a" stroke="#333"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#c4c4c4" stroke="#333"/>
          </g>
          <!-- middle cubes -->
          <g transform="translate(90, 95)"><!-- x=1,y=1 -->
            <polygon points="0,0 30,-15 60,0 30,15" fill="#a1a1a1" stroke="#333"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#7a7a7a" stroke="#333"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#c4c4c4" stroke="#333"/>
          </g>
          <g transform="translate(110, 115)"><!-- x=0,y=0 -->
            <polygon points="0,0 30,-15 60,0 30,15" fill="#b0c4de" stroke="#333"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#4682b4" stroke="#333"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#b0e0e6" stroke="#333"/>
          </g>
          <!-- Level 1 (2 cubes) -->
          <g transform="translate(110, 80)"><!-- x=0,y=0 L1 -->
            <polygon points="0,0 30,-15 60,0 30,15" fill="#ffb6c1" stroke="#333"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#db7093" stroke="#333"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#ffc0cb" stroke="#333"/>
          </g>
          <g transform="translate(80, 95)"><!-- x=1,y=0 L1 -->
            <polygon points="0,0 30,-15 60,0 30,15" fill="#ffb6c1" stroke="#333"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#db7093" stroke="#333"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#ffc0cb" stroke="#333"/>
          </g>
          <!-- Level 2 (1 cube) -->
          <g transform="translate(110, 45)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#ffffe0" stroke="#333"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#darkkhaki" stroke="#333"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#fafad2" stroke="#333"/>
          </g>
        </svg>

        <!-- Cube Pyramid 14 (Hard 1) -->
        <svg v-else-if="activeQuestion.svgType === 'cube-pyramid-14'" width="220" height="200" viewBox="0 0 220 200">
          <!-- 3D stacked Pyramid -->
          <!-- Render top tier (1 cube) -->
          <g transform="translate(90, 45)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#ffe4e1" stroke="#333"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#e6a8d7" stroke="#333"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#ffdae9" stroke="#333"/>
          </g>
          <!-- Mid tier (4 cubes) -->
          <g transform="translate(60, 75)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#b0c4de" stroke="#333"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#4682b4" stroke="#333"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#b0e0e6" stroke="#333"/>
          </g>
          <g transform="translate(120, 75)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#b0c4de" stroke="#333"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#4682b4" stroke="#333"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#b0e0e6" stroke="#333"/>
          </g>
          <g transform="translate(90, 90)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#b0c4de" stroke="#333"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#4682b4" stroke="#333"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#b0e0e6" stroke="#333"/>
          </g>
          <!-- Ground tier (show front row only) -->
          <g transform="translate(60, 135)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#a1a1a1" stroke="#333"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#7a7a7a" stroke="#333"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#c4c4c4" stroke="#333"/>
          </g>
          <g transform="translate(120, 135)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#a1a1a1" stroke="#333"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#7a7a7a" stroke="#333"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#c4c4c4" stroke="#333"/>
          </g>
        </svg>

        <!-- Donut Stack 12 (Hard 3) -->
        <svg v-else-if="activeQuestion.svgType === 'cube-stack-donut-12'" width="220" height="200" viewBox="0 0 220 200">
          <g transform="translate(70, 120)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#b0c4de" stroke="#333"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#4682b4" stroke="#333"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#b0e0e6" stroke="#333"/>
          </g>
          <g transform="translate(130, 90)">
            <polygon points="0,0 30,-15 60,0 30,15" fill="#b0c4de" stroke="#333"/>
            <polygon points="0,0 0,35 30,50 30,15" fill="#4682b4" stroke="#333"/>
            <polygon points="30,15 30,50 60,35 60,0" fill="#b0e0e6" stroke="#333"/>
          </g>
        </svg>

        <!-- L-Shape Rotation (Easy 2) -->
        <svg v-else-if="activeQuestion.svgType === 'rotation-l-shape'" width="200" height="150" viewBox="0 0 200 150">
          <!-- Original Shape on left, options drawn below or described -->
          <g transform="translate(20, 20)">
            <path d="M 0 0 L 20 0 L 20 60 L 50 60 L 50 80 L 0 80 Z" fill="#4f46e5" stroke="#333" stroke-width="2"/>
            <text x="5" y="-5" font-size="10" font-weight="bold">Asli</text>
          </g>
          
          <g transform="translate(110, 20)">
            <path d="M 0 30 L 60 30 L 60 50 L 80 50 L 80 0 L 0 0 Z" fill="#a1a1a1" stroke="#333" stroke-width="1"/>
            <text x="35" y="45" font-size="12" font-weight="bold">B (Rotasi 90°)</text>
          </g>
        </svg>

        <!-- Cube Net fold (Medium 2) -->
        <svg v-else-if="activeQuestion.svgType === 'cube-net-fold-1'" width="220" height="160" viewBox="0 0 220 160">
          <g transform="translate(30, 20)" stroke="#333" stroke-width="1.5" fill="none">
            <!-- Net representation -->
            <rect x="30" y="0" width="30" height="30" fill="#f8fafc"/>
            <rect x="30" y="30" width="30" height="30" fill="#f1f5f9"/>
            <rect x="30" y="60" width="30" height="30" fill="#e2e8f0"/>
            <rect x="30" y="90" width="30" height="30" fill="#cbd5e1"/>
            <rect x="0" y="30" width="30" height="30" fill="#94a3b8"/>
            <rect x="60" y="30" width="30" height="30" fill="#64748b"/>
          </g>
          <text x="140" y="80" font-size="12" font-weight="bold" fill="#333">Pilihan A (Benar)</text>
        </svg>

        <!-- Arrow reflection (Medium 3) -->
        <svg v-else-if="activeQuestion.svgType === 'arrow-reflection'" width="220" height="150" viewBox="0 0 220 150">
          <g transform="translate(30, 40)">
            <!-- Left Arrow pointing right -->
            <path d="M 0 20 L 40 20 L 40 0 L 70 30 L 40 60 L 40 40 L 0 40 Z" fill="#3b82f6"/>
            <text x="25" y="-10" font-size="12" font-weight="bold" fill="#333">Asli</text>
          </g>
          
          <g transform="translate(130, 40)">
            <!-- Right Arrow pointing left (horizontal reflection) -->
            <path d="M 70 20 L 30 20 L 30 0 L 0 30 L 30 60 L 30 40 L 70 40 Z" fill="#ef4444"/>
            <text x="15" y="-10" font-size="12" font-weight="bold" fill="#333">Pilihan C</text>
          </g>
        </svg>

        <!-- Prism fold (Hard 2) -->
        <svg v-else-if="activeQuestion.svgType === 'prism-fold-hard'" width="220" height="150" viewBox="0 0 220 150">
          <text x="20" y="80" font-size="14" font-weight="bold" fill="#6366f1">📐 Gambar Geometri 3D</text>
        </svg>
      </div>

      <!-- Multiple Choice Options -->
      <div class="grid grid-cols-2 gap-4">
        <button
          v-for="(option, idx) in activeQuestion.options"
          :key="idx"
          @click="selectAnswer(option)"
          :disabled="selectedAnswer !== null"
          :class="[
            'relative p-5 text-xl font-bold rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-4 select-none font-mono text-center',
            getButtonClass(option)
          ]"
        >
          {{ option.value }}
        </button>
      </div>

      <!-- Next question navigator -->
      <div class="h-16 flex items-center justify-center">
        <button
          v-if="selectedAnswer !== null"
          @click="nextQuestion"
          class="w-full py-4 bg-slate-800 dark:bg-slate-700 text-white font-bold rounded-2xl shadow-md hover:bg-slate-900 dark:hover:bg-slate-655 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <span>{{ currentIdx < 2 ? 'Pertanyaan Selanjutnya' : 'Lihat Hasil' }}</span>
          <span>→</span>
        </button>
      </div>

    </div>

    <!-- Final Result screen -->
    <div v-else class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-8 text-center space-y-6">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-violet-500/10 text-violet-650 dark:bg-violet-500/20 dark:text-violet-400 text-4xl shadow-inner">
        🏆
      </div>
      
      <div class="space-y-2">
        <h2 class="text-3xl font-black text-slate-800 dark:text-white">Latihan Selesai!</h2>
        <p class="text-lg font-bold text-violet-600 dark:text-violet-455 uppercase tracking-widest">
          Kuis Spasial
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        <div class="bg-slate-50 dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Skor Akhir</p>
          <p class="text-3xl font-black text-violet-600 dark:text-violet-400 mt-1 font-mono">
            {{ score }} <span class="text-lg font-normal text-slate-400">/ 3</span>
          </p>
        </div>
        <div class="bg-slate-50 dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Akurasi</p>
          <p class="text-3xl font-black text-blue-600 dark:text-blue-400 mt-1 font-mono">
            {{ Math.round((score / 3) * 100) }}%
          </p>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center pt-4">
        <button
          @click="startGame"
          class="flex-1 px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-2xl shadow-lg transition-all duration-300"
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
import { useSpatialGenerator } from '../composables/useSpatialGenerator.js';
import { playBeep } from '../composables/useQuiz.js';

const emit = defineEmits(['home']);
const { getSpatialQuestions } = useSpatialGenerator();

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
  questions.value = getSpatialQuestions(difficulty.value);
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
  if (currentIdx.value < 2) {
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
    return 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white hover:border-violet-500 hover:bg-violet-50/20 dark:hover:bg-slate-750 hover:scale-[1.02] active:scale-[0.98]';
  }
  if (option.correct) {
    return 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-400 border-2';
  }
  if (isSelected && !option.correct) {
    return 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-700 dark:text-rose-455 border-2';
  }
  return 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-60';
};
</script>
