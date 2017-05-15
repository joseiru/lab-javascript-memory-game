// //******************************************************************
// // Game Logic
// //******************************************************************
var MemoryGame = function() {
  this.cards = [
  		{ name: "aquaman",         img: "aquaman.jpg" },
  		{ name: "batman",          img: "batman.jpg" },
  		{ name: "captain america", img: "captain-america.jpg" },
  		{ name: "fantastic four",  img: "fantastic-four.jpg" },
  		{ name: "flash",           img: "flash.jpg" },
      { name: "green arrow",     img: "green-arrow.jpg" },
  		{ name: "green lantern",   img: "green-lantern.jpg" },
  		{ name: "ironman",         img: "ironman.jpg" },
  		{ name: "spiderman",       img: "spiderman.jpg" },
  		{ name: "superman",        img: "superman.jpg" },
  		{ name: "the avengers",    img: "the-avengers.jpg" },
  		{ name: "thor",            img: "thor.jpg" },
      { name: "aquaman",         img: "aquaman.jpg" },
  		{ name: "batman",          img: "batman.jpg" },
  		{ name: "captain america", img: "captain-america.jpg" },
      { name: "fantastic four",  img: "fantastic-four.jpg" },
  		{ name: "flash",           img: "flash.jpg" },
  		{ name: "green arrow",     img: "green-arrow.jpg" },
  		{ name: "green lantern",   img: "green-lantern.jpg" },
  		{ name: "ironman",         img: "ironman.jpg" },
  		{ name: "spiderman",       img: "spiderman.jpg" },
  		{ name: "superman",        img: "superman.jpg" },
  		{ name: "the avengers",    img: "the-avengers.jpg" },
  		{ name: "thor",            img: "thor.jpg" },
  	];
    this.selectedCards = [];
    this.pairsClicked = 0;
    this.correctPairs = 0;
};

// //******************************************************************
// // HTML/CSS Interactions
// //******************************************************************

var memoryGame;

$(document).ready(function(){
  memoryGame = new MemoryGame();
  var html = '';

  memoryGame._shuffleCards();

  memoryGame.cards.forEach(function(pic, index) {
    var sanitizedName = pic.name.split(' ').join('_');

    html += '<div class= "card" id="card_' + sanitizedName + '">';
    html += '<div class="back"';
    html += '    name="img/' + pic.name + '"';
    html += '    id="'       + pic.img +  '">';
    html += '</div>';
    html += '<div class="front" ';
    html += 'style="background: url(img/' + pic.img + '") no-repeat"';
    html += '    id="'       + pic.img +  '">';
    html += '</div>';
    html += '</div>';
  });

  // Add all the divs to the HTML
  document.getElementById('memory_board').innerHTML = html;

  $('.back').click(function() {
    var card = $(this);
    memoryGame.selectCard(card);
   
  });

});

MemoryGame.prototype._shuffleCards = function() {
  this.cards = _.shuffle(memoryGame.cards);
};

MemoryGame.prototype.selectCard = function(card) {
  
  memoryGame.flipCard(card);
  if (this.selectedCards.length == 1) {
    this.selectedCards.push(card);
    if (this.selectedCards[0].attr('id') === this.selectedCards[1].attr('id')) {
      $("h3").text("Acertaste!");
      this.correctPairs++;
      $("#pairs_guessed").html(this.correctPairs);
    } else {
      $("h3").text("Fallaste!");
      memoryGame.flipCard(this.selectedCards[0]);
      memoryGame.flipCard(this.selectedCards[1]);
    }
    this.pairsClicked++;
  
    $("#pairs_clicked").html(this.pairsClicked);
    this.selectedCards = [];
  } else {
    this.selectedCards.push(card);
  }
  memoryGame.finished();
};

MemoryGame.prototype.flipCard = function(card) {
  card.toggleClass("front");
  card.toggleClass("back");
  card.next().toggleClass("front");
  card.next().toggleClass("back");
};

MemoryGame.prototype.finished = function() {
  if (this.correctPairs == 12) {
    $("h3").text("Ganaste! en "+ this.pairsClicked + " intentos. Juega de Nuevo");
    this.pairsClicked = 0;
    this.correctPairs = 0;
    memoryGame.flipAllCards();
  }
};

MemoryGame.prototype.flipAllCards = function() {
  $(".back").each(function(index, card) {
    memoryGame.flipCard($(card));
  });
};


