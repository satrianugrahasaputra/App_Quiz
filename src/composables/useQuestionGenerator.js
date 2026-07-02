import { shuffle } from '../utils/shuffle.js';
import { mathExpressionToIndonesian } from '../utils/numberToIndonesian.js';

/**
 * Generates distractors close to the correct answer.
 * @param {number} correctVal - The correct answer.
 * @returns {Array<number>} An array of 3 unique distractor integers.
 */
function generateDistractors(correctVal) {
  const distractors = new Set();
  
  // Variations to apply
  const offsets = [1, -1, 2, -2, 3, -3, 5, -5, 10, -10];
  
  // Shuffle offsets to pick randomly
  const shuffledOffsets = shuffle(offsets);
  
  for (let offset of shuffledOffsets) {
    const val = correctVal + offset;
    if (val > 0 && val !== correctVal && !distractors.has(val)) {
      distractors.add(val);
    }
    if (distractors.size === 3) break;
  }
  
  // Fallback if we couldn't get 3
  let fallbackOffset = 1;
  while (distractors.size < 3) {
    const val = correctVal + fallbackOffset;
    if (val > 0 && val !== correctVal && !distractors.has(val)) {
      distractors.add(val);
    }
    fallbackOffset++;
  }
  
  return Array.from(distractors);
}

/**
 * Generates a single unique question object.
 * @param {string} type - 'addition' | 'subtraction' | 'multiplication' | 'division' | 'power' | 'sqrt'
 * @param {string} difficulty - 'easy' | 'medium' | 'hard'
 * @param {number} id - Unique identifier
 * @returns {Object} Question object
 */
