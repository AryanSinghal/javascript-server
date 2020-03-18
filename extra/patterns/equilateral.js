function equilateral(n) {
  for (let i = 0; i < n; i++) {
    let str = '';
    for (let k = 0; k < n - i - 1; k++) {
      str = str + ' ';
    }
    for (let j = 0; j <= i; j++) {

      str = str + '* ';
    }
    console.log(str);
  }
}

export default equilateral;
