import { shuffle } from '../utils/shuffle.js';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function shiftChar(char, shift) {
  const idx = ALPHABET.indexOf(char.toUpperCase());
  if (idx === -1) return char;
  let newIdx = (idx + shift) % 26;
  if (newIdx < 0) newIdx += 26;
  return ALPHABET[newIdx];
}

// 50+ Noun Word Pool for ciphers
const WORD_POOL = [
  'RUMAH', 'MOBIL', 'PINTU', 'MEJA', 'BUKU', 'KUCING', 'ANJING', 'KURSI',
  'POHON', 'SEKOLAH', 'KERTAS', 'PENA', 'GELAS', 'PIRING', 'SENDOK', 'LAMPU',
  'TANGAN', 'KEPALA', 'SEPATU', 'CELANA', 'KEMEJA', 'KAMPUS', 'KREATIF', 'PINTAR',
  'BELAJAR', 'MEMORI', 'SPASIAL', 'LOGIKA', 'KAMAR', 'DINDING', 'ATAP', 'PAGAR',
  'TAMAN', 'BUNGA', 'DAUN', 'RANTING', 'BUAH', 'SAYUR', 'MAKAN', 'MINUM',
  'TIDUR', 'MANDI', 'KERJA', 'KULIAH', 'DOSEN', 'GURU', 'SISWA', 'KELAS'
];

// Verbal Analogy Pool
const ANALOGIES = [
  { w1: 'PADI', w2: 'PETANI', w3: 'PENYAIR', ans: 'PUISI', dists: ['BUKU', 'PENA', 'KERTAS', 'LAGU'] },
  { w1: 'MOBIL', w2: 'BENSIN', w3: 'MANUSIA', ans: 'MAKANAN', dists: ['AIR', 'UDARA', 'TIDUR', 'RUMAH'] },
  { w1: 'SEPATU', w2: 'KAKI', w3: 'TOPI', ans: 'KEPALA', dists: ['RAMBUT', 'MATA', 'TELINGA', 'LEHER'] },
  { w1: 'SARUNG TANGAN', w2: 'TANGAN', w3: 'KAUS KAKI', ans: 'KAKI', dists: ['SEPATU', 'SANDAL', 'JARI', 'LENGAN'] },
  { w1: 'DINDING', w2: 'BATU BATA', w3: 'BUKU', ans: 'KERTAS', dists: ['TULISAN', 'PENA', 'SAMPUL', 'GAMBAR'] },
  { w1: 'ES', w2: 'DINGIN', w3: 'API', ans: 'PANAS', dists: ['ASAP', 'MERAH', 'ARANG', 'CAHAYA'] },
  { w1: 'SIANG', w2: 'MATAHARI', w3: 'MALAM', ans: 'BULAN', dists: ['BINTANG', 'GELAP', 'TIDUR', 'AWAN'] },
  { w1: 'GIGI', w2: 'KUNYAH', w3: 'MATA', ans: 'LIHAT', dists: ['BACA', 'TENTU', 'PANDANG', 'MELIRIK'] },
  { w1: 'KUAS', w2: 'PELUKIS', w3: 'CANGKUL', ans: 'PETANI', dists: ['KEBUN', 'SAWAH', 'TANAH', 'SAPI'] },
  { w1: 'BURUNG', w2: 'TERBANG', w3: 'IKAN', ans: 'BERENANG', dists: ['AIR', 'SUNGAI', 'MENYELAM', 'BERNAFAS'] }
];

function getRandomWord(exclude = []) {
  const pool = WORD_POOL.filter(w => !exclude.includes(w));
  return pool[Math.floor(Math.random() * pool.length)];
}

