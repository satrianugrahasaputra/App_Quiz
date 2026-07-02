import { ref, computed, watch } from 'vue';
import { useQuestionGenerator } from './useQuestionGenerator.js';

// Sound synthesis using Web Audio API
export function playBeep(type) {
  if (typeof window === 'undefined') return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  
  try {
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
      
      // Secondary ascending tone
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
      gain2.gain.setValueAtTime(0.1, ctx.currentTime + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.33);
      osc2.start(ctx.currentTime + 0.08);
      osc2.stop(ctx.currentTime + 0.33);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(130.81, ctx.currentTime); // C3 low buzz
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 high beep
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    }
  } catch (error) {
    console.error('AudioContext play error:', error);
  }
}

export function useQuiz() {
  const { generateQuizQuestions } = useQuestionGenerator();
  
  // Settings & Theme
  const isDarkMode = ref(localStorage.getItem('theme') === 'dark');
  const selectedOperations = ref(['addition', 'subtraction', 'multiplication', 'division', 'power', 'sqrt']);
  const timerEnabled = ref(true);
  const speechEnabled = ref(true);
  const quizMode = ref('visual'); // 'visual' | 'listening'
  const difficultyLevel = ref('medium'); // 'easy' | 'medium' | 'hard'
  
  // Quiz State
  const quizStarted = ref(false);
  const quizFinished = ref(false);
  const questions = ref([]);
  const currentIndex = ref(0);
  const selectedAnswer = ref(null); // { value: number, correct: boolean }
  const score = ref(0);
  const timer = ref(30);
  
  // Statistics
  const responseTimes = ref([]); // array of response time in seconds for each question
  const questionStartTime = ref(null);
  const leaderboard = ref([]);
  
  // Timer Interval
  let timerInterval = null;
  
  // Computed values
  const currentQuestion = computed(() => {
    if (questions.value.length === 0 || currentIndex.value >= questions.value.length) return null;
    return questions.value[currentIndex.value];
  });
  
  const progressPercent = computed(() => {
    if (questions.value.length === 0) return 0;
    return ((currentIndex.value) / questions.value.length) * 100;
  });
  
  const accuracy = computed(() => {
    if (questions.value.length === 0) return 0;
    return Math.round((score.value / questions.value.length) * 100);
  });
  
  const averageResponseTime = computed(() => {
    if (responseTimes.value.length === 0) return 0;
    const sum = responseTimes.value.reduce((acc, t) => acc + t, 0);
    return parseFloat((sum / responseTimes.value.length).toFixed(1));
  });
  
  // Badge logic
  const performanceBadge = computed(() => {
    const pct = accuracy.value;
    if (pct >= 90) return { label: 'Sangat Baik', icon: '🏆', color: 'text-yellow-500' };
    if (pct >= 70) return { label: 'Baik', icon: '⭐', color: 'text-blue-500' };
    if (pct >= 50) return { label: 'Cukup', icon: '👍', color: 'text-green-500' };
    return { label: 'Perlu Latihan', icon: '📚', color: 'text-red-500' };
  });
  
  // Dark mode watcher
  watch(isDarkMode, (newVal) => {
    if (newVal) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, { immediate: true });
  
  // Leaderboard management
  const loadLeaderboard = () => {
    const stored = localStorage.getItem('leaderboard');
    leaderboard.value = stored ? JSON.parse(stored) : [];
  };
  
  const saveLeaderboard = (name = 'Anonim') => {
    const entry = {
      id: Date.now(),
      name,
      score: score.value,
      total: questions.value.length,
      accuracy: accuracy.value,
      avgSpeed: averageResponseTime.value,
      date: new Date().toLocaleDateString('id-ID')
    };
    
    loadLeaderboard();
    leaderboard.value.push(entry);
    // Sort by score (desc), then speed (asc)
    leaderboard.value.sort((a, b) => b.score - a.score || a.avgSpeed - b.avgSpeed);
    // Limit to top 5
    leaderboard.value = leaderboard.value.slice(0, 5);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard.value));
  };
  
  const clearLeaderboard = () => {
    localStorage.removeItem('leaderboard');
    leaderboard.value = [];
  };
  
  // Start Quiz
  const startQuiz = () => {
    playBeep('click');
    questions.value = generateQuizQuestions(difficultyLevel.value, selectedOperations.value);
    currentIndex.value = 0;
    selectedAnswer.value = null;
    score.value = 0;
    responseTimes.value = [];
    quizFinished.value = false;
    quizStarted.value = true;
    startQuestion();
  };
  
  // Initialize current question
  const startQuestion = () => {
    selectedAnswer.value = null;
    timer.value = 30;
    questionStartTime.value = Date.now();
    
    if (timerEnabled.value) {
      clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        if (timer.value > 0) {
          timer.value--;
        } else {
          // Time's up! Force incorrect answer selection
          clearInterval(timerInterval);
          handleTimeOut();
        }
      }, 1000);
    }
  };
  
  // Select Answer
  const selectAnswer = (option) => {
    if (selectedAnswer.value !== null) return; // Answer locked
    
    clearInterval(timerInterval);
    selectedAnswer.value = option;
    
    // Track response speed
    const duration = (Date.now() - questionStartTime.value) / 1000;
    responseTimes.value.push(parseFloat(duration.toFixed(1)));
    
    if (option.correct) {
      score.value++;
      playBeep('correct');
    } else {
      playBeep('wrong');
    }
  };
  
  // Handle Timeout
  const handleTimeOut = () => {
    // Select a placeholder incorrect answer or highlight correct
    selectedAnswer.value = { value: null, correct: false };
    responseTimes.value.push(30.0);
    playBeep('wrong');
  };
  
  // Move to next question
  const nextQuestion = () => {
    playBeep('click');
    if (currentIndex.value < questions.value.length - 1) {
      currentIndex.value++;
      startQuestion();
    } else {
      // Quiz finished
      quizFinished.value = true;
      quizStarted.value = false;
      clearInterval(timerInterval);
      saveLeaderboard();
    }
  };
  
  // Reset / Go back to Start
  const resetQuiz = () => {
    playBeep('click');
    quizStarted.value = false;
    quizFinished.value = false;
    questions.value = [];
    currentIndex.value = 0;
    selectedAnswer.value = null;
    score.value = 0;
    timer.value = 30;
    responseTimes.value = [];
    clearInterval(timerInterval);
  };
  
  // Load leaderboard initially
  loadLeaderboard();
  
  return {
    isDarkMode,
    selectedOperations,
    timerEnabled,
    speechEnabled,
    quizMode,
    difficultyLevel,
    quizStarted,
    quizFinished,
    questions,
    currentIndex,
    selectedAnswer,
    score,
    timer,
    responseTimes,
    currentQuestion,
    progressPercent,
    accuracy,
    averageResponseTime,
    performanceBadge,
    leaderboard,
    startQuiz,
    selectAnswer,
    nextQuestion,
    resetQuiz,
    clearLeaderboard,
    saveLeaderboard,
    playBeep
  };
}
