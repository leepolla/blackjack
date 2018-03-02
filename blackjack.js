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
var playerCount = 1;
var currentRound = [];
var turn = 'player1';
var deckSize = 1;

//Add Controls

var groupControls = d3.select('#controls')
        .append('div')
        .attr('id', 'controller')

    d3.select('#' + 'controller')
        .append('span')
        .text('Number of Players: ')

    var selectPlayers= d3.select('#controller')
        .append('select')
        .attr('id','selectPlayers')  
        .on('change',changePlayers);

    
    var optionsPlayers = selectPlayers
      .selectAll('option')
        .data([1,2,3,4,5]) //  Saw this unique value extraction at https://stackoverflow.com/questions/28572015/how-to-select-unique-values-in-d3-js-from-data
        .enter()
        .append('option')
        .text(function (d) { return d; });
    document.querySelector('#selectPlayers').selectedIndex = 0;


    d3.select('#' + 'controller')
        .append('span')
        .text('Number of Decks: ')

    var selectDecks= d3.select('#controller')
        .append('select')
        .attr('id','selectDecks')  
        .on('change',changeDecks);

    
    var optionsDecks = selectDecks
      .selectAll('option')
        .data([1,2,3,4,5]) //  Saw this unique value extraction at https://stackoverflow.com/questions/28572015/how-to-select-unique-values-in-d3-js-from-data
        .enter()
        .append('option')
        .text(function (d) { return d; });
    document.querySelector('#selectDecks').selectedIndex = 0;

function changePlayers(){
    playerCount = d3.select('#selectPlayers').property('value')
    startRound();
}

function changeDecks(){
    deckSize = d3.select('#selectDecks').property('value')
    shuffle(deckSize);
    startRound();
}

function draw(hand){
    
    if (deck.length < 11){
        shuffle(deckSize) //adjust to global  deck size set by user
    }
    card = deck[Math.floor(Math.random() * deck.length)]
    
    deck.splice(deck.indexOf(card), 1);
    currentRound.push({"player": hand, 'card':card});
    update();
    return card
}
var playerPositions = [0,0];


function handPosition(handIndex){
    x = 400;
    y = 10;
    if(handIndex > 0){
        y = 200;
        x = 150*handIndex - 40; 
    }
    x -= playerPositions[handIndex] * 23;
    playerPositions[handIndex] += 1;
    return 'translate('+ x + ',' + y+')';
}

function playerTitlePosition(index){
    x = 420;
    y = 160;
    if(index > 0){
        y = 350;
        x = 150*index - 30; 
    }
    return 'translate('+ x + ',' + y+')';
}

function playerName(index){
    if (index){
        return "player " + index;
    }else{
        return "dealer";
    }
}

var svg = d3.select("#cardArea");
svg.attr("width", 800)
    .attr("height", 500);
function update(){
    
        var hand = svg.selectAll("g")
            .data(currentRound)
            .enter().append('g')
            .attr('transform', 'translate(5,5)');
        hand.exit().remove();            
            hand.transition()
            .duration(3000)
            .attr('transform', function(d){return handPosition(d.player)})
            .attr("class", "card");

        hand
            .append('rect')
            .attr("x", function(d){return 10}) //Not really necessary
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

        for(var i = 0; i<= playerCount; i++){
            svg.append('text')
            .attr('transform',function(d){return playerTitlePosition(i);})
            .text(function(d) {return playerName(i);});
        }
    }

function startRound(){
    currentRound = [];
    document.getElementById('cardArea').innerHTML = "";
    playerPositions = [0,0,0,0,0,0]
    for(var j = 0; j<2;j++){
        for (var i = 0; i <= playerCount;i++){
            draw(i);
        }
    }
}

startRound();
