const units = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'];

function convert(n) {
  if (n === 0) return '';
  if (n < 12) return units[n];
  if (n < 20) return units[n - 10] + ' belas';
  if (n < 100) {
    const tens = Math.floor(n / 10);
    const ones = n % 10;
    return (units[tens] || convert(tens)) + ' puluh ' + convert(ones);
  }
  if (n < 200) return 'seratus ' + convert(n - 100);
  if (n < 1000) {
    const hundreds = Math.floor(n / 100);
    const rem = n % 100;
    return convert(hundreds) + ' ratus ' + convert(rem);
  }
  if (n < 2000) return 'seribu ' + convert(n - 1000);
  if (n < 1000000) {
    const thousands = Math.floor(n / 1000);
    const rem = n % 1000;
    return convert(thousands) + ' ribu ' + convert(rem);
  }
  return '';
}

/**
 * Converts a positive or negative integer to Indonesian words.
 * @param {number} n - The integer value.
 * @returns {string} The text representation.
 */
export function numberToWords(n) {
  if (n === 0) return 'nol';
  if (n < 0) return 'minus ' + convert(Math.abs(n));
  return convert(n).replace(/\s+/g, ' ').trim();
}

/**
 * Converts a math expression string like "12 + 4" to "dua belas ditambah empat"
 * @param {string} text - Math expression.
 * @returns {string} The Indonesian text equivalent.
 */
export function mathExpressionToIndonesian(text) {
  const tokens = text.split(/\s+/);
  const result = tokens.map(token => {
    if (/^-?\d+$/.test(token)) {
      return numberToWords(parseInt(token, 10));
    }
    switch (token) {
      case '+': return 'ditambah';
      case '-': return 'dikurangi';
      case 'x':
      case '*': return 'dikali';
      case '÷':
      case '/': return 'dibagi';
      case '√': return 'akar dari';
      case '^': return 'pangkat';
      default: return token;
    }
  }).join(' ');
  return result.charAt(0).toUpperCase() + result.slice(1);
}
