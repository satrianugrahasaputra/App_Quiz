import { ref, onMounted } from 'vue';

export function useSpeechSynthesis() {
  const isSpeaking = ref(false);
  const voices = ref([]);
  const idVoice = ref(null);
  
  const loadVoices = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    const allVoices = window.speechSynthesis.getVoices();
    voices.value = allVoices;
    
    // Find Indonesian voice: look for "id-ID", "id_ID"
    const indonesian = allVoices.find(voice => 
      voice.lang === 'id-ID' || 
      voice.lang === 'id_ID' || 
      voice.lang.toLowerCase().startsWith('id')
    );
    
    idVoice.value = indonesian || null;
  };
  
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    // Chrome / Edge loads voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }
  
  const stop = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    isSpeaking.value = false;
  };
  
  const speak = (text) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    // Stop any current speaking to prevent overlaps
    stop();
    
    if (!text) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Assign Indonesian voice if found
    if (idVoice.value) {
      utterance.voice = idVoice.value;
    }
    utterance.lang = 'id-ID';
    
    utterance.onstart = () => {
      isSpeaking.value = true;
    };
    
    utterance.onend = () => {
      isSpeaking.value = false;
    };
    
    utterance.onerror = (e) => {
      console.error('SpeechSynthesis error:', e);
      isSpeaking.value = false;
    };
    
    window.speechSynthesis.speak(utterance);
  };
  
  const replay = (text) => {
    stop();
    // Use a tiny timeout to ensure clean start
    setTimeout(() => {
      speak(text);
    }, 50);
  };
  
  return {
    isSpeaking,
    idVoice,
    speak,
    stop,
    replay,
    voices
  };
}
