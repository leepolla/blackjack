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
var currentRound = [];
var turn = 'player1';
var deckSize = 1;

function draw(hand){
    
    if (deck.length < 11){
        shuffle(deckSize) //adjust to global  deck size set by user
    }
    card = deck[Math.floor(Math.random() * deck.length)]
    
    deck.splice(deck.indexOf(card), 1);
    currentRound.push({"player": hand, 'card':card});
    update();
}
var playerPositions = [0,0];
function handPosition(handIndex){
    x = 400;
    y = 10;
    if(handIndex > 0){
        y = 200;
        x = 50 + 130*handIndex; 
    }
    x -= playerPositions[handIndex] * 23;
    playerPositions[handIndex] += 1;
    return 'translate('+ x + ',' + y+')';
}

var svg = d3.select("#cardArea");
svg.attr("width", 700)
    .attr("height", 500);
function update(){
    
        var hand = svg.selectAll("g")
            .data(currentRound)
            .enter().append('g')
            .attr('transform', function(d){return handPosition(d.player)})
            .attr("class", "card");
        hand.exit().remove();
        hand
            .append('rect')
            .attr("x", function(d){return 10})
            .attr("y", function(d){return 10})
            .attr("width", 70)
            .attr("height", 120)
            .attr("class", "card-body")
            .attr("fill", d3.rgb(255,255,255))
            .attr('stroke-width', 2)
            .attr('stroke',d3.rgb(0,0,0));

        hand.append("text")
            .attr('y', 25)
            .attr('x', 64)
            .attr("class", 'card-value')
            .text( function(d){return d.card;});
    }

function startRound(){
    currentRound = [];
    document.getElementById('cardArea').innerHTML = "";
    playerPositions = [0,0]
    draw(1);
    draw(0);
    draw(1);
    draw(0);
}

startRound();
