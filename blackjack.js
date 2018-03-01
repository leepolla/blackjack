var deck = [];
var values = {'a':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'j':10,'q':10,'k':10};

function shuffle(decks){
    deck = [];
    for (i=0; i<(decks*4);i++){
        Object.keys(values).forEach(function(card){
            deck.push(card);
        });
    }
}
shuffle(1);
console.log(deck);

var dealer = [];
var player1 = [];
var turn = 'player1';
var deckSize = 1;

function draw(hand){
    
    if (deck.length < 11){
        shuffle(deckSize) //adjust to global  deck size set by user
    }
    card = deck[Math.floor(Math.random() * deck.length)]
    
    deck.splice(deck.indexOf(card), 1);
    hand.push(card);
    update();
}

var svg = d3.select("#cardArea");
svg.attr("width", 700)
    .attr("height", 500);
function update(){
var p1Hand = svg.selectAll("rect")
    .data(player1)
    .enter()
    .append('rect')
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 70)
    .attr("height", 150)
    .attr("class", "card")
    .attr("text", function(d){return d;});
}
player1.push(draw(player1))