import { shuffle } from '../utils/shuffle.js';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function shiftChar(char, shift) {
  const idx = ALPHABET.indexOf(char.toUpperCase());
  if (idx === -1) return char;
  let newIdx = (idx + shift) % 26;
  if (newIdx < 0) newIdx += 26;
  return ALPHABET[newIdx];
}

// Generate a random word from a word pool
const WORD_POOL = [
  'RUMAH', 'MOBIL', 'PINTU', 'MEJA', 'BUKU', 'KUCING', 'ANJING', 'KURSI',
  'POHON', 'SEKOLAH', 'KERTAS', 'PENA', 'GELAS', 'PIRING', 'SENDOK', 'LAMPU',
  'TANGAN', 'KEPALA', 'SEPATU', 'CELANA', 'KEMEJA', 'KAMPUS', 'KREATIF', 'PINTAR'
];

function getRandomWord(exclude = []) {
  const pool = WORD_POOL.filter(w => !exclude.includes(w));
  return pool[Math.floor(Math.random() * pool.length)];
}

function generateLogicQuestion(difficulty, id) {
  let text = '';
  let answer = '';
  let distractors = [];
  
  const type = Math.random() > 0.5 ? 'cipher' : 'series';
  
  if (type === 'cipher') {
    if (difficulty === 'easy') {
      // Simple letter shift cipher (+1, +2, -1, or -2)
      const shift = [1, 2, -1, -2][Math.floor(Math.random() * 4)];
      const w1 = getRandomWord();
      const w1Cipher = w1.split('').map(c => shiftChar(c, shift)).join('');
      
      const w2 = getRandomWord([w1]);
      answer = w2.split('').map(c => shiftChar(c, shift)).join('');
      
      text = `Jika kata "${w1}" dikodekan sebagai "${w1Cipher}", maka bagaimanakah kata "${w2}" dikodekan?`;
      
      while (distractors.length < 4) {
        const randShift = shift + ([1, -1, 3, -3][Math.floor(Math.random() * 4)]);
        const d = w2.split('').map(c => shiftChar(c, randShift || 3)).join('');
        if (d !== answer && !distractors.includes(d)) distractors.push(d);
      }
    } else if (difficulty === 'medium') {
      // Split pattern cipher: first half positive shift, second half negative shift
      const w1 = 'CINEMA';
      const w1Cipher = 'DKQDKX'; // +1, +2, +3, -1, -2, -3
      
      // Let's dynamically pick another 6 letter target word
      const targets = ['SCREEN', 'MOVIES', 'CAMERA', 'PLAYER', 'ACTIVE', 'ACTION'];
      const target = targets[Math.floor(Math.random() * targets.length)];
      
      // Apply pattern +1, +2, +3, -1, -2, -3
      const pattern = [1, 2, 3, -1, -2, -3];
      answer = target.split('').map((c, i) => shiftChar(c, pattern[i % pattern.length])).join('');
      
      text = `Jika "${w1}" dikodekan menjadi "${w1Cipher}", maka kode dari kata "${target}" adalah ?`;
      
      // Generate distractors by shifting pattern values slightly
      while (distractors.length < 4) {
        const altPattern = pattern.map(p => p + (Math.random() > 0.5 ? 1 : -1));
        const d = target.split('').map((c, i) => shiftChar(c, altPattern[i % altPattern.length])).join('');
        if (d !== answer && !distractors.includes(d)) distractors.push(d);
      }
    } else { // hard
      // Letter-to-digit index mapping
      // Pick a source word with distinct letters
      const source = 'RACKET';
      const code = '813524'; // R=8, A=1, C=3, K=5, E=2, T=4
      
      const mapping = { R: '8', A: '1', C: '3', K: '5', E: '2', T: '4' };
      
      const targets = [
        { word: 'TRACK', code: '48135' },
        { word: 'CATER', code: '31428' },
        { word: 'TACKLE', code: '4135' }, // Sub-parts
        { word: 'PACKET', code: '51324' }
      ];
      
      const item = targets[Math.floor(Math.random() * targets.length)];
      
      // Generate dynamically based on mapped characters
      const targetLetters = item.word.split('');
      answer = targetLetters.map(char => mapping[char] || Math.floor(Math.random() * 9)).join('');
      
      text = `Jika kata "${source}" dituliskan dalam kode angka "${code}", maka bagaimanakah kode untuk kata "${item.word}"?`;
      
      while (distractors.length < 4) {
        const d = shuffle(answer.split('')).join('');
        if (d !== answer && !distractors.includes(d)) distractors.push(d);
      }
    }
  } else { // series
    if (difficulty === 'easy') {
      // Simple progression (+X or -X)
      const start = Math.floor(Math.random() * 20) + 10;
      const step = [2, 3, 5, 10, -2, -3][Math.floor(Math.random() * 6)];
      const seq = [start, start + step, start + 2 * step, start + 3 * step];
      answer = `${start + 4 * step}`;
      
      text = `Tentukan angka kelanjutan dari deret angka berikut: ${seq.join(', ')}, ...`;
      
      while (distractors.length < 4) {
        const d = `${parseInt(answer) + ([1, -1, 2, -2, 5, -5][Math.floor(Math.random() * 6)])}`;
        if (d !== answer && !distractors.includes(d)) distractors.push(d);
      }
    } else if (difficulty === 'medium') {
      // Growing progression: start, +1, +2, +3, +4
      const start = Math.floor(Math.random() * 10) + 1;
      const seq = [start];
      let current = start;
      const rate = [1, 2][Math.floor(Math.random() * 2)];
      
      for (let i = 1; i <= 4; i++) {
        current += i * rate;
        seq.push(current);
      }
      answer = `${current + 5 * rate}`;
      
      text = `Temukan pola peningkatan deret berikut dan tentukan angka selanjutnya: ${seq.join(', ')}, ...`;
      
      while (distractors.length < 4) {
        const d = `${parseInt(answer) + ([1, -1, 2, -2, 3, -3][Math.floor(Math.random() * 6)])}`;
        if (d !== answer && !distractors.includes(d)) distractors.push(d);
      }
    } else { // hard
      // Alternating series: *3, *2, *3, *2 or mixed double step
      const start = [2, 3][Math.floor(Math.random() * 2)];
      const seq = [start, start * 3, start * 6, start * 18, start * 36];
      answer = `${seq[4] * 3}`;
      
      text = `Berapakah nilai angka berikutnya dari pola deret perkalian: ${seq.join(', ')}, ...`;
      
      while (distractors.length < 4) {
        const d = `${parseInt(answer) + ([6, -6, 12, -12, 18, -18][Math.floor(Math.random() * 6)])}`;
        if (d !== answer && !distractors.includes(d)) distractors.push(d);
      }
    }
  }
  
  return {
    id,
    text,
    options: shuffle(optionsBuilder(answer, distractors)),
    answer
  };
}

function optionsBuilder(answer, distractors) {
  const opts = [{ value: answer, correct: true }];
  distractors.forEach(d => {
    opts.push({ value: d, correct: false });
  });
  return opts;
}

export function useLogicGenerator() {
  const generateLogicQuiz = (difficulty = 'medium') => {
    const questions = [];
    for (let i = 1; i <= 5; i++) {
      questions.push(generateLogicQuestion(difficulty, i));
    }
    return questions;
  };
  
  return {
    generateLogicQuiz
  };
}
