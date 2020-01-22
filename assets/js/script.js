var gameCards = document.getElementById('gameCards');
var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;

gameCards.addEventListener('click', handleClick);

function handleClick(event) {
  if (event.target.className.indexOf('card-back') === -1){
    return;
  }
  if (!firstCardClicked) {
    firstCardClicked = event.target;
    firstCardClicked.className += ' hidden';
    firstCardClasses = firstCardClicked.previousElementSibling.className;
  } else {
    secondCardClicked = event.target;
    secondCardClicked.className += ' hidden';
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    gameCards.removeEventListener('click', handleClick);
    if (firstCardClasses === secondCardClasses){
      gameCards.addEventListener('click', handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
    } else {
      setTimeout(function () {
          firstCardClicked.classList.remove('hidden');
          secondCardClicked.classList.remove('hidden');
          firstCardClicked = null;
          secondCardClicked = null;
          gameCards.addEventListener('click', handleClick);
      }, 1500);
    };
  };
};
