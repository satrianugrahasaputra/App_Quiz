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
    
    // Format text to introduce dramatic pauses around math operators
    let formattedText = text
      .replace(/\s?\+\s?/g, ', ditambah, ')
      .replace(/\s?-\s?/g, ', dikurangi, ')
      .replace(/\s?\*\s?/g, ', dikali, ')
      .replace(/\s?\/\s?/g, ', dibagi, ')
      .replace(/tambah/gi, ', ditambah, ')
      .replace(/kurang/gi, ', dikurangi, ')
      .replace(/kali/gi, ', dikali, ')
      .replace(/bagi/gi, ', dibagi, ')
      .replace(/pangkat/gi, ', pangkat, ')
      .replace(/akar/gi, ', akar, ')
      .replace(/sama dengan/gi, ', sama dengan, ');

    const utterance = new SpeechSynthesisUtterance(formattedText);
    
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
    
    // Clash of Champions Host emulation parameters:
    // Deeper authoritative pitch (0.88) and distinct, well-paced rate (0.9)
    utterance.pitch = 0.88;
    utterance.rate = 0.9;
    
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
