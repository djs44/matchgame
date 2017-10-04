var MatchGame = {};
$('.btn').click(function(){
  window.location.reload(true);
});
/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function() {
  var $game = $('#game');
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
});
/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
var cardsInOrder = [];
for (i=1; i<9; i++) {
  cardsInOrder.push(i, i);
}



var cardValues = [];
while (cardsInOrder.length>0) {
  var x = Math.floor(Math.random() * cardsInOrder.length);
  var y = cardsInOrder[x];
  cardValues.push(y);
  cardsInOrder.splice(x, 1);
}
return cardValues;

};



/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $game.data("beenFlipped", []);
$game.empty();
var colors = ['hsl(25, 85%, 65%)', 'hsl(55, 85%, 65%)', 'hsl(90, 85%, 65%)', 'hsl(160, 85%, 65%)', 'hsl(220, 85%, 65%)', 'hsl(265, 85%, 65%)', 'hsl(310, 85%, 65%)', 'hsl(360, 85%, 65%)'];
for (var valueIndex=0; valueIndex<cardValues.length; valueIndex++) {
  var value = cardValues[valueIndex];
  var color = colors[value - 1];

  var data = {
    value: value,
    flipped: false,
    color: color
  }
    var $card = $("<div class='col-xs-3 card'></div>");
  $card.data(data);
  $game.append($card);
}

$('.card').click(function() {
   MatchGame.flipCard($(this), $game);
 })
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */




MatchGame.flipCard = function($card, $game) {
  if ($card.data('flipped')) {
    return;
  }
 $card.css('background-color', $card.data('color'));
 $card.text($card.data('value'));
 $card.data("flipped", true);

 var flippedCards = $game.data("beenFlipped");
 flippedCards.push($card);

if (flippedCards.length === 2) {
  if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
    flippedCards[0].css('background-color', 'rgb(153, 153, 153)');
    flippedCards[0].css('color', 'rgb(204, 204, 204)');
    flippedCards[1].css('background-color', 'rgb(153, 153, 153)');
    flippedCards[1].css('color', 'rgb(204, 204, 204)');
   }
   else {
     var card1 = flippedCards[0];
     var card2 = flippedCards[1];
     window.setTimeout(function() {
     card1.css('background-color', 'rgb(32, 64, 86)');
     card2.css('background-color', 'rgb(32, 64, 86)');
     card1.text('');
     card2.text('');
     card1.data('flipped', false);
     card2.data('flipped', false);
   }, 400);
 }

    $game.data('beenFlipped', []);
   }



};
