import { shuffle } from '../utils/shuffle.js';

// Predefined Spatial Questions using custom inline SVGs
const SPATIAL_QUESTIONS = {
  easy: [
    {
      id: 'e1',
      text: 'Berapa jumlah kubus pada susunan 3D di bawah ini?',
      // Stack of 4 cubes: Base of 3, 1 on top
      svgType: 'cube-stack-4',
      answer: '4',
      options: [
        { value: '3', correct: false },
        { value: '4', correct: true },
        { value: '5', correct: false },
        { value: '6', correct: false }
      ]
    },
    {
      id: 'e2',
      text: 'Pilihlah gambar yang merupakan hasil rotasi 90 derajat searah jarum jam dari bentuk "L" asimetris berikut:',
      // Custom shapes
      svgType: 'rotation-l-shape',
      answer: 'B',
      options: [
        { value: 'A', correct: false },
        { value: 'B', correct: true },
        { value: 'C', correct: false },
        { value: 'D', correct: false }
      ]
    },
    {
      id: 'e3',
      text: 'Berapa banyak kubus yang menyusun susunan tangga sederhana berikut?',
      svgType: 'cube-stairs-3',
      answer: '3',
      options: [
        { value: '2', correct: false },
        { value: '3', correct: true },
        { value: '4', correct: false },
        { value: '5', correct: false }
      ]
    }
  ],
  medium: [
    {
      id: 'm1',
      text: 'Berapa jumlah kubus pada tumpukan berikut (perhatikan kubus tersembunyi yang menyokong bagian atas)?',
      // Stack of 8 cubes
      svgType: 'cube-stack-8',
      answer: '8',
      options: [
        { value: '6', correct: false },
        { value: '7', correct: false },
        { value: '8', correct: true },
        { value: '9', correct: false }
      ]
    },
    {
      id: 'm2',
      text: 'Jika jaring-jaring kubus berikut dilipat, pola manakah yang terbentuk?',
      svgType: 'cube-net-fold-1',
      answer: 'A',
      options: [
        { value: 'A', correct: true },
        { value: 'B', correct: false },
        { value: 'C', correct: false },
        { value: 'D', correct: false }
      ]
    },
    {
      id: 'm3',
      text: 'Manakah dari pilihan berikut yang merupakan pencerminan horizontal dari bentuk panah bersirip ini?',
      svgType: 'arrow-reflection',
      answer: 'C',
      options: [
        { value: 'A', correct: false },
        { value: 'B', correct: false },
        { value: 'C', correct: true },
        { value: 'D', correct: false }
      ]
    }
  ],
  hard: [
    {
      id: 'h1',
      text: 'Berapakah total kubus pada susunan piramida bertingkat tiga berikut?',
      // 3x3 bottom (9), 2x2 mid (4), 1x1 top (1) = 14
      svgType: 'cube-pyramid-14',
      answer: '14',
      options: [
        { value: '10', correct: false },
        { value: '12', correct: false },
        { value: '14', correct: true },
        { value: '16', correct: false }
      ]
    },
    {
      id: 'h2',
      text: 'Jaring-jaring 3D manakah yang dapat melipat menjadi bentuk prisma segitiga asimetris berikut?',
      svgType: 'prism-fold-hard',
      answer: 'D',
      options: [
        { value: 'A', correct: false },
        { value: 'B', correct: false },
        { value: 'C', correct: false },
        { value: 'D', correct: true }
      ]
    },
    {
      id: 'h3',
      text: 'Berapakah jumlah kubus pada tumpukan berlubang tengah berikut?',
      svgType: 'cube-stack-donut-12',
      answer: '12',
      options: [
        { value: '10', correct: false },
        { value: '11', correct: false },
        { value: '12', correct: true },
        { value: '13', correct: false }
      ]
    }
  ]
};

export function useSpatialGenerator() {
  const getSpatialQuestions = (difficulty = 'medium') => {
    const list = SPATIAL_QUESTIONS[difficulty] || SPATIAL_QUESTIONS['medium'];
    // Shuffle options for each question
    const processed = list.map(q => {
      return {
        ...q,
        options: shuffle(q.options)
      };
    });
    return shuffle(processed);
  };
  
  return {
    getSpatialQuestions
  };
}
