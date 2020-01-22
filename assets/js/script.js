var gameCards = document.getElementById('gameCards');
var maxMatches = 9;
var matches = 0;
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
      matches++;
      if (matches === maxMatches) {
        document.getElementById('modal').classList.remove('hidden');
      }
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

var gameAdmin = {
  deck: [],
  makeDeck: function (){
    var tempDeck = document.getElementsByClassName('card-front');

    for (var currentIndex = tempDeck.length; currentIndex > 0; currentIndex--){
      this.deck.push(tempDeck[currentIndex - 1]);
    };
    console.log(this.deck);
  },
  shuffle: function (arr){
    var currentIndex = arr.length, tempVal, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      this.deck.push(arr[randomIndex].className)
      tempVal = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = tempVal;
      arr.splice(currentIndex, 1);
    }
    console.log(this.deck);
  },
  placeCards: function (arr) {
    return;
  }
};
gameAdmin.makeDeck();
gameAdmin.shuffle(gameAdmin.deck);
