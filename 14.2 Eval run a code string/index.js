let code = 'console.log("Hello")';
eval(code); // Hello 

let value = eval('1+1');
console.log(value); // 2

value = eval('let i = 0; ++i');
console.log(value); // 1

let a = 1;
function f1() {
  let a = 2;
  eval('console.log(a)'); // 2
}
f1();

let x = 5;
eval("x = 10");
console.log(x); // 10, value modified

let f = new Function('a', 'console.log(a)');
f(5); // 5