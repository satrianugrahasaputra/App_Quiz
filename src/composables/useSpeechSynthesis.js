import { ref } from 'vue';

// Singleton state to share selected voice across all components
const isSpeaking = ref(false);
const voices = ref([]);
const selectedVoiceName = ref(localStorage.getItem('selected-voice') || '');

export function useSpeechSynthesis() {
  
  const loadVoices = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    const allVoices = window.speechSynthesis.getVoices();
    voices.value = allVoices;
    
    // If no voice is selected yet, try to auto-select the best Indonesian voice
    if (!selectedVoiceName.value) {
      const indonesian = allVoices.find(voice => 
        voice.lang === 'id-ID' || 
        voice.lang === 'id_ID' || 
        voice.lang.toLowerCase().startsWith('id')
      );
      if (indonesian) {
        selectedVoiceName.value = indonesian.name;
        localStorage.setItem('selected-voice', indonesian.name);
      }
    }
  };
  
  if (typeof window !== 'undefined' && window.speechSynthesis) {
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
    
    stop();
    if (!text) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find the voice selected by the user
    const allVoices = window.speechSynthesis.getVoices();
    const matchedVoice = allVoices.find(v => v.name === selectedVoiceName.value);
    
    if (matchedVoice) {
      utterance.voice = matchedVoice;
      utterance.lang = matchedVoice.lang;
    } else {
      // Fallback to standard Indonesian
      const indonesian = allVoices.find(voice => 
        voice.lang === 'id-ID' || 
        voice.lang === 'id_ID' || 
        voice.lang.toLowerCase().startsWith('id')
      );
      if (indonesian) {
        utterance.voice = indonesian;
        utterance.lang = indonesian.lang;
      } else {
        utterance.lang = 'id-ID';
      }
    }
    
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
    setTimeout(() => {
      speak(text);
    }, 50);
  };
  
  const changeVoice = (voiceName) => {
    selectedVoiceName.value = voiceName;
    localStorage.setItem('selected-voice', voiceName);
  };

  return {
    isSpeaking,
    selectedVoiceName,
    voices,
    speak,
    stop,
    replay,
    changeVoice
  };
}
