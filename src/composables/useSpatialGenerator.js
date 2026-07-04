import { shuffle } from '../utils/shuffle.js';

const SPATIAL_QUESTIONS = {
  easy: [
    // --- cube-stack-4 variations ---
    {
      id: 'e1_1',
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
      id: 'e1_2',
      text: 'Jika kita menambahkan 2 kubus lagi pada susunan 3D di bawah ini, berapakah jumlah total kubus sekarang?',
      svgType: 'cube-stack-4',
      answer: '6',
      options: [
        { value: '5', correct: false },
        { value: '6', correct: true },
        { value: '7', correct: false },
        { value: '8', correct: false }
      ]
    },
    {
      id: 'e1_3',
      text: 'Jika 1 kubus teratas diambil dari susunan 3D di bawah ini, berapakah sisa kubus yang ada?',
      svgType: 'cube-stack-4',
      answer: '3',
      options: [
        { value: '2', correct: false },
        { value: '3', correct: true },
        { value: '4', correct: false },
        { value: '5', correct: false }
      ]
    },
    {
      id: 'e1_4',
      text: 'Jika kita menumpuk satu susunan 3D yang persis sama di atas susunan ini, berapakah jumlah total kubus semuanya?',
      svgType: 'cube-stack-4',
      answer: '8',
      options: [
        { value: '6', correct: false },
        { value: '7', correct: false },
        { value: '8', correct: true },
        { value: '9', correct: false }
      ]
    },
    // --- rotation-l-shape variations ---
    {
      id: 'e2_1',
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
      id: 'e2_2',
      text: 'Berdasarkan bentuk "L" berwarna biru di kiri, manakah pilihan gambar di kanan yang merupakan hasil rotasi 180 derajat?',
      svgType: 'rotation-l-shape',
      answer: 'Pilihan A',
      options: [
        { value: 'Pilihan A', correct: true },
        { value: 'Pilihan B', correct: false },
        { value: 'Pilihan C', correct: false },
        { value: 'Pilihan D', correct: false }
      ]
    },
    {
      id: 'e2_3',
      text: 'Manakah pilihan gambar di kanan yang BUKAN merupakan hasil rotasi sederhana dari bentuk "L" berwarna biru di kiri?',
      svgType: 'rotation-l-shape',
      answer: 'Pilihan D',
      options: [
        { value: 'Pilihan A', correct: false },
        { value: 'Pilihan B', correct: false },
        { value: 'Pilihan C', correct: false },
        { value: 'Pilihan D', correct: true }
      ]
    },
    // --- cube-stairs-3 variations ---
    {
      id: 'e3_1',
      text: 'Berapa banyak kubus yang menyusun susunan tangga 3D berikut?',
      svgType: 'cube-stairs-3',
      answer: '3',
      options: [
        { value: '2', correct: false },
        { value: '3', correct: true },
        { value: '4', correct: false },
        { value: '5', correct: false }
      ]
    },
    {
      id: 'e3_2',
      text: 'Jika tangga 3D ini diperpanjang 1 tingkat lagi ke bawah secara utuh, berapakah jumlah total kubus yang menyusunnya sekarang?',
      svgType: 'cube-stairs-3',
      answer: '6',
      options: [
        { value: '5', correct: false },
        { value: '6', correct: true },
        { value: '7', correct: false },
        { value: '8', correct: false }
      ]
    },
    {
      id: 'e3_3',
      text: 'Jika 1 kubus di posisi paling depan (paling bawah) diambil, berapakah sisa kubus yang ada pada susunan tangga di bawah ini?',
      svgType: 'cube-stairs-3',
      answer: '2',
      options: [
        { value: '1', correct: false },
        { value: '2', correct: true },
        { value: '3', correct: false },
        { value: '4', correct: false }
      ]
    }
  ],
  medium: [
    // --- cube-stack-8 variations ---
    {
      id: 'm1_1',
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
      id: 'm1_2',
      text: 'Berapakah kubus tambahan yang dibutuhkan agar susunan tumpukan di bawah ini menjadi balok padat berukuran 3x3x3?',
      svgType: 'cube-stack-8',
      answer: '19',
      options: [
        { value: '17', correct: false },
        { value: '18', correct: false },
        { value: '19', correct: true },
        { value: '20', correct: false }
      ]
    },
    {
      id: 'm1_3',
      text: 'Jika seluruh kubus pada tingkat teratas (kubus ungu dan biru muda) diambil, berapakah sisa kubus yang ada?',
      svgType: 'cube-stack-8',
      answer: '6',
      options: [
        { value: '4', correct: false },
        { value: '5', correct: false },
        { value: '6', correct: true },
        { value: '7', correct: false }
      ]
    },
    {
      id: 'm1_4',
      text: 'Jika kita menduplikasi tumpukan ini secara horizontal menjadi 2 kali lipatnya, berapakah total kubus keseluruhannya?',
      svgType: 'cube-stack-8',
      answer: '16',
      options: [
        { value: '12', correct: false },
        { value: '14', correct: false },
        { value: '16', correct: true },
        { value: '18', correct: false }
      ]
    },
    // --- cube-net-fold-1 variations ---
    {
      id: 'm2_1',
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
      id: 'm2_2',
      text: 'Ketika jaring-jaring kubus di bawah ini dilipat, sisi Merah dan sisi Hijau adalah sisi yang saling berlawanan. Manakah di antara pilihan berikut yang bukan merupakan lipatan valid karena menaruh sisi Merah berdampingan dengan Hijau?',
      svgType: 'cube-net-fold-1',
      answer: 'Pola B',
      options: [
        { value: 'Pola A', correct: false },
        { value: 'Pola B', correct: true },
        { value: 'Pola C', correct: false },
        { value: 'Pola D', correct: false }
      ]
    },
    {
      id: 'm2_3',
      text: 'Sisi Violet dan sisi Merah pada jaring-jaring di bawah bertetangga. Manakah pola lipatan kubus 3D yang tepat menggambarkan hubungan kedua sisi tersebut?',
      svgType: 'cube-net-fold-1',
      answer: 'Pola A',
      options: [
        { value: 'Pola A', correct: true },
        { value: 'Pola B', correct: false },
        { value: 'Pola C', correct: false },
        { value: 'Pola D', correct: false }
      ]
    },
    // --- arrow-reflection variations ---
    {
      id: 'm3_1',
      text: 'Tentukan gambar yang merupakan pencerminan horizontal tepat dari bentuk panah biru di kiri:',
      svgType: 'arrow-reflection',
      answer: 'Pilihan C',
      options: [
        { value: 'Pilihan A', correct: false },
        { value: 'Pilihan B', correct: false },
        { value: 'Pilihan C', correct: true },
        { value: 'Pilihan D', correct: false }
      ]
    },
    {
      id: 'm3_2',
      text: 'Tentukan gambar yang merupakan pencerminan vertikal tepat (atas-bawah) dari bentuk panah biru di kiri:',
      svgType: 'arrow-reflection',
      answer: 'Pilihan B',
      options: [
        { value: 'Pilihan A', correct: false },
        { value: 'Pilihan B', correct: true },
        { value: 'Pilihan C', correct: false },
        { value: 'Pilihan D', correct: false }
      ]
    },
    {
      id: 'm3_3',
      text: 'Manakah pilihan gambar di kanan yang merupakan hasil rotasi 180 derajat dari bentuk panah biru di kiri?',
      svgType: 'arrow-reflection',
      answer: 'Pilihan A',
      options: [
        { value: 'Pilihan A', correct: true },
        { value: 'Pilihan B', correct: false },
        { value: 'Pilihan C', correct: false },
        { value: 'Pilihan D', correct: false }
      ]
    }
  ],
  hard: [
    // --- cube-pyramid-14 variations ---
    {
      id: 'h1_1',
      text: 'Berapakah jumlah total kubus penyusun tumpukan piramida bertingkat tiga di bawah ini?',
      svgType: 'cube-pyramid-14',
      answer: '14',
      options: [
        { value: '11', correct: false },
        { value: '12', correct: false },
        { value: '14', correct: true },
        { value: '16', correct: false }
      ]
    },
    {
      id: 'h1_2',
      text: 'Berapa banyak kubus yang membentuk dasar (tingkat terbawah) dari susunan piramida 3D di bawah ini?',
      svgType: 'cube-pyramid-14',
      answer: '9',
      options: [
        { value: '6', correct: false },
        { value: '8', correct: false },
        { value: '9', correct: true },
        { value: '12', correct: false }
      ]
    },
    {
      id: 'h1_3',
      text: 'Berapa banyak kubus tambahan yang diperlukan agar susunan piramida bertingkat tiga ini menjadi kubus padat berukuran 3x3x3?',
      svgType: 'cube-pyramid-14',
      answer: '13',
      options: [
        { value: '11', correct: false },
        { value: '12', correct: false },
        { value: '13', correct: true },
        { value: '14', correct: false }
      ]
    },
    {
      id: 'h1_4',
      text: 'Jika kubus paling atas (puncak piramida berwarna merah) diambil, berapakah sisa kubus penyusun tumpukan di bawah ini?',
      svgType: 'cube-pyramid-14',
      answer: '13',
      options: [
        { value: '10', correct: false },
        { value: '12', correct: false },
        { value: '13', correct: true },
        { value: '14', correct: false }
      ]
    },
    // --- prism-fold-hard variations ---
    {
      id: 'h2_1',
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
      id: 'h2_2',
      text: 'Jika jaring-jaring prisma segitiga di bawah ini dilipat, sisi manakah yang akan berhimpitan dengan ujung bebas sisi Kuning?',
      svgType: 'prism-fold-hard',
      answer: 'Sisi Hijau',
      options: [
        { value: 'Sisi Merah', correct: false },
        { value: 'Sisi Biru', correct: false },
        { value: 'Sisi Hijau', correct: true },
        { value: 'Sisi Oranye', correct: false }
      ]
    },
    {
      id: 'h2_3',
      text: 'Sisi berbentuk segitiga manakah yang melipat ke atas untuk menutup bagian atas prisma segitiga tersebut?',
      svgType: 'prism-fold-hard',
      answer: 'Sisi Merah',
      options: [
        { value: 'Sisi Merah', correct: true },
        { value: 'Sisi Biru', correct: false },
        { value: 'Sisi Hijau', correct: false },
        { value: 'Sisi Oranye', correct: false }
      ]
    },
    // --- cube-stack-donut-12 variations ---
    {
      id: 'h3_1',
      text: 'Berapakah total kubus pada susunan tumpukan berlubang tengah (donut stack) berikut?',
      svgType: 'cube-stack-donut-12',
      answer: '12',
      options: [
        { value: '10', correct: false },
        { value: '11', correct: false },
        { value: '12', correct: true },
        { value: '14', correct: false }
      ]
    },
    {
      id: 'h3_2',
      text: 'Jika lubang tengah diisi penuh oleh kubus dari bawah sampai atas, berapakah jumlah total kubus sekarang?',
      svgType: 'cube-stack-donut-12',
      answer: '14',
      options: [
        { value: '13', correct: false },
        { value: '14', correct: true },
        { value: '15', correct: false },
        { value: '16', correct: false }
      ]
    },
    {
      id: 'h3_3',
      text: 'Jika tingkat teratas (donut layer berwarna ungu dan biru muda) dibongkar dan disingkirkan, berapakah sisa kubus yang ada?',
      svgType: 'cube-stack-donut-12',
      answer: '8',
      options: [
        { value: '6', correct: false },
        { value: '8', correct: true },
        { value: '9', correct: false },
        { value: '10', correct: false }
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
    // Shuffle and return all 10 questions to support full variety
    return shuffle(processed);
  };
  
  return {
    getSpatialQuestions
  };
}
