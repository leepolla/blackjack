var playerPositions = [0,0,0,0,0,0];
var countValues = {'a':-1,'2':1,'3':1,'4':1,'5':1,'6':1,'7':0,'8':0,'9':0,'10':-1,'j':-1,'q':-1,'k':-1};
var cardCounts = [{'name':'-1', 'value':0}, {'name': '0', 'value':0}, {'name':'1', 'value':1}]
var player1 = [];
var helperText = [
    'To start off with this demo, the dealer has a 3 showing, and since it is a low card, the count is +1. Click the right arrow below to see the cards the user is dealt.',
    'The user is dealt a 4 and 5, so the count goes up to +3 as they are both low cards. The user decides to "hit" since they have a 0% chance of busting. Click the right arrow below to see the card the player receives when they hit.',
    'Upon hitting, the player receives an 8. The count will remain at +3 since 8 is a neutral card, and since the player has a 17 currently, they decide to stay. Now it is the dealer\'s turn. Click the right arrow below to see the dealer\'s second card.',
    'The dealer\'s other card was a 6, another low card so the count increases to +4. The dealer must hit since the value of their cards is less than 17. Click the right arrow to see which card the dealer receives when they hit.',
    'The dealer gets another 6, pushing the count to +5, and the value of their hand to 15. Since the dealer is not at 17, they must hit. Click the right arrow to see which card the dealer receives when they hit.',
    'The dealer receives a 10. Since 10 is a high card, the count goes down to +4. The value of the dealer\'s hand is now 25, so they bust and the player wins the first hand. Click the right arrow to move on to the second hand.',
    'In the second round, the deck is not re-shuffled, so the count stays at +4.',
    'The dealer is dealt a 5, so the count goes up again to +5. Click the right arrow below to see the cards the user is dealt.',
    'The user is dealt a Jack and a 4, and since it is 1 high card and 1 low card ,the count remains at +5. Since the count is high and the user is at 14, while the dealer has a 5 showing, the wise move is to stay because the chance of drawing a card greater than 7 is high. Click the right arrow below to see the dealer\'s second card.',
    'The dealers other card is a 10, so the count goes down to +4 and the dealer has 15. Since the dealer is not at 17, they must hit. Click the right arrow to see which card the dealer receives when they hit.',
    'The dealer receives a King, bringing their hand value to 25, causing them to bust. The player wins.'
]

var width = 375;
var height = 383;
var margin = {top: 20, right: 15, bottom: 30, left: 40};
var w = width - margin.left - margin.right;
var h = height - margin.top - margin.bottom;

var scriptIndex = 0;
var currentRound = [];
var playerCount = 1;



var rounds = [
[
{"player": 0, "card":3}],
[
{"player": 0, "card":3},
{"player": 1, "card":4},
{"player": 1, "card":5}],
[
{"player": 0, "card":3},
{"player": 1, "card":4},
{"player": 1, "card":5},
{"player": 1, "card":8}
],
[
{"player": 0, "card":3},
{"player": 1, "card":4},
{"player": 1, "card":5},
{"player": 1, "card":8},
{"player": 0, "card":6}
],
[
{"player": 0, "card":3},
{"player": 1, "card":4},
{"player": 1, "card":5},
{"player": 1, "card":8},
{"player": 0, "card":6},
{"player": 0, "card":6}
],[
{"player": 0, "card":3},
{"player": 1, "card":4},
{"player": 1, "card":5},
{"player": 1, "card":8},
{"player": 0, "card":6},
{"player": 0, "card":6},
{"player": 0, "card":10}
],
[],
[
{"player": 0, "card":5}
],    
[
{"player": 0, "card":5},
{"player": 1, "card":"j"},
{"player": 1, "card":4}
],
[
{"player": 0, "card":5},
{"player": 1, "card":"j"},
{"player": 1, "card":4},
{"player": 0, "card":"k"}
],
[
{"player": 0, "card":5},
{"player": 1, "card":"j"},
{"player": 1, "card":4},
{"player": 0, "card":"k"},
{"player": 0, "card":10}

]
]

function back(){
if (scriptIndex > 0) {
scriptIndex -= 1;
update();
getCount();
drawCounts();
}
}

function forward(){
if (scriptIndex < 10) {
scriptIndex += 1;
update();
getCount();
drawCounts();
}
}

d3.select('#controls')
.append('button')
.text("<")
.on('click', back)

d3.select('#controls')
.append('button')
.text(">")
.on('click', forward)







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
svg.attr("width", 500)
.attr("height", 360);


function update(){
document.getElementById('cardArea').innerHTML = "";
playerPositions = [0,0,0,0,0,0];
currentRound = rounds[scriptIndex];
document.getElementById('strategy').innerHTML = helperText[scriptIndex];

var hand = svg.selectAll(".card")
    .data(currentRound)
    .enter().append('g')
    .attr('transform', 'translate(5,5)')
    .attr('class','card');
//hand.exit().remove();            
    hand.transition()
    .duration(100)
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
//hand.exit().remove();
}


var xCount= d3.scaleBand()
      .range([0,w])
      .paddingInner(0.05);

var yCount = d3.scaleLinear()
      .range([h, 0]);

var svgCount = d3.select("#countVis").append("svg")
.attr("width", w + margin.left + margin.right)
.attr("height", h + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svgCount.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + h + ")");
svgCount.append("g")
  .attr("class","y axis");

//populates array of objects that keeps track of counts of different types of cards
function getCount(){
if(scriptIndex > 5) {
    cardCounts = [{'name':'-1', 'value':1}, {'name': '0', 'value':1}, {'name':'1', 'value':5}];

} else {
    cardCounts = [{'name':'-1', 'value':0}, {'name': '0', 'value':0}, {'name':'1', 'value':0}];
}
currHands = rounds[scriptIndex];
currHands.forEach(function(card) {
    card = card.card;
    val = countValues[card];
    val = parseInt(val);
    cardCounts[val+1].value++;
})
console.log(scriptIndex);
// console.log(cardCounts);
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
  drawCounts();



update()