function generateLogicQuestion(difficulty, id) {
  let text = '';
  let answer = '';
  let distractors = [];
  
  // Choose dynamically between 4 question categories: cipher, series, analogy, algebra
  const categories = ['cipher', 'series', 'analogy', 'algebra'];
  const category = categories[Math.floor(Math.random() * categories.length)];
  
  if (category === 'analogy') {
    // Pick an analogy question
    const item = ANALOGIES[Math.floor(Math.random() * ANALOGIES.length)];
    text = `Hubungan Kata: ${item.w1} : ${item.w2} = ${item.w3} : ...?`;
    answer = item.ans;
    distractors = [...item.dists];
  }
  
  else if (category === 'algebra') {
    // Generate dynamic system of linear equations
    // X + Y = sum, X - Y = diff -> solve X * Y
    const y = Math.floor(Math.random() * 8) + 2; // 2 to 9
    const x = y + Math.floor(Math.random() * 6) + 2; // Ensure x > y, integers
    
    const sum = x + y;
    const diff = x - y;
    const prod = x * y;
    
    text = `Jika nilai A + B = ${sum} dan A - B = ${diff}, berapakah hasil dari perkalian A × B?`;
    answer = `${prod}`;
    
    while (distractors.length < 4) {
      const offset = [2, -2, 4, -4, 10, -10][Math.floor(Math.random() * 6)];
      const d = `${prod + offset}`;
      if (d !== answer && d > '0' && !distractors.includes(d)) distractors.push(d);
    }
  }
  
  else if (category === 'cipher') {
    if (difficulty === 'easy') {
      const shift = [1, -1, 2, -2][Math.floor(Math.random() * 4)];
      const w1 = getRandomWord();
      const w1Cipher = w1.split('').map(c => shiftChar(c, shift)).join('');
      
      const w2 = getRandomWord([w1]);
      answer = w2.split('').map(c => shiftChar(c, shift)).join('');
      
      text = `Jika kata "${w1}" dikodekan sebagai "${w1Cipher}", maka kata "${w2}" dikodekan menjadi...?`;
      
      while (distractors.length < 4) {
        const randShift = shift + ([1, -1, 3, -3][Math.floor(Math.random() * 4)]);
        const d = w2.split('').map(c => shiftChar(c, randShift || 3)).join('');
        if (d !== answer && !distractors.includes(d)) distractors.push(d);
      }
    } else if (difficulty === 'medium') {
      const w1 = 'CINEMA';
      const w1Cipher = 'DKQDKX';
      const targets = ['SCREEN', 'MOVIES', 'CAMERA', 'PLAYER', 'ACTIVE', 'ACTION'];
      const target = targets[Math.floor(Math.random() * targets.length)];
      
      const pattern = [1, 2, 3, -1, -2, -3];
      answer = target.split('').map((c, i) => shiftChar(c, pattern[i % pattern.length])).join('');
      
      text = `Jika "${w1}" dikodekan menjadi "${w1Cipher}", maka sandi kode untuk kata "${target}" adalah...?`;
      
      while (distractors.length < 4) {
        const altPattern = pattern.map(p => p + (Math.random() > 0.5 ? 1 : -1));
        const d = target.split('').map((c, i) => shiftChar(c, altPattern[i % altPattern.length])).join('');
        if (d !== answer && !distractors.includes(d)) distractors.push(d);
      }
    } else { // hard
      const source = 'RACKET';
      const code = '813524';
      const mapping = { R: '8', A: '1', C: '3', K: '5', E: '2', T: '4' };
      
      const targets = [
        { word: 'TRACK', code: '48135' },
        { word: 'CATER', code: '31428' },
        { word: 'TACKLE', code: '4135' },
        { word: 'PACKET', code: '51324' }
      ];
      
      const item = targets[Math.floor(Math.random() * targets.length)];
      const targetLetters = item.word.split('');
      answer = targetLetters.map(char => mapping[char] || Math.floor(Math.random() * 9)).join('');
      
      text = `Jika kata "${source}" dituliskan dalam kode angka "${code}", bagaimanakah kode angka untuk kata "${item.word}"?`;
      
      while (distractors.length < 4) {
        const d = shuffle(answer.split('')).join('');
        if (d !== answer && !distractors.includes(d)) distractors.push(d);
      }
    }
  } else { // series
    if (difficulty === 'easy') {
      const start = Math.floor(Math.random() * 20) + 10;
      const step = [2, 3, 5, 10, -2, -3][Math.floor(Math.random() * 6)];
      const seq = [start, start + step, start + 2 * step, start + 3 * step];
      answer = `${start + 4 * step}`;
      
      text = `Angka kelanjutan dari deret angka berikut: ${seq.join(', ')}, ...`;
      
      while (distractors.length < 4) {
        const d = `${parseInt(answer) + ([1, -1, 2, -2, 5, -5][Math.floor(Math.random() * 6)])}`;
        if (d !== answer && !distractors.includes(d)) distractors.push(d);
      }
    } else if (difficulty === 'medium') {
      const start = Math.floor(Math.random() * 10) + 1;
      const seq = [start];
      let current = start;
      const rate = [1, 2][Math.floor(Math.random() * 2)];
      
      for (let i = 1; i <= 4; i++) {
        current += i * rate;
        seq.push(current);
      }
      answer = `${current + 5 * rate}`;
      
      text = `Tentukan suku deret angka berikutnya dari pola berikut: ${seq.join(', ')}, ...`;
      
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
  
  // Format options A to E (5 options)
  const options = [
    { value: answer, correct: true },
    ...distractors.slice(0, 4).map(d => ({ value: d, correct: false }))
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
    for (let i = 1; i <= 10; i++) { // Increase quiz size to 10 questions for richer runs
      questions.push(generateLogicQuestion(difficulty, i));
    }
    return questions;
  };
  
  return {
    generateLogicQuiz
  };
}
