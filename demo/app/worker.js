onmessage = (msg) => {
    let n = msg.data.n;
    let result = fib(n);
    postMessage({ n: n, result: result });
}

function fib(n) {
  if (n < 2) {
    return 1;
  } else {
    return fib(n - 2) + fib(n - 1);
  }
}