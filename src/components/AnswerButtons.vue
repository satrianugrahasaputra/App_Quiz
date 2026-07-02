<template>
  <div class="grid grid-cols-2 gap-4 my-6">
    <button
      v-for="(option, idx) in options"
      :key="idx"
      @click="handleSelect(option)"
      :disabled="selectedAnswer !== null"
      :class="[
        'relative overflow-hidden p-6 text-2xl font-bold rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-4 select-none',
        // Keyboard hotkey indicator border alignment
        'focus:ring-blue-300 dark:focus:ring-blue-800',
        getButtonClass(option)
      ]"
      aria-label="Pilihan jawaban"
    >
      <!-- Key indicator (1, 2, 3, 4) in top-left -->
      <span class="absolute top-2 left-2.5 text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded">
        {{ idx + 1 }}
      </span>

      <!-- Answer Value -->
      <span class="block text-center font-mono">
        {{ option.value }}
      </span>
      
      <!-- Overlay icons for feedback -->
      <span v-if="selectedAnswer && option.correct" class="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 dark:text-emerald-400 text-xl">
        ✓
      </span>
      <span v-else-if="selectedAnswer && selectedAnswer.value === option.value && !option.correct" class="absolute right-3 top-1/2 -translate-y-1/2 text-rose-600 dark:text-rose-400 text-xl">
        ✗
      </span>
    </button>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  selectedAnswer: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['select']);

const handleSelect = (option) => {
  if (props.selectedAnswer === null) {
    emit('select', option);
  }
};

const getButtonClass = (option) => {
  const isAnswered = props.selectedAnswer !== null;
  const isSelected = props.selectedAnswer?.value === option.value;
  
  if (!isAnswered) {
    // Normal / Idle state
    return 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-slate-750 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]';
  }
  
  // Quiz is answered
  if (option.correct) {
    // Correct answer is always green after answering
    return 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-400 shadow-sm border-2';
  }
  
  if (isSelected && !option.correct) {
    // Selected wrong answer is red
    return 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-700 dark:text-rose-400 border-2';
  }
  
  // Other non-correct options
  return 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-60';
};

// Keyboard listener for hotkeys '1', '2', '3', '4'
const handleKeyDown = (event) => {
  if (props.selectedAnswer !== null) return;
  
  const key = event.key;
  if (['1', '2', '3', '4'].includes(key)) {
    const idx = parseInt(key, 10) - 1;
    if (idx < props.options.length) {
      handleSelect(props.options[idx]);
    }
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>
