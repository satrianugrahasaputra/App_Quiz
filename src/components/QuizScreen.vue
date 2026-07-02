<template>
  <div v-if="currentQuestion" class="space-y-6 max-w-xl mx-auto animate-fade-in">
    <!-- Header Stats -->
    <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-lg p-5 md:p-6 space-y-4">
      <div class="flex items-center justify-between text-sm md:text-base">
        <div class="flex items-center space-x-2">
          <span class="text-lg">🎯</span>
          <span class="font-semibold text-slate-500 dark:text-slate-400">Skor:</span>
          <span class="font-bold text-slate-850 dark:text-white">{{ score }}</span>
        </div>
        <div class="text-right">
          <span class="font-semibold text-slate-500 dark:text-slate-400">Pertanyaan </span>
          <span class="font-bold text-slate-850 dark:text-white">{{ currentIndex + 1 }}</span>
          <span class="font-semibold text-slate-550 dark:text-slate-400"> dari 10</span>
        </div>
      </div>
      
      <!-- Progress Bar -->
      <div class="relative w-full h-3 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
        <div
          class="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
          :style="{ width: `${progressPercent}%` }"
        ></div>
      </div>

      <!-- Question Countdown Timer -->
      <div v-if="timerEnabled" class="flex items-center space-x-3 text-xs md:text-sm">
        <span class="text-base">⏱️</span>
        <div class="flex-1 h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden relative">
          <div
            :class="[
              'h-full rounded-full transition-all duration-1000 ease-linear',
              timer > 10 
                ? 'bg-emerald-505 bg-gradient-to-r from-emerald-500 to-teal-500' 
                : timer > 5 
                ? 'bg-amber-500' 
                : 'bg-rose-500 animate-pulse'
            ]"
            :style="{ width: `${(timer / 30) * 100}%` }"
          ></div>
        </div>
        <span :class="['font-mono font-bold w-6 text-right', timer <= 5 ? 'text-rose-500 animate-pulse' : 'text-slate-650 dark:text-slate-300']">
          {{ timer }}s
        </span>
      </div>
    </div>

    <!-- Question display -->
    <QuestionCard
      :questionText="currentQuestion.text"
      :quizMode="quizMode"
      :isAnswered="selectedAnswer !== null"
    />

    <!-- Text to Speech -->
    <AudioPlayer :text="currentQuestion.speakText" :autoPlay="speechEnabled" />

    <!-- Multiple Choice Answer Options -->
    <AnswerButtons
      :options="currentQuestion.options"
      :selectedAnswer="selectedAnswer"
      @select="handleAnswer"
    />

    <!-- Navigation / Next Step -->
    <div class="h-16 flex items-center justify-center">
      <transition name="slide-up">
        <button
          v-if="selectedAnswer !== null"
          @click="handleNext"
          class="w-full py-4 bg-slate-800 dark:bg-slate-700 text-white font-bold rounded-2xl shadow-lg hover:bg-slate-900 dark:hover:bg-slate-600 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-slate-350 dark:focus:ring-slate-800 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <span>{{ currentIndex < 9 ? 'Pertanyaan Selanjutnya' : 'Lihat Hasil Kuis' }}</span>
          <span>→</span>
        </button>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted, watch } from 'vue';
import QuestionCard from './QuestionCard.vue';
import AudioPlayer from './AudioPlayer.vue';
import AnswerButtons from './AnswerButtons.vue';

const props = defineProps({
  currentQuestion: {
    type: Object,
    required: true
  },
  currentIndex: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  timer: {
    type: Number,
    required: true
  },
  timerEnabled: {
    type: Boolean,
    default: true
  },
  speechEnabled: {
    type: Boolean,
    default: true
  },
  progressPercent: {
    type: Number,
    required: true
  },
  selectedAnswer: {
    type: Object,
    default: null
  },
  quizMode: {
    type: String,
    default: 'visual'
  }
});

const emit = defineEmits(['select-answer', 'next-question']);

let autoNextTimeout = null;

const handleAnswer = (option) => {
  emit('select-answer', option);
  
  // Optional Auto-Next after 1.5 seconds if the user hasn't clicked Next
  clearTimeout(autoNextTimeout);
  autoNextTimeout = setTimeout(() => {
    // Only auto-advance if the user hasn't manually clicked next yet
    if (props.selectedAnswer !== null) {
      handleNext();
    }
  }, 2200); // 2.2 seconds gives enough time to see feedback
};

const handleNext = () => {
  clearTimeout(autoNextTimeout);
  emit('next-question');
};

onUnmounted(() => {
  clearTimeout(autoNextTimeout);
});

// Watch for question changes to clear any lingering autoNext timeouts
watch(() => props.currentIndex, () => {
  clearTimeout(autoNextTimeout);
});
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
