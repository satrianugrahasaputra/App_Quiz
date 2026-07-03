import { ref } from 'vue';

const isSpeaking = ref(false);
const idVoice = ref(null);

export function useSpeechSynthesis() {
  
  const loadVoices = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    const allVoices = window.speechSynthesis.getVoices();
    const indonesian = allVoices.find(voice => 
      voice.lang === 'id-ID' || 
      voice.lang === 'id_ID' || 
      voice.lang.toLowerCase().startsWith('id')
    );
    idVoice.value = indonesian || null;
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
    
    // Assign Indonesian voice if found
    if (idVoice.value) {
      utterance.voice = idVoice.value;
      utterance.lang = idVoice.value.lang;
    } else {
      utterance.lang = 'id-ID';
    }
    
    utterance.pitch = 1.0;
    utterance.rate = 1.0;
    
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

  return {
    isSpeaking,
    idVoice,
    speak,
    stop,
    replay
  };
}
