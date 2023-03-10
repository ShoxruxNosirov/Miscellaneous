console.log( "\x7A" ); // z
console.log( "\xA9" ); // Â©

console.log( "\u00A9" ); // Â©, the same as \xA9, using the 4-digit hex notation
console.log( "\u044F" ); // Ñ, the Cyrillic alphabet letter
console.log( "\u2191" ); // â, the arrow up symbol

console.log( 'ð³'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
console.log( 'ð'.length ); // 2, FACE WITH TEARS OF JOY
console.log( 'ð©·¶'.length ); // 2, a rare Chinese character

console.log( 'ð³'[0] ); // shows strange symbols...
console.log( 'ð³'[1] ); // ...pieces of the surrogate pair

console.log( 'ð³'.charCodeAt(0).toString(16) ); // d835

// codePointAt is surrogate-pair aware
console.log( 'ð³'.codePointAt(0).toString(16) ); // 1d4b3,

console.log( 'ð³'.charCodeAt(1).toString(16) ); // dcb3
console.log( 'ð³'.codePointAt(1).toString(16) ); // dcb3
// meaningless 2nd half of the pair

console.log( 'hi ð'.slice(0, 4) ); //  hi [?]

console.log( 'S\u0307' ); // SÌ

console.log( 'S\u0307\u0323' ); // SÌÌ£

let s1 = 'S\u0307\u0323'; // SÌÌ£, S + dot above + dot below
let s2 = 'S\u0323\u0307'; // SÌ£Ì, S + dot below + dot above

console.log( `s1: ${s1}, s2: ${s2}` );

console.log( s1 == s2 ); // false

console.log( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true

console.log( "S\u0307\u0323".normalize().length ); // 1

console.log( "S\u0307\u0323".normalize() == "\u1e68" ); // true

