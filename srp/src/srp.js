function $on(target, type, callback, capture) {
	target.addEventListener(type, callback, !!capture);
}

var srp = function() {

  var classArr = ['circle', 'control']
  var rock = document.createElement('div');
  rock.classList.add('rock', ...classArr);
  rock.setAttribute('val', 'rock');

  var scissor = document.createElement('div');
  scissor.classList.add('scissor', ...classArr);
  scissor.setAttribute('val', 'scissor');

  var paper = document.createElement('div');
  paper.classList.add('paper', ...classArr);
  paper.setAttribute('val', 'paper');

  $on(rock, 'click', game);
  $on(scissor, 'click', game);
  $on(paper, 'click', game);
  var tar;
  function setDisplay(tarEl) {
    // restfunction만 쓰자
    tar = tarEl;
    tar.appendChild(rock);
    tar.appendChild(scissor);
    tar.appendChild(paper);
  }

  function judge(user, c) {
    if(user === c) return 'retry';
    return (user > c )?((user ==2 && c==0)?'user':'com'):
    ((user == 0 && c == 2)? 'com': 'user');
  }

  function result(user, com, result) {
    console.log(user, com, result);

    var resultDisplay = document.createElement('div');
    resultDisplay.classList.add('display', 'absolute');

    var userEl = document.createElement('div');
    userEl.classList.add(user, 'result', 'circle', 'user');
    var comEl = document.createElement('div');
    comEl.classList.add(com, 'result', 'circle', 'com');
    var commnet = document.createElement('h1');
    commnet.textContent = result + ((result !== 'retry')? ' win':'');
    commnet.classList.add('comment', 'text-center');

    $on(resultDisplay, 'click', resultDisplay.remove.bind(resultDisplay));
    resultDisplay.appendChild(userEl);
    resultDisplay.appendChild(comEl);
    resultDisplay.appendChild(commnet);
    tar.appendChild(resultDisplay);

  }

  function game(e) {
    if(!tar) {
      throw Error('not setup display');
    }

    var com = Math.floor(Math.random()*10%3);
    var val = e.target.getAttribute('val');
    const s2n = {
     rock: 0,
     scissor: 1,
     paper: 2,
    }
    const n2s = ['rock', 'scissor', 'paper'];
    result(val, n2s[com], judge(s2n[val], com));
  }


  return {
    setDisplay,
    game
  }
}();

module.exports = srp;
