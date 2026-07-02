import { shuffle } from '../utils/shuffle.js';
import { numberToWords } from '../utils/numberToIndonesian.js';

const PERFECT_SQUARES = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400, 441, 484, 529, 576, 625];

function generateDistractors(correctVal) {
  const distractors = new Set();
  const offsets = [1, -1, 2, -2, 5, -5, 10, -10];
  const shuffledOffsets = shuffle(offsets);
  
  for (let offset of shuffledOffsets) {
    const val = correctVal + offset;
    if (val > 0 && val !== correctVal && !distractors.has(val)) {
      distractors.add(val);
    }
    if (distractors.size === 3) break;
  }
  
  let fallback = 1;
  while (distractors.size < 3) {
    const val = correctVal + fallback;
    if (val > 0 && val !== correctVal && !distractors.has(val)) {
      distractors.add(val);
    }
    fallback++;
  }
  
  return Array.from(distractors);
}

function generateSingleStereoQuestion(difficulty, id) {
  let length = 5;
  let allowedOps = ['addition', 'subtraction'];
  
  if (difficulty === 'easy') {
    length = Math.floor(Math.random() * 2) + 4; // 4 to 5 steps
    allowedOps = ['addition', 'subtraction'];
  } else if (difficulty === 'medium') {
    length = Math.floor(Math.random() * 2) + 6; // 6 to 7 steps
    allowedOps = ['addition', 'subtraction', 'multiplication', 'division'];
  } else { // hard
    length = Math.floor(Math.random() * 3) + 8; // 8 to 10 steps
    allowedOps = ['addition', 'subtraction', 'multiplication', 'division', 'power', 'sqrt'];
  }
  
  const steps = [];
  let currentTotal = Math.floor(Math.random() * 15) + 5; // Start with 5 to 19
  
  // Initial step
  steps.push({
    text: `${currentTotal}`,
    speakText: numberToWords(currentTotal),
    op: 'init',
    value: currentTotal,
    runningTotal: currentTotal
  });
  
  let stepCount = 0;
  let attempts = 0;
  
  while (stepCount < length - 1 && attempts < 100) {
    attempts++;
    const op = allowedOps[Math.floor(Math.random() * allowedOps.length)];
    let stepText = '';
    let stepSpeak = '';
    let newTotal = currentTotal;
    let val = 0;
    
    if (op === 'addition') {
      val = Math.floor(Math.random() * 19) + 2; // 2 to 20
      newTotal = currentTotal + val;
      stepText = `+ ${val}`;
      stepSpeak = `ditambah ${numberToWords(val)}`;
    } else if (op === 'subtraction') {
      val = Math.floor(Math.random() * 14) + 2; // 2 to 15
      if (currentTotal - val > 0) {
        newTotal = currentTotal - val;
        stepText = `- ${val}`;
        stepSpeak = `dikurangi ${numberToWords(val)}`;
      } else {
        continue;
      }
    } else if (op === 'multiplication') {
      val = Math.floor(Math.random() * 4) + 2; // 2 to 5
      if (currentTotal * val < 500) {
        newTotal = currentTotal * val;
        stepText = `x ${val}`;
        stepSpeak = `dikali ${numberToWords(val)}`;
      } else {
        continue;
      }
    } else if (op === 'division') {
      // Find divisor
      const divisors = [];
      for (let d = 2; d <= 10; d++) {
        if (currentTotal % d === 0) divisors.push(d);
      }
      if (divisors.length > 0) {
        val = divisors[Math.floor(Math.random() * divisors.length)];
        newTotal = currentTotal / val;
        stepText = `÷ ${val}`;
        stepSpeak = `dibagi ${numberToWords(val)}`;
      } else {
        continue;
      }
    } else if (op === 'power') {
      // Exponent 2 or 3
      const exp = Math.random() > 0.6 ? 3 : 2;
      if (exp === 2 && currentTotal <= 15) {
        newTotal = currentTotal * currentTotal;
        stepText = `^ 2`;
        stepSpeak = `dipangkatkan dua`;
      } else if (exp === 3 && currentTotal <= 6) {
        newTotal = currentTotal * currentTotal * currentTotal;
        stepText = `^ 3`;
        stepSpeak = `dipangkatkan tiga`;
      } else {
        continue;
      }
    } else if (op === 'sqrt') {
      if (PERFECT_SQUARES.includes(currentTotal) && currentTotal > 1) {
        newTotal = Math.round(Math.sqrt(currentTotal));
        stepText = `√`;
        stepSpeak = `diakarkan`;
      } else {
        continue;
      }
    }
    
    steps.push({
      text: stepText,
      speakText: stepSpeak,
      op,
      value: val || null,
      runningTotal: newTotal
    });
    
    currentTotal = newTotal;
    stepCount++;
  }
  
  const distractors = generateDistractors(currentTotal);
  const options = [
    { value: currentTotal, correct: true },
    ...distractors.map(d => ({ value: d, correct: false }))
  ];
  
  return {
    id,
    steps,
    answer: currentTotal,
    options: shuffle(options)
  };
}

export function useStereoGenerator() {
  const generateStereoQuiz = (difficulty = 'medium') => {
    const questions = [];
    for (let i = 1; i <= 5; i++) {
      questions.push(generateSingleStereoQuestion(difficulty, i));
    }
    return questions;
  };
  
  return {
    generateStereoQuiz
  };
}
