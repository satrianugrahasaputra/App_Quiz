import { shuffle } from '../utils/shuffle.js';

const WORD_POOL = [
  'Buku', 'Meja', 'Pena', 'Kopi', 'Awan', 'Pohon', 'Kursi', 'Kucing', 'Susu', 
  'Gelas', 'Atap', 'Sepatu', 'Bunga', 'Air', 'Roti', 'Daun', 'Baju', 'Pintu', 
  'Kunci', 'Lampu', 'Bintang', 'Bulan', 'Matahari', 'Bumi', 'Pasir', 'Laut', 
  'Gunung', 'Sungai', 'Danau', 'Kota', 'Desa', 'Piring', 'Sendok', 'Garpu', 
  'Pisau', 'Handuk', 'Mobil', 'Topi', 'Kertas', 'Pensil'
];

const SUITS = [
  { char: '♥', name: 'Hearts', color: 'text-rose-500' },
  { char: '♦', name: 'Diamonds', color: 'text-rose-500' },
  { char: '♠', name: 'Spades', color: 'text-slate-800 dark:text-slate-200' },
  { char: '♣', name: 'Clubs', color: 'text-slate-800 dark:text-slate-200' }
];

const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export function useMemoryGenerator() {
  const generateMemoryCards = (difficulty = 'medium') => {
    let count = 20;
    if (difficulty === 'easy') {
      count = 10;
    } else if (difficulty === 'medium') {
      count = 20;
    } else { // hard
      count = 30;
    }
    
    // Choose item type randomly: 'cards', 'numbers', 'words'
    const typePool = ['cards', 'numbers', 'words'];
    const itemType = typePool[Math.floor(Math.random() * typePool.length)];
    
    const items = [];
    
    if (itemType === 'words') {
      const shuffledWords = shuffle(WORD_POOL);
      const selected = shuffledWords.slice(0, count);
      selected.forEach((word, idx) => {
        items.push({
          id: `w-${idx}`,
          value: word,
          name: word,
          color: 'text-slate-700 dark:text-slate-200'
        });
      });
    } else if (itemType === 'numbers') {
      const numbers = new Set();
      while (numbers.size < count) {
        // easy/medium double digit, hard triple digit
        const num = difficulty === 'hard'
          ? Math.floor(Math.random() * 900) + 100 // 100 to 999
          : Math.floor(Math.random() * 90) + 10;  // 10 to 99
        numbers.add(num);
      }
      Array.from(numbers).forEach((num, idx) => {
        items.push({
          id: `n-${idx}`,
          value: num,
          name: `${num}`,
          color: 'text-indigo-600 dark:text-indigo-400 font-mono font-black'
        });
      });
    } else { // cards
      const deck = [];
      SUITS.forEach(suit => {
        VALUES.forEach(val => {
          deck.push({
            id: `${val}-${suit.char}`,
            value: val,
            suit: suit.char,
            color: suit.color,
            name: `${val}${suit.char}`
          });
        });
      });
      const shuffledDeck = shuffle(deck);
      const selected = shuffledDeck.slice(0, count);
      selected.forEach(card => {
        items.push(card);
      });
    }
    
    const target = items[Math.floor(Math.random() * items.length)];
    
    return {
      cards: items,
      target,
      itemType
    };
  };
  
  return {
    generateMemoryCards
  };
}
