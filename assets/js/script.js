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
var modalContent = $('#modal-content').addClass('modal-content');
var modalMessage = $('<h2>').attr('id', 'modal-message');
var startButton = $('<button>').attr('id', 'start-button').text("Let's Go!");


var gameAdmin = {
  deck: [],
  cardBack: null,
  theme: null,
  spots: $('.card'),
  chooseTheme: function (event) {
    this.deck.length = 0;
    var tempDeck = [];
    console.log(event)
    switch(event.target.id){
      case 'lfz-theme-button':
        for (var themeIndex = view.themes.lfzDeck.length; themeIndex > 0; themeIndex--) {
          this.tempDeck.push(view.themes.lfzDeck[themeIndex - 1]);
        };
        this.cardBack = "lfz-card-back";
        this.theme = "lfz-back-image";
        break;
      case 'zelda-theme-button':
        for (var themeIndex = view.themes.zeldaDeck.length; themeIndex > 0; themeIndex--) {
          this.tempDeck.push(view.themes.zeldaDeck[themeIndex - 1]);
        };
        this.cardBack = "zelda-card-back";
        this.theme = "zelda-back-image";
        break;
      case 'metroid-theme-button':
        for (var themeIndex = view.themes.metroidDeck.length; themeIndex > 0; themeIndex--) {
          this.tempDeck.push(view.themes.metroidDeck[themeIndex - 1]);
        };
        this.cardBack = "metroid-card-back";
        this.theme = "metroid-back-image";
        break;
      case 'mario-theme-button':
        for (var themeIndex = view.themes.marioDeck.length; themeIndex > 0; themeIndex--) {
          this.tempDeck.push(view.themes.marioDeck[themeIndex - 1]);
        };
        this.cardBack = "mario-card-back";
        this.theme = "mario-back-image";
        break;
      default:
        break;
    }
    for (var themeIndex = tempDeck.length; themeIndex > 0; themeIndex--){
      this.deck.push(tempDeck[themeIndex - 1]);
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
      var spot = this.spots[spotIndex - 1];
      $(spot).empty();
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
      $(modalContent).empty();
      $(modalContent).append(modalMessage);
      $(modalMessage).text("Congratulations You Have Won!!!");
      $(modalContent).append(startButton).on('click', gameAdmin.resetGame);
      $(startButton).text("Reset Game");
      $(mainModal).removeClass("hidden");
    }
  },
  resetGame: function () {
    gameAdmin.removeCards();
    gamesPlayed++;
    view.wipeStats();
    gameAdmin.runGame();
  },
  setUpStart: function () {
    $(mainModal).removeClass("hidden");
    $(modalContent).append(modalMessage, startButton);
    $(startButton).on('click', gameAdmin.startGame)
    $('#modal-message').text('Welcome to Memory Match');
  },
  runGame: function () {
    this.chooseTheme(view.themes.lfzDeck);
    this.shuffle(this.deck);
    this.placeCards(this.deck);
    handlers.setCardHandlers();
    $(mainModal).addClass("hidden");
  },
  startGame: function () {
    gameAdmin.runGame();
  },
  cheat: function () {
    matches = 9;
    this.checkForWin();
    $(modalMessage).text("Tsk, Tsk, Tsk...");
  },
};

var handlers = {
  setThemeHandlers: function () {

  },
  setCardHandlers: function () {
    $(gameCards).on('click', this.handleClick);
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
      $(gameCards).off('click', this.handleClick)
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
    metroidDeck: [],
    marioDeck: [],
  },
  displayStats: function () {
    $('#games-played').text(gamesPlayed);
    $('#attempts').text(attempts);
    $('#accuracy').text(`${parseFloat((matches / attempts) * 100).toFixed(2) + '%'}`);
  },
  wipeStats: function () {
    matches = 0;
    attempts = 0;
    $('#attempts').text(attempts);
    $('#accuracy').text('0.0%');
    $('#games-played').text(gamesPlayed);
  },
  createThemeButtons: function () {
    for (var themeButtonIndex = 0; themeButtonIndex < 4; themeButtonIndex++){
      var themeButton = $('<button>').addClass('theme-button');
      if (themeButtonIndex === 0){
        $(themeButton).attr('id', 'lfz-theme-button').text('Learning Fuze');
        $('#modal-content').append(themeButton);
      } else if (themeButtonIndex === 1) {
        $(themeButton).attr('id', 'zelda-theme-button').text('Legend of Zelda');
        $('#modal-content').append(themeButton);
      } else if (themeButtonIndex === 2) {
        $(themeButton).attr('id', 'metroid-theme-button').text('Metroid Prime');
        $('#modal-content').append(themeButton);
      } else if (themeButtonIndex === 3) {
        $(themeButton).attr('id', 'mario-theme-button').text('Super Mario');
        $('#modal-content').append(themeButton);
      }
    }
  }
};

gameAdmin.setUpStart();
