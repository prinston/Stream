const step = 1;
const base = 150;
const variable = 55;

var current = [
  [parseInt((Math.random() * variable) + base), parseInt((Math.random() * variable) + base), parseInt((Math.random() * variable) + base)],
  [parseInt((Math.random() * variable) + base), parseInt((Math.random() * variable) + base), parseInt((Math.random() * variable) + base)],
  [parseInt((Math.random() * variable) + base), parseInt((Math.random() * variable) + base), parseInt((Math.random() * variable) + base)],
  [parseInt((Math.random() * variable) + base), parseInt((Math.random() * variable) + base), parseInt((Math.random() * variable) + base)],
  [parseInt((Math.random() * variable) + base), parseInt((Math.random() * variable) + base), parseInt((Math.random() * variable) + base)]
];
var expected = [
  [parseInt((Math.random() * variable) + base), parseInt((Math.random() * variable) + base), parseInt((Math.random() * variable) + base)],
  [parseInt((Math.random() * variable) + base), parseInt((Math.random() * variable) + base), parseInt((Math.random() * variable) + base)],
  [parseInt((Math.random() * variable) + base), parseInt((Math.random() * variable) + base), parseInt((Math.random() * variable) + base)],
  [parseInt((Math.random() * variable) + base), parseInt((Math.random() * variable) + base), parseInt((Math.random() * variable) + base)],
  [parseInt((Math.random() * variable) + base), parseInt((Math.random() * variable) + base), parseInt((Math.random() * variable) + base)]
];

var check = (x) => {
  var c = current[x];
  var e = expected[x];
  if(c[0] != e[0]) {
    if(c[0] < e[0]) {
      if(c[0] + step > e[0]) c[0] = e[0];
      else c[0] += step;
    } else {
      if(c[0] - step < e[0]) c[0] = e[0];
      else c[0] -= step;
    }
  } else {
    if(c[1] != e[1]) {
      if(c[1] < e[1]) {
        if(c[1] + step > e[1]) c[1] = e[1];
        else c[1] += step;
      } else {
        if(c[1] - step < e[1]) c[1] = e[1];
        else c[1] -= step;
      }
    } else {
      if(c[2] != e[2]) {
        if(c[2] < e[2]) {
          if(c[2] + step > e[2]) c[2] = e[2];
          else c[2] += step;
        } else {
          if(c[2] - step < e[2]) c[2] = e[2];
          else c[2] -= step;
        }
      } else {
        expected[x] = [parseInt((Math.random() * variable) + base), parseInt((Math.random() * variable) + base), parseInt((Math.random() * variable) + base)];
      }
    }
  }

  current[x] = c;
}

var update = (x) => {
  $('body').css('--grad' + x, 'rgb(' + current[x][0] + ', ' + current[x][1] + ', ' + current[x][2] + ')');
}

var produce = () => {
  var degree = 0;
  setInterval(() => {
    for(var x = 0; x < 5; x++) {
      check(x);
      update(x);
    }
    $('body').css('--degree', degree + 'deg');
    degree++;
    if(degree >= 360) degree = 0;
  }, 100);
}

document.onreadystatechange = () => {
  if(document.readyState == 'complete') {
    produce();
  }
}
