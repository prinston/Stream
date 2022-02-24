const step = 1;
const base = 100;
const variable = 50;
var acount = 0;
var notifications = [];

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

function check(x) {
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

function update(x) {
  $('body').css('--grad' + x, 'rgb(' + current[x][0] + ', ' + current[x][1] + ', ' + current[x][2] + ')');
}

function sendVoiceMessage(text) {
  if('speechSynthesis' in window) {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.volume = 0.1;
    window.speechSynthesis.speak(msg);
  }
}

function triggerNotification() {
  var info = notifications[0];
  notifications = notifications.splice(1);

  if(info.type == 'donation') {
    $('#icon').attr('href', '../Resources/twitch.svg');
    $('#title').text(info.message[0].name);
    $('#subtitle').text(info.message[0].message);
    sendVoiceMessage(info.message[0].name + ' says ' + info.message[0].message);
  }
  if(info.for == 'twitch_account') {
    $('#icon').attr('href', '../Resources/twitch.svg');
    $('#title').text(info.message[0].name);
    switch(info.type) {
      case 'follow':
        $('#subtitle').text('Thank you for the follow');
        break;
      case 'subscription':
        $('#subtitle').text('[' + info.message[0].months + ' month' + (info.message[0].months==1?'':'s') + '] ' + info.message[0].message);
        break;
      case 'host':
        $('#subtitle').text('Thank you for hosting for ' + info.message[0].viewers + ' viewer' + (parseInt(info.message[0].viewers)==1?'':'s'));
        break;
      case 'raid':
        $('#subtitle').text('We\'re getting raided by ' + info.message[0].name + ' with ' + info.message[0].viewers + ' viewer' + (info.message[0].viewers==1?'':'s'));
        break;
      case 'bits':
        $('#subtitle').text(info.message[0].message);
        let msg = info.message[0].message;
        while(msg.includes('cheer' + info.message[0].amount)) msg = msg.replace('cheer' + info.message[0].amount, 'cheer ' + info.message[0].amount);
        sendVoiceMessage(info.message[0].name + ' says ' + msg);
        break;
    }
  }
  if(info.for == 'youtube_account') {
    $('#icon').attr('href', '../Resources/youtube.svg');
    $('#title').text(info.message[0].name);
    switch(info.type) {
      case 'follow':
        $('#subtitle').text('Subscribed on youtube!');
        break;
      case 'subscription':
        $('#subtitle').text('Became a channel sponsor!');
        break;
      case 'superchat':
        $('#subtitle').text(info.message[0].comment);
        sendVoiceMessage(info.message[0].name + ' says ' + info.message[0].comment);
        break;
    }
  }

  $('#notification').attr('style', 'opacity: 1;');
  $('polygon').each((index) => {
    setTimeout(() => {
      $($('polygon').get(index)).attr('style', 'opacity: 0;');
    }, 50*index);
  });
}

function endNotification() {
  $('circle').each((index) => {
    var x = (Math.random()>0.5?1920:-100) + Math.random()*100;
    var y = (x<0||x>1920?(Math.random()*1281)-100:(Math.random()>0.5?1080:-100) + Math.random()*100);
    x = (y<0||y>1080?(Math.random()*2120)-100:(Math.random()>0.5?1920:-100) + Math.random()*100);
    points[index] = [x, y, (0.5-Math.random())/2, (0.5-Math.random())/2]
  })
  $('#notification').attr('style', 'opacity: 0;');
  $('polygon').each((index) => {
    setTimeout(() => {
      $($('polygon').get(index)).attr('style', 'opacity: 0.05;');
    }, 50*index);
  });
}

var points = [];

function distance(x1, x2) {
  return Math.sqrt((Math.pow(points[x2][0] - points[x1][0], 2)) + (Math.pow(points[x2][1] - points[x1][1], 2)));
}

function produce() {
  var degree = 0;
  setInterval(() => {
    for(var x = 0; x < 5; x++) {
      check(x);
      update(x);
    }
    $('body').css('--degree', degree + 'deg');
    degree++;
    if(degree >= 360) degree = 0;
    if(Math.random() >= 0.75) {

    }
  }, 100);

  $('circle').each((index) => {
    var x = (Math.random()>0.5?1920:-100) + Math.random()*100;
    var y = (x<0||x>1920?(Math.random()*1281)-100:(Math.random()>0.5?1080:-100) + Math.random()*100);
    x = (y<0||y>1080?(Math.random()*2120)-100:(Math.random()>0.5?1920:-100) + Math.random()*100);
    points.push([x, y, (0.5-Math.random())/2, (0.5-Math.random())/2]);
    $($('circle').get(index)).attr('id', index).attr('fill', 'black').attr('r', '5').attr('cx', points[index][0]).attr('cy', points[index][1]);
    $($('polygon').get(index)).attr('id', (index-2<0?$('circle').length+(index-2):index-2) + '' + (index-1<0?$('circle').length+(index-1):index-1) + '' + index).attr('fill', 'black');
  }).promise().done(() => {
    $('#background').attr('mask', 'url(#clip)');

    setInterval(async () => {
      for(var x = 0; x < points.length; x++) {
        points[x][0] += points[x][2];
        points[x][1] += points[x][3];

        if((points[x][0] > 0 && points[x][0] < 1920) || (points[x][0] < -100 || points[x][0] > 2020)) points[x][2] *= -1;
        if((points[x][1] > 0 && points[x][1] < 1080) || (points[x][0] < -100 || points[x][0] > 1180)) points[x][3] *= -1;
      }
      for(var x = 0; x < points.length; x++) {
        $('#' + x).attr('cx', points[x][0]).attr('cy', points[x][1]);
      }
      for(var x = 0; x < points.length; x++) {
        $('#' + (x-2<0?points.length+(x-2):x-2) + '' + (x-1<0?points.length+(x-1):x-1) + '' + x).attr('points', points[(x-2<0?points.length+(x-2):x-2)][0] + ',' + points[(x-2<0?points.length+(x-2):x-2)][1] + ' ' + points[(x-1<0?points.length+(x-1):x-1)][0] + ',' + points[(x-1<0?points.length+(x-1):x-1)][1] + ' ' + points[x][0] + ',' + points[x][1]);
      }
    }, 100);
  });

  const socketToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6IjNDMEU3QzdBQzkzRTAwMEM0RTg1IiwicmVhZF9vbmx5Ijp0cnVlLCJwcmV2ZW50X21hc3RlciI6dHJ1ZSwidHdpdGNoX2lkIjoiMTg1MTg0ODcxIn0.JMG_iKHhynRv0VqvFZUSqAI5XV7i1c9Qp3eWxBm3VqE';
  const streamlabs = io(`https://sockets.streamlabs.com?token=${socketToken}`, {transports: ['websocket']});
  streamlabs.on('event', (eventData) => {
  if(eventData.type == 'donation' || eventData.type == 'follow' || eventData.type == 'subscription' || eventData.type == 'bits' || eventData.type == 'host' || eventData.type == 'raid' || eventData.type == 'superchat') notifications.push(eventData);
  });

  var displayed = false;
  setInterval(() => {
    if(notifications.length > 0 && acount == 0 && !displayed) {
      triggerNotification();
      displayed = true;
    }
    if(displayed) {
      acount ++;
      if(acount == 600){
        displayed = false;
        endNotification();
      }
    } else if(acount > 0) acount --;

  }, 10);
}

document.onreadystatechange = () => {
  if(document.readyState == 'complete') {
    produce();
  }
}
