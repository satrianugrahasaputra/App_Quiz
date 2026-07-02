<script setup>
import { ref } from 'vue';
import { useQuiz } from './composables/useQuiz.js';
import LandingPage from './components/LandingPage.vue';
import StartScreen from './components/StartScreen.vue';
import QuizScreen from './components/QuizScreen.vue';
import ResultScreen from './components/ResultScreen.vue';
import StereoQuizScreen from './components/StereoQuizScreen.vue';

const quiz = useQuiz();

// View navigation: 'landing' | 'standard-quiz' | 'stereo-quiz'
const currentView = ref('landing');

// To track active/highlighted score in the current run leaderboard
const activePlayerName = ref('');

const handleSelectMode = (mode) => {
  currentView.value = mode === 'standard' ? 'standard-quiz' : 'stereo-quiz';
  quiz.resetQuiz();
};

const goHome = () => {
  currentView.value = 'landing';
  quiz.resetQuiz();
};

const handleSaveScore = (name) => {
  activePlayerName.value = name;
  quiz.saveLeaderboard(name);
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 flex flex-col font-sans">
    
    <!-- Navigation Bar -->
    <header class="w-full border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-50 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <!-- Brand / Click to go Home -->
        <button @click="goHome" class="flex items-center space-x-2.5 focus:outline-none group">
          <span class="text-2xl group-hover:scale-110 transition-transform">🧠</span>
          <span class="font-extrabold text-slate-850 dark:text-white tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Aritmatika Numerik
          </span>
        </button>
        
        <!-- Controls -->
        <div class="flex items-center space-x-4">
          <!-- Back to Home Link -->
          <button
            v-if="currentView !== 'landing'"
            @click="goHome"
            class="text-sm font-bold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 focus:outline-none transition-colors"
          >
            ← Beranda
          </button>

          <!-- Dark Mode Toggle Button -->
          <button
            @click="quiz.isDarkMode.value = !quiz.isDarkMode.value"
            class="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-750 dark:text-slate-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :aria-label="quiz.isDarkMode.value ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'"
          >
            <span v-if="quiz.isDarkMode.value">☀️</span>
            <span v-else>🌙</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 max-w-6xl w-full mx-auto px-4 py-8 md:py-12 flex flex-col justify-center">
      
      <!-- Route 1: Landing Page -->
      <LandingPage
        v-if="currentView === 'landing'"
        @select-mode="handleSelectMode"
      />

      <!-- Route 2: Standard Arithmetic Quiz -->
      <div v-else-if="currentView === 'standard-quiz'" class="w-full">
        <!-- Start Screen -->
        <StartScreen
          v-if="!quiz.quizStarted.value && !quiz.quizFinished.value"
          :modelValue="quiz"
          :leaderboard="quiz.leaderboard.value"
          @start="quiz.startQuiz"
          @clear-leaderboard="quiz.clearLeaderboard"
        />

        <!-- Quiz Play Screen -->
        <QuizScreen
          v-else-if="quiz.quizStarted.value && !quiz.quizFinished.value"
          :currentQuestion="quiz.currentQuestion.value"
          :currentIndex="quiz.currentIndex.value"
          :score="quiz.score.value"
          :timer="quiz.timer.value"
          :timerEnabled="quiz.timerEnabled.value"
          :speechEnabled="quiz.speechEnabled.value"
          :progressPercent="quiz.progressPercent.value"
          :selectedAnswer="quiz.selectedAnswer.value"
          :quizMode="quiz.quizMode.value"
          @select-answer="quiz.selectAnswer"
          @next-question="quiz.nextQuestion"
        />

        <!-- Results Screen -->
        <ResultScreen
          v-else
          :score="quiz.score.value"
          :accuracy="quiz.accuracy.value"
          :avgSpeed="quiz.averageResponseTime.value"
          :badge="quiz.performanceBadge.value"
          :leaderboard="quiz.leaderboard.value.map(entry => ({ ...entry, isCurrent: entry.name === activePlayerName }))"
          @restart="quiz.startQuiz"
          @home="goHome"
          @save-score="handleSaveScore"
        />
      </div>

      <!-- Route 3: Stereo Arithmetic Mode -->
      <StereoQuizScreen
        v-else-if="currentView === 'stereo-quiz'"
        @home="goHome"
      />

    </main>

    <!-- Footer -->
    <footer class="w-full py-6 border-t border-slate-100 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 text-center text-xs text-slate-400 dark:text-slate-500 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4">
        Aplikasi Kuis Aritmatika Numerik &copy; 2026.
      </div>
    </footer>
  </div>
</template>

<style>
/* Global Transitions */
.animate-fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
