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
var startButton = $('<button>').attr('id', 'start-button').addClass('start-button').text("Let's Go!");


var gameAdmin = {
  deck: [],
  cardBack: "lfz-card-back",
  theme: "start-back-image",
  spots: $('.card'),
  chooseTheme: function (event) {
    gameAdmin.deck.length = 0;
    var tempDeck = [];
    switch(event.currentTarget.id){
      case 'lfz-theme-button':
        for (var themeIndex = view.themes.lfzDeck.length; themeIndex > 0; themeIndex--) {
          tempDeck.push(view.themes.lfzDeck[themeIndex - 1]);
        };
        gameAdmin.cardBack = "lfz-card-back";
        $('body').removeClass(gameAdmin.theme);
        gameAdmin.theme = "lfz-back-image";
        $('body').addClass(gameAdmin.theme);
        $('#title').text('LFZ Memory Match');
        break;
      case 'zelda-theme-button':
        for (var themeIndex = view.themes.zeldaDeck.length; themeIndex > 0; themeIndex--) {
          tempDeck.push(view.themes.zeldaDeck[themeIndex - 1]);
        };
        gameAdmin.cardBack = "zelda-card-back";
        $('body').removeClass(gameAdmin.theme);
        gameAdmin.theme = "zelda-back-image";
        $('body').addClass(gameAdmin.theme);
        $('#title').text('Zelda Memory Match');
        break;
      case 'metroid-theme-button':
        for (var themeIndex = view.themes.metroidDeck.length; themeIndex > 0; themeIndex--) {
          tempDeck.push(view.themes.metroidDeck[themeIndex - 1]);
        };
        gameAdmin.cardBack = "metroid-card-back";
        $('body').removeClass(gameAdmin.theme);
        gameAdmin.theme = "metroid-back-image";
        $('body').addClass(gameAdmin.theme);
        $('#title').text('Metroid Memory Match');
        break;
      case 'mario-theme-button':
        for (var themeIndex = view.themes.marioDeck.length; themeIndex > 0; themeIndex--) {
          tempDeck.push(view.themes.marioDeck[themeIndex - 1]);
        };
        gameAdmin.cardBack = "mario-card-back";
        $('body').removeClass(gameAdmin.theme);
        gameAdmin.theme = "mario-back-image";
        $('body').addClass(gameAdmin.theme);
        $('#title').text('Mario Memory Match');
        break;
      default:
        break;
    }
    for (var themeIndex = tempDeck.length; themeIndex > 0; themeIndex--){
      gameAdmin.deck.push(tempDeck[themeIndex - 1]);
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
      firstCardClasses = null;
      secondCardClasses = null;
      matches++;
      attempts++;
      view.displayStats();
      this.checkForWin();

    } else {
      handlers.removeCardHandlers();
      attempts++;
      view.displayStats();
      setTimeout(function () {
        firstCardClicked.classList.remove('hidden');
        secondCardClicked.classList.remove('hidden');
        firstCardClicked = null;
        secondCardClicked = null;
        firstCardClasses = null;
        secondCardClasses = null;
        handlers.setCardHandlers();
      }, 1500);
    };
  },
  checkForWin: function () {
    if (matches === maxMatches) {
      gameAdmin.resetGame();
      $(modalContent).empty();
      $(modalContent).append(modalMessage);
      $(modalMessage).text("Congratulations You Have Won!!!");
      $(modalContent).append(startButton)
      $(startButton).on('click', gameAdmin.runGame);
      view.createThemeButtons();
      $(startButton).text("Reset Game");
      $(mainModal).removeClass("hidden");
    }
  },
  resetGame: function () {
    handlers.removeCardHandlers();
    gameAdmin.removeCards();
    if (this.theme === 'lfz-back-image') {
      for (var themeIndex = view.themes.lfzDeck.length; themeIndex > 0; themeIndex--) {
        gameAdmin.deck.push(view.themes.lfzDeck[themeIndex - 1]);
      };
    } else if (this.theme === 'zelda-back-image') {
      for (var themeIndex = view.themes.zeldaDeck.length; themeIndex > 0; themeIndex--) {
        gameAdmin.deck.push(view.themes.zeldaDeck[themeIndex - 1]);
      };
    } else if (this.theme === 'metroid-back-image') {
      for (var themeIndex = view.themes.metroidDeck.length; themeIndex > 0; themeIndex--) {
        gameAdmin.deck.push(view.themes.metroidDeck[themeIndex - 1]);
      };
    } else if (this.theme === 'mario-back-image') {
      for (var themeIndex = view.themes.marioDeck.length; themeIndex > 0; themeIndex--) {
        gameAdmin.deck.push(view.themes.marioDeck[themeIndex - 1]);
      };
    }
    gamesPlayed++;
    view.wipeStats();
  },
  setUpStart: function () {
    for (var themeIndex = view.themes.lfzDeck.length; themeIndex > 0; themeIndex--) {
      gameAdmin.deck.push(view.themes.lfzDeck[themeIndex - 1]);
    };
    $(mainModal).removeClass("hidden");
    $(modalContent).append(modalMessage, startButton);
    $(startButton).on('click', gameAdmin.runGame)
    view.createThemeButtons();
    $('#modal-message').text('Welcome to Memory Match');
  },
  runGame: function () {
    gameAdmin.shuffle(gameAdmin.deck);
    gameAdmin.placeCards(gameAdmin.deck, gameAdmin.cardBack);
    handlers.setCardHandlers()
    $('#accuracy').text('0.00%');
    $(mainModal).addClass("hidden");
  },
  cheat: function () {
    matches = 9;
    this.checkForWin();
    $(modalMessage).text("Tsk, Tsk, Tsk...");
  },
};