function generateSingleQuestion(type, difficulty, id) {
  let text = '';
  let answer = 0;
  
  if (type === 'addition') {
    if (difficulty === 'easy') {
      const a = Math.floor(Math.random() * 29) + 2; // 2 to 30
      const b = Math.floor(Math.random() * 29) + 2; // 2 to 30
      text = `${a} + ${b}`;
      answer = a + b;
    } else if (difficulty === 'medium') {
      const a = Math.floor(Math.random() * 89) + 10; // 10 to 98
      const b = Math.floor(Math.random() * 89) + 10; // 10 to 98
      text = `${a} + ${b}`;
      answer = a + b;
    } else { // hard
      const a = Math.floor(Math.random() * 401) + 100; // 100 to 500
      const b = Math.floor(Math.random() * 401) + 100; // 100 to 500
      text = `${a} + ${b}`;
      answer = a + b;
    }
  } else if (type === 'subtraction') {
    if (difficulty === 'easy') {
      const a = Math.floor(Math.random() * 29) + 10; // 10 to 38
      const b = Math.floor(Math.random() * (a - 2)) + 2; // positive result
      text = `${a} - ${b}`;
      answer = a - b;
    } else if (difficulty === 'medium') {
      const a = Math.floor(Math.random() * 89) + 10; // 10 to 98
      const b = Math.floor(Math.random() * (a - 5)) + 2;
      text = `${a} - ${b}`;
      answer = a - b;
    } else { // hard
      const a = Math.floor(Math.random() * 401) + 100; // 100 to 500
      const b = Math.floor(Math.random() * (a - 10)) + 10;
      text = `${a} - ${b}`;
      answer = a - b;
    }
  } else if (type === 'multiplication') {
    if (difficulty === 'easy') {
      // multiplication by 2, 3, or 5
      const a = Math.floor(Math.random() * 8) + 2; // 2 to 9
      const b = [2, 3, 5][Math.floor(Math.random() * 3)];
      text = `${a} x ${b}`;
      answer = a * b;
    } else if (difficulty === 'medium') {
      const a = Math.floor(Math.random() * 9) + 2; // 2 to 10
      const b = Math.floor(Math.random() * 9) + 2; // 2 to 10
      text = `${a} x ${b}`;
      answer = a * b;
    } else { // hard
      const a = Math.floor(Math.random() * 10) + 11; // 11 to 20
      const b = Math.floor(Math.random() * 11) + 2; // 2 to 12
      text = `${a} x ${b}`;
      answer = a * b;
    }
  } else if (type === 'division') {
    if (difficulty === 'easy') {
      const b = [2, 3, 5][Math.floor(Math.random() * 3)];
      const answerVal = Math.floor(Math.random() * 8) + 2; // 2 to 9
      const a = b * answerVal;
      text = `${a} ÷ ${b}`;
      answer = answerVal;
    } else if (difficulty === 'medium') {
      const b = Math.floor(Math.random() * 9) + 2; // 2 to 10
      const answerVal = Math.floor(Math.random() * 9) + 2; // 2 to 10
      const a = b * answerVal;
      text = `${a} ÷ ${b}`;
      answer = answerVal;
    } else { // hard
      const b = Math.floor(Math.random() * 11) + 2; // 2 to 12
      const answerVal = Math.floor(Math.random() * 10) + 11; // 11 to 20
      const a = b * answerVal;
      text = `${a} ÷ ${b}`;
      answer = answerVal;
    }
  } else if (type === 'power') {
    if (difficulty === 'easy') {
      // squares up to 5
      const a = Math.floor(Math.random() * 4) + 2; // 2 to 5
      text = `${a} ^ 2`;
      answer = a * a;
    } else if (difficulty === 'medium') {
      // squares up to 10
      const a = Math.floor(Math.random() * 9) + 2; // 2 to 10
      text = `${a} ^ 2`;
      answer = a * a;
    } else { // hard
      // squares up to 25 or cubes up to 7
      const isCube = Math.random() > 0.5;
      if (isCube) {
        const a = Math.floor(Math.random() * 6) + 2; // 2 to 7
        text = `${a} ^ 3`;
        answer = a * a * a;
      } else {
        const a = Math.floor(Math.random() * 15) + 11; // 11 to 25
        text = `${a} ^ 2`;
        answer = a * a;
      }
    }
  } else if (type === 'sqrt') {
    if (difficulty === 'easy') {
      // roots of 4, 9, 16, 25
      const roots = [2, 3, 4, 5];
      const answerVal = roots[Math.floor(Math.random() * roots.length)];
      const a = answerVal * answerVal;
      text = `√ ${a}`;
      answer = answerVal;
    } else if (difficulty === 'medium') {
      // roots up to 10
      const answerVal = Math.floor(Math.random() * 9) + 2; // 2 to 10
      const a = answerVal * answerVal;
      text = `√ ${a}`;
      answer = answerVal;
    } else { // hard
      // roots up to 25
      const answerVal = Math.floor(Math.random() * 15) + 11; // 11 to 25
      const a = answerVal * answerVal;
      text = `√ ${a}`;
      answer = answerVal;
    }
  }
  
  const speakText = mathExpressionToIndonesian(text);
  const distractors = generateDistractors(answer);
  
  const options = [
    { value: answer, correct: true },
    ...distractors.map(d => ({ value: d, correct: false }))
  ];
  
  return {
    id,
    text,
    speakText,
    answer,
    options: shuffle(options)
  };
}

export function useQuestionGenerator() {
  /**
   * Generates a list of 10 balanced questions based on difficulty level.
   * @param {string} difficulty - 'easy' | 'medium' | 'hard'
   * @param {Array<string>} selectedOps - Array of active operations ('addition', 'subtraction', etc.)
   * @returns {Array<Object>} List of questions
   */
  const generateQuizQuestions = (
    difficulty = 'medium',
    selectedOps = ['addition', 'subtraction', 'multiplication', 'division', 'power', 'sqrt']
  ) => {
    const ops = selectedOps.length > 0 ? selectedOps : ['addition', 'subtraction', 'multiplication', 'division', 'power', 'sqrt'];
    const questions = [];
    const usedTexts = new Set();
    
    // Balance operations: create a list of operation types to pull from
    let opPool = [];
    for (let i = 0; i < 10; i++) {
      opPool.push(ops[i % ops.length]);
    }
    opPool = shuffle(opPool);
    
    let id = 1;
    for (let i = 0; i < 10; i++) {
      const type = opPool[i];
      let attempts = 0;
      let q = generateSingleQuestion(type, difficulty, id);
      
      // Avoid exact duplicates
      while (usedTexts.has(q.text) && attempts < 20) {
        q = generateSingleQuestion(type, difficulty, id);
        attempts++;
      }
      
      usedTexts.add(q.text);
      questions.push(q);
      id++;
    }
    
    return questions;
  };
  
  return {
    generateQuizQuestions
  };
}
