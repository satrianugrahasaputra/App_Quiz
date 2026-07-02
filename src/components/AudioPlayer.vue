<template>
  <div class="flex flex-col items-center justify-center space-y-4 my-6">
    <button
      @click="handlePlay"
      :disabled="!text"
      class="group relative flex items-center justify-center space-x-3 px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none w-full max-w-sm"
      aria-label="Dengarkan Soal"
    >
      <!-- Pulses for speaking animation -->
      <span
        v-if="isSpeaking"
        class="absolute inset-0 rounded-2xl bg-indigo-500 animate-ping opacity-25"
      ></span>
      
      <!-- Icon -->
      <span class="text-2xl transition-transform duration-300 group-hover:scale-110">
        <span v-if="isSpeaking">🔊</span>
        <span v-else>🔈</span>
      </span>
      
      <span>{{ isSpeaking ? 'Mendengarkan...' : 'Dengarkan Soal' }}</span>
      
      <!-- Mini audio wave visualizer -->
      <div v-if="isSpeaking" class="flex items-end space-x-1 h-5 ml-2">
        <span class="w-1 bg-white rounded-full animate-wave-1 bar-1"></span>
        <span class="w-1 bg-white rounded-full animate-wave-2 bar-2"></span>
        <span class="w-1 bg-white rounded-full animate-wave-3 bar-3"></span>
        <span class="w-1 bg-white rounded-full animate-wave-4 bar-4"></span>
      </div>
    </button>

    <!-- Indonesian Voice Status indicator -->
    <p v-if="!idVoice" class="text-xs text-amber-600 dark:text-amber-400 font-medium text-center">
      ⚠️ Suara Bahasa Indonesia tidak ditemukan, menggunakan suara default sistem.
    </p>
    <p v-else class="text-xs text-emerald-600 dark:text-emerald-400 font-medium text-center">
      ✓ Suara Bahasa Indonesia aktif
    </p>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useSpeechSynthesis } from '../composables/useSpeechSynthesis.js';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  autoPlay: {
    type: Boolean,
    default: true
  }
});

const { isSpeaking, idVoice, speak, stop, replay } = useSpeechSynthesis();

const handlePlay = () => {
  replay(props.text);
};

// Auto play on question load
onMounted(() => {
  if (props.autoPlay) {
    // Adding a slight delay to ensure browser speech init is ready
    setTimeout(() => {
      speak(props.text);
    }, 400);
  }
});

// Re-speak if question text changes
watch(() => props.text, (newText) => {
  if (props.autoPlay && newText) {
    speak(newText);
  }
});
</script>

<style scoped>
@keyframes wave {
  0%, 100% { height: 4px; }
  50% { height: 16px; }
}
.animate-wave-1 { animation: wave 0.8s ease-in-out infinite alternate; }
.animate-wave-2 { animation: wave 0.8s ease-in-out infinite alternate 0.2s; }
.animate-wave-3 { animation: wave 0.8s ease-in-out infinite alternate 0.4s; }
.animate-wave-4 { animation: wave 0.8s ease-in-out infinite alternate 0.1s; }

.bar-1 { height: 4px; }
.bar-2 { height: 8px; }
.bar-3 { height: 12px; }
.bar-4 { height: 6px; }
</style>
