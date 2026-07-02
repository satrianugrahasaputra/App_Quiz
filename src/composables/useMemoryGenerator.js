import { shuffle } from '../utils/shuffle.js';

const SUITS = [
  { char: '♥', name: 'Hearts', color: 'text-rose-500' },
  { char: '♦', name: 'Diamonds', color: 'text-rose-500' },
  { char: '♠', name: 'Spades', color: 'text-slate-800 dark:text-slate-200' },
  { char: '♣', name: 'Clubs', color: 'text-slate-800 dark:text-slate-200' }
];

const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export function useMemoryGenerator() {
  const generateMemoryCards = (difficulty = 'medium') => {
    let count = 6;
    if (difficulty === 'easy') {
      count = 4;
    } else if (difficulty === 'medium') {
      count = 6;
    } else { // hard
      count = 8;
    }
    
    // Create deck pool
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
    
    // Pick distinct cards
    const shuffledDeck = shuffle(deck);
    const selectedCards = shuffledDeck.slice(0, count);
    
    return {
      cards: selectedCards,
      target: selectedCards[Math.floor(Math.random() * selectedCards.length)]
    };
  };
  
  return {
    generateMemoryCards
  };
}
