const bigint = 1234567890123456789012345678901234567890n;
const sameBigint = BigInt("1234567890123456789012345678901234567890");
const bigintFromNumber = BigInt(10); // same as 10n

console.log(1n + 2n); // 3
console.log(5n / 2n); // 2

//console.log(1n + 2); // Error: Cannot mix BigInt and other types

let bigint1 = 1n;
let number = 2;

// number to bigint
console.log(bigint1 + BigInt(number)); // 3

// bigint to number
console.log(Number(bigint1) + number); // 3

//console.log( +bigint ); // error

console.log( 2n > 1n ); // true

console.log( 2n > 1 ); // true    

console.log( 1 == 1n ); // true

console.log( 1 === 1n ); // false

console.log( 1 == 1n ); // true

console.log( 1 === 1n ); // false     

