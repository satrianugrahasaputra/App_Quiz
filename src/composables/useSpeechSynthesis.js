import { ref } from 'vue';

const isSpeaking = ref(false);

export function useSpeechSynthesis() {
  
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
    
    // Default Indonesian Voice lookup
    const allVoices = window.speechSynthesis.getVoices();
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
    
    // Standard natural parameters
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
    speak,
    stop,
    replay
  };
}