var handlers = {
  setCardHandlers: function () {
    $(gameCards).on('click', this.handleClick);
  },
  removeCardHandlers: function () {
    $(gameCards).off('click', this.handleClick);
  },
  handleClick: function (event) {
    if (event.target.className.indexOf('card-back') === -1) {
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
    metroidDeck: [
      "metroid-darksamus-card",
      "metroid-darksamus-card",
      "metroid-kraid-card",
      "metroid-kraid-card",
      "metroid-metroid-card",
      "metroid-metroid-card",
      "metroid-metroidprime-card",
      "metroid-metroidprime-card",
      "metroid-motherbrain-card",
      "metroid-motherbrain-card",
      "metroid-ridley-card",
      "metroid-ridley-card",
      "metroid-samus-card",
      "metroid-samus-card",
      "metroid-samusship-card",
      "metroid-samusship-card",
      "metroid-spacepirate-card",
      "metroid-spacepirate-card"
    ],
    marioDeck: [
      "mario-bowser-card",
      "mario-bowser-card",
      "mario-daisy-card",
      "mario-daisy-card",
      "mario-goomba-card",
      "mario-goomba-card",
      "mario-luigi-card",
      "mario-luigi-card",
      "mario-mario-card",
      "mario-mario-card",
      "mario-peach-card",
      "mario-peach-card",
      "mario-toad-card",
      "mario-toad-card",
      "mario-wario-card",
      "mario-wario-card",
      "mario-yoshi-card",
      "mario-yoshi-card"
    ],
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
    $('#games-played').text(gamesPlayed);
  },
  createThemeButtons: function () {
    var themeButtonContainer = $('<div>').addClass('row')
    $(modalContent).append(themeButtonContainer);
    for (var themeButtonIndex = 0; themeButtonIndex < 4; themeButtonIndex++){
      var themeButton = $('<button>').addClass('theme-button');
      if (themeButtonIndex === 0){
        $(themeButton).attr('id', 'lfz-theme-button').text('Learning Fuze').on('click', gameAdmin.chooseTheme);
        $(themeButtonContainer).append(themeButton);
      } else if (themeButtonIndex === 1) {
        $(themeButton).attr('id', 'zelda-theme-button').text('Legend of Zelda').on('click', gameAdmin.chooseTheme);
        $(themeButtonContainer).append(themeButton);
      } else if (themeButtonIndex === 2) {
        $(themeButton).attr('id', 'metroid-theme-button').text('Metroid Prime').on('click', gameAdmin.chooseTheme);
        $(themeButtonContainer).append(themeButton);
      } else if (themeButtonIndex === 3) {
        $(themeButton).attr('id', 'mario-theme-button').text('Super Mario').on('click', gameAdmin.chooseTheme);
        $(themeButtonContainer).append(themeButton);
      }
    }
  }
};

gameAdmin.setUpStart();
