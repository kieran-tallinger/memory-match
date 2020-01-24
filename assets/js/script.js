var gamesPlayed = 0;
var maxMatches = 9;
var matches = 0;
var attempts = 0;
var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var gameCards = document.getElementById('gameCards');
var resetButtons = document.getElementsByClassName('reset');

var gameAdmin = {
  deck: [],
  spots: document.getElementsByClassName('card'),
  chooseTheme: function (arr) {
    this.deck.length = 0;
    for (var themeIndex = arr.length; themeIndex > 0; themeIndex--){
      this.deck.push(arr[themeIndex - 1]);
    };
  },
  shuffle: function (arr){
    var currentIndex = arr.length, tempVal, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      this.deck.push(arr[randomIndex].className);
      tempVal = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = tempVal;
      arr.pop(currentIndex, 1);
    };
  },
  placeCards: function (arr) {
    for (var placeIndex = this.deck.length; placeIndex > 0; placeIndex--){
      var spotFinder = this.spots[placeIndex - 1];
      var newClass = this.deck[placeIndex - 1];
      var newFront = document.createElement('div');
      newFront.className = "card-front " + newClass;
      var newBack = document.createElement('div');
      newBack.className = 'lfz-card-back';
      spotFinder.append(newFront, newBack);
    };
  },
  removeCards: function () {
    this.deck.length = 0;
    for (var spotIndex = this.spots.length; spotIndex > 0; spotIndex--){
      while (this.spots[spotIndex - 1].firstChild) {
        var spotsChildren = this.spots[spotIndex- 1].firstChild;
        this.spots[spotIndex - 1].removeChild(spotsChildren);
      };
    };
  },
  checkCards: function () {
    if (firstCardClasses === secondCardClasses) {
      handlers.setCardHandlers();
      firstCardClicked = null;
      secondCardClicked = null;
      matches++;
      attempts++;
      view.displayStats();
      this.checkForWin();
    } else {
      attempts++;
      view.displayStats();
      setTimeout(function () {
        firstCardClicked.classList.remove('hidden');
        secondCardClicked.classList.remove('hidden');
        firstCardClicked = null;
        secondCardClicked = null;
        handlers.setCardHandlers();
      }, 1500);
    };
  },
  checkForWin: function () {
    if (matches === maxMatches) {
      view.showEndGameModal();
    }
  },
  resetGame: function () {
    gameAdmin.removeCards();
    gamesPlayed++;
    document.getElementById('win-message').textContent = "Congratulations You Have Won!!!"
    view.wipeStats();
    view.hideEndGameModal();
    gameAdmin.runGame();
  },
  runGame: function () {
    this.chooseTheme(view.themes.lfzDeck);
    this.shuffle(this.deck);
    this.placeCards(this.deck);
    handlers.setCardHandlers();
  },
  cheat: function () {
    matches = 9;
    document.getElementById('win-message').textContent = "Tsk, Tsk, Tsk...";
    this.checkForWin();
  },
};

var handlers = {
  setCardHandlers: function () {
    gameCards.addEventListener('click', this.handleClick);
  },
  removeCardHandlers: function () {
    gameCards.removeEventListener('click', this.handleClick);
  },
  setResetHandler: function () {
    for (var resetIndex = resetButtons.length; resetIndex > 0; resetIndex--){
      resetButtons[resetIndex - 1].addEventListener('click', gameAdmin.resetGame);
    };
  },
  handleClick: function (event) {
    if (event.target.className.indexOf('lfz-card-back') === -1){
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
      handlers.removeCardHandlers();
      gameAdmin.checkCards();
      };
  },
}

var view = {
  themes: {
    lfzDeck: [
      "js-logo",
      "js-logo",
      "html-logo",
      "html-logo",
      "css-logo",
      "css-logo",
      "git-logo",
      "git-logo",
      "docker-logo",
      "docker-logo",
      "node-logo",
      "node-logo",
      "php-logo",
      "php-logo",
      "sql-logo",
      "sql-logo",
      "react-logo",
      "react-logo"
    ],
    zeldaDeck: [],
    metroidDeck: [],
    marioDeck: [],
  },
  displayStats: function () {
    document.getElementById('games-played').textContent = gamesPlayed;
    document.getElementById('attempts').textContent = attempts;
    document.getElementById('accuracy').textContent = parseFloat((matches / attempts) * 100).toFixed(2) + '%';
  },
  wipeStats: function () {
    matches = 0;
    attempts = 0;
    document.getElementById('attempts').textContent = attempts;
    // Below needed due to strange NaN return when using displayStats method upon game reset
    document.getElementById('accuracy').textContent = '0.0%';
    document.getElementById('games-played').textContent = gamesPlayed;
  },
  hideEndGameModal: function () {
    document.getElementById('modal').classList.add('hidden');
  },
  showEndGameModal: function () {
    document.getElementById('modal').classList.remove('hidden');
    handlers.setResetHandler();
  },
};

gameAdmin.runGame();
console.log(gameAdmin.deck)
