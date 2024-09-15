function f(x) {
  x = "x-" + x;

  //   return function f(y) {
  //     y = "y-" + y;
  //     return function f(z) {
  //       z = "z-" + z;
  //     };
  //   };
}

let g = f("a");
console.log(g);
