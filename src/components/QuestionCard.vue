<template>
  <div class="relative overflow-hidden bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl p-8 text-center my-6 transition-all duration-300 min-h-[180px] flex flex-col justify-center items-center">
    <!-- Decorative background elements -->
    <div class="absolute -top-12 -left-12 w-24 h-24 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-xl"></div>
    <div class="absolute -bottom-12 -right-12 w-24 h-24 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-xl"></div>
    
    <span class="text-xs font-semibold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
      {{ quizMode === 'listening' && !isAnswered ? 'LISTENING ONLY' : 'SOAL' }}
    </span>
    
    <div class="mt-4 mb-2 w-full flex items-center justify-center">
      <transition name="fade-scale" mode="out-in">
        <!-- Audio Placeholder for Listening Mode (unanswered) -->
        <div v-if="quizMode === 'listening' && !isAnswered" class="flex flex-col items-center space-y-4 py-2">
          <!-- Premium Pulsing Audio Waves -->
          <div class="flex items-center justify-center space-x-1.5 h-12">
            <span class="w-1.5 h-6 bg-blue-500 rounded-full animate-bounce-slow-1"></span>
            <span class="w-1.5 h-10 bg-indigo-500 rounded-full animate-bounce-slow-2"></span>
            <span class="w-1.5 h-12 bg-violet-500 rounded-full animate-bounce-slow-3"></span>
            <span class="w-1.5 h-10 bg-indigo-500 rounded-full animate-bounce-slow-4"></span>
            <span class="w-1.5 h-6 bg-blue-500 rounded-full animate-bounce-slow-5"></span>
          </div>
          <p class="text-sm font-semibold text-slate-500 dark:text-slate-400 animate-pulse">
            Dengarkan baik-baik dan pilih jawaban...
          </p>
        </div>
        
        <!-- Formula text (visual mode OR already answered in listening mode) -->
        <h2 
          v-else 
          class="text-5xl md:text-6xl font-bold tracking-tight text-slate-800 dark:text-white font-mono select-none"
        >
          {{ questionText }}
        </h2>
      </transition>
    </div>
  </div>
</template>

<script setup>
defineProps({
  questionText: {
    type: String,
    required: true
  },
  quizMode: {
    type: String,
    default: 'visual'
  },
  isAnswered: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
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

/* Custom bounce timings for waves */
@keyframes bounceSlow {
  0%, 100% { transform: scaleY(0.4); }
  50% { transform: scaleY(1); }
}

.animate-bounce-slow-1 { animation: bounceSlow 1.2s ease-in-out infinite; }
.animate-bounce-slow-2 { animation: bounceSlow 1.2s ease-in-out infinite 0.2s; }
.animate-bounce-slow-3 { animation: bounceSlow 1.2s ease-in-out infinite 0.4s; }
.animate-bounce-slow-4 { animation: bounceSlow 1.2s ease-in-out infinite 0.6s; }
.animate-bounce-slow-5 { animation: bounceSlow 1.2s ease-in-out infinite 0.8s; }
</style>
