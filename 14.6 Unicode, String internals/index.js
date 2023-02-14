console.log( "\x7A" ); // z
console.log( "\xA9" ); // ©

console.log( "\u00A9" ); // ©, the same as \xA9, using the 4-digit hex notation
console.log( "\u044F" ); // я, the Cyrillic alphabet letter
console.log( "\u2191" ); // ↑, the arrow up symbol

console.log( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
console.log( '😂'.length ); // 2, FACE WITH TEARS OF JOY
console.log( '𩷶'.length ); // 2, a rare Chinese character

console.log( '𝒳'[0] ); // shows strange symbols...
console.log( '𝒳'[1] ); // ...pieces of the surrogate pair

console.log( '𝒳'.charCodeAt(0).toString(16) ); // d835

// codePointAt is surrogate-pair aware
console.log( '𝒳'.codePointAt(0).toString(16) ); // 1d4b3,

console.log( '𝒳'.charCodeAt(1).toString(16) ); // dcb3
console.log( '𝒳'.codePointAt(1).toString(16) ); // dcb3
// meaningless 2nd half of the pair

console.log( 'hi 😂'.slice(0, 4) ); //  hi [?]

console.log( 'S\u0307' ); // Ṡ

console.log( 'S\u0307\u0323' ); // Ṩ

let s1 = 'S\u0307\u0323'; // Ṩ, S + dot above + dot below
let s2 = 'S\u0323\u0307'; // Ṩ, S + dot below + dot above

console.log( `s1: ${s1}, s2: ${s2}` );

console.log( s1 == s2 ); // false

console.log( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true

console.log( "S\u0307\u0323".normalize().length ); // 1

console.log( "S\u0307\u0323".normalize() == "\u1e68" ); // true

