var gamesPlayed = 0;
var maxMatches = 9;
var matches = 0;
var attempts = 0;
var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClasses = null;
var secondCardClasses = null;
var gameCards = $('#gameCards').addClass("row col-10");
var mainModal = $('#modal').addClass("modal hidden");
var resetButton = $('<button>').text("Reset Game").addClass("reset");

var gameAdmin = {
  deck: [],
  collectedThemes: [],
  spots: $('.card'),
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
  placeCards: function (arr, backTheme) {
    for (var placeIndex = this.deck.length; placeIndex > 0; placeIndex--){
      var spotFinder = this.spots[placeIndex - 1];
      var newClass = this.deck[placeIndex - 1];
      var newFront = $('<div>').addClass(`card-front ${newClass}`);
      var newBack = $('<div>').addClass(`card-back ${backTheme}`);
      $(spotFinder).append(newFront, newBack);
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
      view.clearMainModal();
      view.createModalTitleText();
      document.getElementById('modal-message').textContent = "Congratulations You Have Won!!!"
      $("#modal-content").append(resetButton).on('click', gameAdmin.resetGame);
      view.showMainModal();
    }
  },
  resetGame: function () {
    gameAdmin.removeCards();
    gamesPlayed++;
    view.wipeStats();
    gameAdmin.runGame();
  },
  setUpStart: function () {
    view.showMainModal();
    view.createModalTitleText();
    view.createStartButton();
    handlers.setStartHandler();
    $('#modal-message').text('Welcome to Memory Match');
  },
  runGame: function () {
    this.chooseTheme(view.themes.lfzDeck);
    this.shuffle(this.deck);
    this.placeCards(this.deck);
    handlers.setCardHandlers();
    view.hideMainModal();
  },
  startGame: function () {
    gameAdmin.runGame();
  },
  cheat: function () {
    matches = 9;
    this.checkForWin();
    document.getElementById('modal-message').textContent = "Tsk, Tsk, Tsk...";
  },
};

var handlers = {
  setStartHandler: function () {
    document.getElementById('start-button').addEventListener('click', gameAdmin.startGame);
  },
  setThemeHandlers: function () {

  },
  setCardHandlers: function () {
    gameCards.on('click', this.handleClick);
  },
  removeCardHandlers: function () {
    gameCards.removeEventListener('click', this.handleClick);
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
    lfzBackground: "lfz-back-image",
    lfzCardBack: "lfz-card-back",
    zeldaDeck: [
      "zelda-ganondorf-card",
      "zelda-ganondorf-card",
      "zelda-korok-card",
      "zelda-korok-card",
      "zelda-link-card",
      "zelda-link-card",
      "zelda-midna-card",
      "zelda-midna-card",
      "zelda-moon-card",
      "zelda-moon-card",
      "zelda-princess-card",
      "zelda-princess-card",
      "zelda-sheik-card",
      "zelda-sheik-card",
      "zelda-tingle-card",
      "zelda-tingle-card",
      "zelda-zant-card",
      "zelda-zant-card"
    ],
    zeldaBackground: "zelda-back-image",
    zeldaCardBack: "zelda-card-back",
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
    document.getElementById('accuracy').textContent = '0.0%';
    document.getElementById('games-played').textContent = gamesPlayed;
  },
  createModalTitleText: function () {
    var newTitle = document.createElement('h2');
    newTitle.setAttribute('id', 'modal-message');
    document.getElementById('modal-content').appendChild(newTitle);
  },
  createStartButton: function () {
    var startButton = document.createElement('button');
    startButton.textContent = "Let's Go!";
    startButton.setAttribute('id', 'start-button');
    document.getElementById('modal-content').appendChild(startButton);
  },
  createThemeButtons: function () {
    var themeButtons = document.createElement('button');
    themeButtons.classList.add('theme-button');
    for (var themeButtonIndex = 0; themeButtonIndex < collectedThemes.length; themeButtonIndex++){
      if (themeButtonIndex === 0){
        themeButtons.setAttribute('id', 'lfz-theme-button');
        themeButtons.textContent = 'Learning Fuze';
        document.getElementById('modal-content').appendChild(themeButtons);
      } else if (themeButtonIndex === 1) {
        themeButtons.setAttribute('id', 'zelda-theme-button');
        themeButtons.textContent = 'Legend of Zelda';
        document.getElementById('modal-content').appendChild(themeButtons);
      } else if (themeButtonIndex === 2) {
        themeButtons.setAttribute('id', 'metroid-theme-button');
        themeButtons.textContent = 'Metroid Prime';
        document.getElementById('modal-content').appendChild(themeButtons);
      } else if (themeButtonIndex === 3) {
        themeButtons.setAttribute('id', 'mario-theme-button');
        themeButtons.textContent = 'Super Mario';
        document.getElementById('modal-content').appendChild(themeButtons);
      }
    }
  },
  clearMainModal: function () {
    var modalToWipe = document.getElementById('modal-content');
    while (modalToWipe.firstChild) {
      modalToWipe.removeChild(modalToWipe.firstChild);
    };
  },
  hideMainModal: function () {
    mainModal.addClass("hidden");
  },
  showMainModal: function () {
    mainModal.removeClass("hidden");
  },
};

gameAdmin.setUpStart();
