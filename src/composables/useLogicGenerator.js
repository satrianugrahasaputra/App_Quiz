import { shuffle } from '../utils/shuffle.js';

// Letter mapping helpers
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function shiftChar(char, shift) {
  const idx = ALPHABET.indexOf(char.toUpperCase());
  if (idx === -1) return char;
  let newIdx = (idx + shift) % 26;
  if (newIdx < 0) newIdx += 26;
  return ALPHABET[newIdx];
}

function encryptPattern(word, pattern) {
  return word.split('').map((char, i) => {
    const shift = pattern[i % pattern.length];
    return shiftChar(char, shift);
  }).join('');
}

function generateLogicQuestion(difficulty, id) {
  let text = '';
  let answer = '';
  let distractors = [];
  
  if (difficulty === 'easy') {
    // 50% shift ciphers (+1 or -1 shift), 50% simple number series
    if (Math.random() > 0.5) {
      const words = ['KUCING', 'PINTU', 'MEJA', 'BUKU', 'RUMAH', 'MOBIL'];
      const word = words[Math.floor(Math.random() * words.length)];
      const shift = Math.random() > 0.5 ? 1 : -1;
      const cipher = word.split('').map(c => shiftChar(c, shift)).join('');
      
      const targetWords = ['ANJING', 'JENDELA', 'KURSI', 'PENA', 'ATAP', 'MOTOR'];
      const target = targetWords[Math.floor(Math.random() * targetWords.length)];
      answer = target.split('').map(c => shiftChar(c, shift)).join('');
      
      text = `Jika ${word} ditulis sebagai ${cipher}, maka bagaimana ${target} ditulis?`;
      
      // Distractors
      while (distractors.length < 4) {
        const randShift = Math.floor(Math.random() * 5) - 2;
        const d = target.split('').map(c => shiftChar(c, randShift || 3)).join('');
        if (d !== answer && !distractors.includes(d)) distractors.push(d);
      }
    } else {
      // Simple number series (+2, +3, -2, -5)
      const start = Math.floor(Math.random() * 15) + 5;
      const diff = [2, 3, 5, -2, -3][Math.floor(Math.random() * 5)];
      const seq = [start, start + diff, start + 2 * diff, start + 3 * diff];
      text = `Tentukan angka selanjutnya dari deret berikut: ${seq.join(', ')}, ...`;
      answer = `${start + 4 * diff}`;
      
      while (distractors.length < 4) {
        const offset = [1, -1, 2, -2, 5, -5][Math.floor(Math.random() * 6)];
        const d = `${parseInt(answer) + offset}`;
        if (d !== answer && !distractors.includes(d)) distractors.push(d);
      }
    }
  } else if (difficulty === 'medium') {
    // 50% split positive/negative shifts, 50% multi-progression series
    if (Math.random() > 0.5) {
      const word = 'CINEMA';
      const cipher = 'DKQDKX'; // +1, +2, +3, -1, -2, -3
      const target = 'SCREEN';
      answer = 'TUEDCK'; // S+1=T, C+2=E, R+3=U, E-1=D, E-2=C, N-3=K
      
      text = `Jika ${word} kodenya adalah ${cipher}, dan MOVIES adalah NQYHCP, maka kode dari ${target} adalah ?`;
      distractors = ['TEUCDK', 'TEUDCK', 'TEUDCM', 'TUEDCM'];
    } else {
      // Progression: +1, +2, +3, +4...
      const start = Math.floor(Math.random() * 10) + 2;
      const seq = [start];
      let current = start;
      for (let i = 1; i <= 4; i++) {
        current += i;
        seq.push(current);
      }
      text = `Tentukan angka berikutnya: ${seq.join(', ')}, ...`;
      answer = `${current + 5}`;
      
      while (distractors.length < 4) {
        const offset = [1, -1, 2, -2, 4, -4][Math.floor(Math.random() * 6)];
        const d = `${parseInt(answer) + offset}`;
        if (d !== answer && !distractors.includes(d)) distractors.push(d);
      }
    }
  } else { // hard
    // 50% cipher index mapping, 50% complex progressions
    if (Math.random() > 0.5) {
      const word = 'RACKET';
      const code = '813524';
      const target = 'TRACK';
      answer = '48135'; // T=4, R=8, A=1, C=3, K=5
      
      text = `Jika ${word} dituliskan dalam kode ${code}, maka bagaimanakah ${target}?`;
      distractors = ['24813', '35418', '54312', '64278'];
    } else {
      // Fibonacci-like sequence or multiplication sequence
      // e.g. 2, 6, 12, 36, 72, ... (*3, *2, *3, *2)
      const start = [2, 3][Math.floor(Math.random() * 2)];
      const seq = [start, start * 3, start * 6, start * 18, start * 36];
      text = `Tentukan angka berikutnya dari pola perkalian deret berikut: ${seq.join(', ')}, ...`;
      answer = `${seq[4] * 3}`;
      
      while (distractors.length < 4) {
        const offset = [10, -10, 20, -20, 50, -50][Math.floor(Math.random() * 6)];
        const d = `${parseInt(answer) + offset}`;
        if (d !== answer && !distractors.includes(d)) distractors.push(d);
      }
    }
  }
  
  const options = [
    { value: answer, correct: true },
    ...distractors.map(d => ({ value: d, correct: false }))
  ];
  
  return {
    id,
    text,
    options: shuffle(options),
    answer
  };
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
