import { shuffle } from '../utils/shuffle.js';

const SPATIAL_QUESTIONS = {
  easy: [
    {
      id: 'e1',
      text: 'Berapa jumlah kubus pada susunan 3D di bawah ini?',
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
      text: 'Manakah gambar di kanan yang merupakan hasil rotasi 90 derajat searah jarum jam dari bentuk "L" berwarna biru di kiri?',
      svgType: 'rotation-l-shape',
      answer: 'Pilihan B',
      options: [
        { value: 'Pilihan A', correct: false },
        { value: 'Pilihan B', correct: true },
        { value: 'Pilihan C', correct: false },
        { value: 'Pilihan D', correct: false }
      ]
    },
    {
      id: 'e3',
      text: 'Berapa banyak kubus yang menyusun susunan tangga 3D berikut?',
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
      text: 'Berapakah jumlah total kubus pada susunan di bawah ini (perhatikan kubus penyangga yang tersembunyi)?',
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
      text: 'Jika jaring-jaring kubus berwarna di bawah ini dilipat dengan sempurna, pola manakah yang akan terbentuk?',
      svgType: 'cube-net-fold-1',
      answer: 'Pola A',
      options: [
        { value: 'Pola A', correct: true },
        { value: 'Pola B', correct: false },
        { value: 'Pola C', correct: false },
        { value: 'Pola D', correct: false }
      ]
    },
    {
      id: 'm3',
      text: 'Tentukan gambar yang merupakan pencerminan horizontal tepat dari bentuk panah biru di kiri:',
      svgType: 'arrow-reflection',
      answer: 'Pilihan C',
      options: [
        { value: 'Pilihan A', correct: false },
        { value: 'Pilihan B', correct: false },
        { value: 'Pilihan C', correct: true },
        { value: 'Pilihan D', correct: false }
      ]
    }
  ],
  hard: [
    {
      id: 'h1',
      text: 'Berapakah jumlah total kubus penyusun tumpukan piramida bertingkat tiga di bawah ini?',
      svgType: 'cube-pyramid-14',
      answer: '14',
      options: [
        { value: '11', correct: false },
        { value: '12', correct: false },
        { value: '14', correct: true },
        { value: '16', stroke: false }
      ]
    },
    {
      id: 'h2',
      text: 'Di bawah ini adalah jaring-jaring dari prisma segitiga. Jika dilipat menjadi bentuk 3D, manakah sisi yang akan berhimpitan dengan sisi berlabel warna oranye?',
      svgType: 'prism-fold-hard',
      answer: 'Sisi Biru',
      options: [
        { value: 'Sisi Merah', correct: false },
        { value: 'Sisi Biru', correct: true },
        { value: 'Sisi Hijau', correct: false },
        { value: 'Sisi Kuning', correct: false }
      ]
    },
    {
      id: 'h3',
      text: 'Berapakah total kubus pada susunan tumpukan berlubang tengah (donut stack) berikut?',
      svgType: 'cube-stack-donut-12',
      answer: '12',
      options: [
        { value: '10', correct: false },
        { value: '11', correct: false },
        { value: '12', correct: true },
        { value: '14', correct: false }
      ]
    }
  ]
};

export function useSpatialGenerator() {
  const getSpatialQuestions = (difficulty = 'medium') => {
    const list = SPATIAL_QUESTIONS[difficulty] || SPATIAL_QUESTIONS['medium'];
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
