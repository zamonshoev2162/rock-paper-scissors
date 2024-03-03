openBtn.addEventListener('click', () => modal.showModal());
closeBtn.addEventListener('click', () => modal.close());

modal.addEventListener('click', (e) => {
  const modal = e.currentTarget;
  const isClickOnBackDrop = e.target === modal;
  if (isClickOnBackDrop) modal.close();
});

document.addEventListener('DOMContentLoaded', () => {
  const home = document.querySelector('.home');
  const buttons = document.querySelectorAll('.home__button');
  const gameBlock = document.querySelector('.game-block');
  const playerChoice = document.getElementById('playerChoice');
  const opponentChoice = document.getElementById('opponentChoice');
  const resultsTitle = document.getElementById('resultsTitle');
  const resultsButton = document.querySelector('.game-block__button');
  const scoreValueElement = document.querySelector('.score__value');
  const gameBlockCenter = document.querySelector('.results-block');

  let score = 0;

  const updateChoices = (choice, element, id) => {
    element.innerHTML = choice;
    element.id = id;
  };

  const showElement = (element) => element.classList.remove('hide');

  const hideElement = (element) => element.classList.add('hide');

  const updateScore = (result) => {
    if (result === 'YOU WIN!') {
      score += 1;
    } else if (result === 'YOU LOSE!' && score > 0) {
      score -= 1;
    }
    scoreValueElement.textContent = score;
  };

  const showGameBlockCenter = () => {
    setTimeout(() => showElement(gameBlockCenter), 500);
  };

  const resetChoices = () => {
    playerChoice.classList.remove('win');
    opponentChoice.classList.remove('win');
  };

  const handleButtonClick = function () {
    const choice = this.id;

    updateChoices(this.innerHTML, playerChoice, choice);

    hideElement(home);
    showElement(gameBlock);

    updateChoices('', opponentChoice, '');

    setTimeout(() => {
      const opponentChoices = ['rock', 'paper', 'scissors'];
      const randomOpponentChoice =
        opponentChoices[Math.floor(Math.random() * opponentChoices.length)];

      updateChoices(
        document.getElementById(randomOpponentChoice).innerHTML,
        opponentChoice,
        randomOpponentChoice
      );

      const result = getResult(choice, randomOpponentChoice);

      resultsTitle.textContent = result;
      updateScore(result);

      showGameBlockCenter();
    }, 500);
  };

  buttons.forEach((button) =>
    button.addEventListener('click', handleButtonClick)
  );

  resultsButton.addEventListener('click', () => {
    hideElement(gameBlock);
    showElement(home);
    hideElement(gameBlockCenter);

    resetChoices();
  });

  const getResult = (player, opponent) => {
    if (player === opponent) {
      return 'DRAW';
    } else if (
      (player === 'rock' && opponent === 'scissors') ||
      (player === 'paper' && opponent === 'rock') ||
      (player === 'scissors' && opponent === 'paper')
    ) {
      playerChoice.classList.add('win');
      return 'YOU WIN!';
    } else {
      opponentChoice.classList.add('win');
      return 'YOU LOSE!';
    }
  };
});
