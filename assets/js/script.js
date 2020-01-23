var gameCards = document.getElementById('gameCards');
var gamesPlayed = 0;
var maxMatches = 9;
var matches = 0;
var attempts = 0;
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
      attempts++;
      displayStats();
      if (matches === maxMatches) {
        document.getElementById('modal').classList.remove('hidden');
      }
    } else {
      attempts++;
      displayStats();
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

function displayStats () {
  document.getElementById('games-played').textContent = gamesPlayed;
  document.getElementById('attempts').textContent = attempts;
  document.getElementById('accuracy').textContent = parseFloat((matches/attempts) * 100).toFixed(2) + '%';
};

var gameAdmin = {
  deck: [],
  spots: document.getElementsByClassName('card'),
  makeDeck: function (){
    var tempDeck = document.getElementsByClassName('card-front');

    for (var currentIndex = tempDeck.length; currentIndex > 0; currentIndex--){
      this.deck.push(tempDeck[currentIndex - 1]);
    };
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
  },
  placeCards: function (arr) {
    this.removeCards();
    for (var placeIndex = this.deck.length; placeIndex > 0; placeIndex--){
      var spotFinder = this.spots[placeIndex - 1];
      var newClass = this.deck[placeIndex - 1];
      var newFront = document.createElement('div');
      newFront.className = newClass;
      var newBack = document.createElement('div');
      newBack.className = 'card-back';
      spotFinder.append(newFront, newBack);
    }
  },
  removeCards: function () {
    for (var spotIndex = this.spots.length; spotIndex > 0; spotIndex--){
      while (this.spots[spotIndex - 1].firstChild) {
        var spotsChildren = this.spots[spotIndex- 1].firstChild;
        this.spots[spotIndex - 1].removeChild(spotsChildren);
      };
    };
  }
};
gameAdmin.makeDeck();
gameAdmin.shuffle(gameAdmin.deck);
gameAdmin.placeCards(gameAdmin.deck);
