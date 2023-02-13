
x = 1;
{
  let x = 5;
  window.eval('console.log(x)'); // 1 (global variable)
}

// eval("let y = 5; function f() {}");
// console.log(typeof y);