var View = function (game, $el) {
  this.game = game;
  this.$el = $el;
  this.setupBoard();
  this.bindEvents();
};

View.prototype.bindEvents = function () {
  this.$el.on("click", ".square", function (event) {
    var $makeMoveSquare = $(event.currentTarget);
    this.makeMove($makeMoveSquare);
  }.bind(this));
};

View.prototype.makeMove = function ($square) {
  var currentPlayer = this.game.currentPlayer;

  try {
    this.game.playMove($square.data("pos"));
  }
  catch(error) {
    alert("square is already taken");
  }

  $square.addClass("square-occupied").text(currentPlayer)

  if (this.game.isOver ()) {
    if (this.game.winner ()) {
      alert(this.game.winner() + " has won!")
    } else {
      alert("Everyone loses! Comrade Kim wins again!")
    }

    document.location.reload();
  }

  // if (this.game.winner ()) {
  //   alert(this.game.winner() + " has won!")
  // }
};

View.prototype.setupBoard = function () {
  var $ul = $("<ul>").addClass("grid");

  for (rowIdx = 0; rowIdx < 3; rowIdx++) {
    for (colIdx = 0; colIdx < 3; colIdx++) {
      var $li = $("<li>");
      $li.addClass("square").data("pos", [rowIdx, colIdx]);
      console.log($li.data("pos"));
      $ul.append($li);
    }
  }
  this.$el.append($ul);
};


module.exports = View;
