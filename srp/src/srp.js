function $on(target, type, callback, capture) {
	target.addEventListener(type, callback, !!capture);
}

var srp = function() {

  function print() {
    console.log('call print in srp');
  }

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

  function setDisplay(tarEl) {
    // restfunction만 쓰자
    tarEl.appendChild(rock);
    tarEl.appendChild(scissor);
    tarEl.appendChild(paper);
  }

  function game(e) {
    var com = Math.floor(Math.random()*10%3);
    switch (e.getAttribute('val')) {
      case 'rock':
      break;
      case 'scissor':
      break;
      case 'paper':
      break;

    };
  }

  return {
    print,
    setDisplay,
    game
  }
}();

module.exports = srp;
