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

var dealer = [];
var player1 = [];
var playerCount = 1;
var currentRound = [];
var turn = 1;
var deckSize = 1;
var playerPositions = [0,0,0,0,0,0];
var playerHands = [[],[],[],[],[],[]];
var playerValues = [0,0,0,0,0,0];
var end = 0;
var cardCounts = [{'name':'-1', 'value':0}, {'name': '0', 'value':0}, {'name':'1', 'value':0}]
var countValues = {'a':-1,'2':1,'3':1,'4':1,'5':1,'6':1,'7':0,'8':0,'9':0,'10':-1,'j':-1,'q':-1,'k':-1};
var discard = [];

var width = 750;
var height = 450;
var margin = {top: 20, right: 15, bottom: 30, left: 40};
var w = width - margin.left - margin.right;
var h = height - margin.top - margin.bottom;

var xCount = d3.scaleBand()
      .range([0,w])
      .paddingInner(0.05);

var yCount = d3.scaleLinear()
      .range([h, 0]);

      var svgCount = d3.select("#countArea")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
      svgCount.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + h + ")");
      svgCount.append("g")
        .attr("class","y axis");


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
        .data([1,2,3,4,5]) 
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
        .data([1,2,3,4,5]) 
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

d3.select('#controls')
.append('button')
.text("Hit")
.on('click', hit)

d3.select('#controls')
.append('button')
.text("Stay")
.on('click', nextTurn)

function handleTurn(){
    playerSum=0;
    aceCount = 0;
    playerHands[turn].forEach(function(card){
        playerSum += values[card]
        if (card == 'a'){
            aceCount ++;
        }
    })
    if(turn == 0){
        if (playerValues[0].value < 17){
            draw(0);
            handleTurn();
        }else{
            end = 1;
        }
    }else{
        if(playerSum > 21){
            nextTurn();
        }
        else if ((playerSum == 11 && aceCount > 0) || aceCount == 3 || playerSum == 21){
        //blackjack()
            nextTurn();
        }
    }
}
function hit(){
    if (end == 1){
        end = 0
        startRound()
    }
    else if (end == 0){
        draw(turn);
        handleTurn();
    }else{
        end = 1
    }

}

function nextTurn(){
    if (turn == playerCount){
        turn = 0;
    }
    if(turn == 0){
        //startRound()
        handleTurn();
    }else {
        turn++
    }
    
}


function draw(hand){
    if (deck.length < 11){
        shuffle(deckSize) //adjust to global  deck size set by user
    }
    card = deck[Math.floor(Math.random() * deck.length)]

    deck.splice(deck.indexOf(card), 1);
    currentRound.push({"player": hand, 'card':card});
    playerHands[hand].push(card);
    playerValues[hand] = {'index': hand, 'value': cardSum(hand)};
    discard.push(card);
    update();
    //valueUpdate(playerValues);
    return card;
}


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

function playerSumPosition(index){
    x = 420;
    y = 185;
    if(index > 0){
        y = 375;
        x = 150*index - 30; 
    }
    return 'translate('+ x + ',' + y+')';
}

function cardSum(index){
    sum=0;
    aceCount = 0;
    playerHands[index].forEach(function(card){
        sum += values[card]
        if (card == 'a'){
            aceCount ++;
        }
    })
    while(sum < 12 && aceCount > 0){
        sum += 10
        aceCount -= 1
    }
    return sum;
}

var svg = d3.select("#cardArea");
svg.attr("width", 800)
    .attr("height", 500);





function valueUpdate(values){
    var counts = svg.selectAll(".value")
    .data(values)
    .enter().append('g')
    .attr('transform',function(d){return playerSumPosition(d.index);})
    .attr("class", "value");

    
    valueText = counts.append('text')
    .text(function(d) {return d.value;})
    .attr('x',1)
    .attr('y',1);
    counts.exit().remove();
    valueText.exit().remove();
}

function update(){
        var hand = svg.selectAll(".card")
            .data(currentRound)
            .enter().append('g')
            .attr('transform', 'translate(5,5)')
            .attr('class','card');
        //hand.exit().remove();            
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
        getCount();
        drawCounts();
        //hand.exit().remove();
    }

function startRound(){
    currentRound = [];
    document.getElementById('cardArea').innerHTML = "";
    playerHands = [[],[],[],[],[]];
    playerPositions = [0,0,0,0,0,0];
    playerValues = [0,0,0,0,0,0];
    for(var j = 0; j<2;j++){
        for (var i = 0; i <= playerCount;i++){
            if (i != 0 || j != 0){
                draw(i);
            }
        }
    }
    turn = 1;
    handleTurn();
}

startRound();

//populates array of objects that keeps track of counts of different types of cards
function getCount(){
    cardCounts = [{'name':'-1', 'value':0}, {'name': '0', 'value':0}, {'name':'1', 'value':0}];
    discard.forEach(function(card) {
      val = countValues[card];
      val = parseInt(val);
      cardCounts[val+1].value++;
    })
} 





function drawCounts() {
    counts = [cardCounts[0].value, cardCounts[1].value, cardCounts[2].value]
    xCount.domain(cardCounts.map(function(row) {return row.name}));
    yCount.domain([0, d3.max(counts)]);
  
  var bars = svgCount.selectAll(".bar")
    .data(cardCounts)
    
    bars
    .exit()
    .remove();
  
    var new_bars = bars
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {return xCount(d.name); })
    .attr("width", function(d) {return xCount.bandwidth();})
    .attr("y", h)
    .attr("height", 0);
  
  
    new_bars.merge(bars)
      .transition(1000)
      .attr("x", function(d) {return xCount(d.name); })
      .attr("y", function(d) { return yCount(d.value);})
      .attr("height", function(d) {return h - yCount(d.value);});  
    
    svgCount.select(".x.axis")
      .transition(1000)
      .call(d3.axisBottom(xCount));  
    svgCount.select(".y.axis")
      .transition(1000)
      .call(d3.axisLeft(yCount));
}
