var width = 750;
var height = 450;
var margin = {top: 20, right: 15, bottom: 30, left: 40};
var w = width - margin.left - margin.right;
var h = height - margin.top - margin.bottom;

var deck = [];
var counts = [];
var dealer = [];
var values = {'a':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'j':10,'q':10,'k':10};
var countValues = {'a':-1,'2':1,'3':1,'4':1,'5':1,'6':1,'7':0,'8':0,'9':0,'10':-1,'j':-1,'q':-1,'k':-1};
var player1 = [];
var discard = [];
var cardCounts = [{'name':'-1', 'value':0}, {'name': '0', 'value':0}, {'name':'1', 'value':0}]
var bustProb = [{'name':'bust', 'value':0}, {'name':'safe', 'value':1}]

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


//populates array of objects that keeps track of counts of different types of cards
function getCount(){
cardCounts = [{'name':'-1', 'value':0}, {'name': '0', 'value':0}, {'name':'1', 'value':0}];
discard.forEach(function(card) {
  val = countValues[card];
  val = parseInt(val);
  cardCounts[val+1].value++;
})
}


var x = d3.scaleBand()
      .range([0,w])
      .paddingInner(0.05);

var y = d3.scaleLinear()
      .range([h, 0]);


var svg = d3.select("#countVis").append("svg")
.attr("width", w + margin.left + margin.right)
.attr("height", h + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + h + ")");
svg.append("g")
  .attr("class","y axis");


counts = [cardCounts[0].value, cardCounts[1].value, cardCounts[2].value]
names = [cardCounts[0].name, cardCounts[1].name, cardCounts[2].name]

function cardSum(){
sum=0;
player1.forEach(function(card){
    sum += values[card]
})
return sum;
}

function probBust() {
    var currSum = cardSum();
    var bustLevel = 21 - currSum;
    var bustCount = 0;
    deck.forEach(function(card) {
        if(values[card] > bustLevel) {
            bustCount++;
        }
    });
    var safeCount = deck.length - bustCount;
    var dangerProb = bustCount / deck.le
    return bustCount;
}

function drawCounts() {
  counts = [cardCounts[0].value, cardCounts[1].value, cardCounts[2].value]
  x.domain(cardCounts.map(function(row) {return row.name}));
  y.domain([0, d3.max(counts)]);

var bars = svg.selectAll(".bar")
  .data(cardCounts)
  
  bars
  .exit()
  .remove();

  var new_bars = bars
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", function(d) {return x(d.name); })
  .attr("width", function(d) {return x.bandwidth();})
  .attr("y", h)
  .attr("height", 0);


  new_bars.merge(bars)
    .transition(1000)
    .attr("x", function(d) {return x(d.name); })
    .attr("y", function(d) { return y(d.value);})
    .attr("height", function(d) {return h - y(d.value);});  
  
  svg.select(".x.axis")
    .transition(1000)
    .call(d3.axisBottom(x));  
  svg.select(".y.axis")
    .transition(1000)
    .call(d3.axisLeft(y));
}
drawCounts();

function drawPlayer(index){
  card = deck[index] 
  deck.splice(deck.indexOf(card), 1);
  discard.push(card);
  player1.push(card)
  getCount();
  drawCounts();
  }
  drawPlayer(2)
  drawPlayer(2)
  
  function drawDealer(index){
  card = deck[index] 
  deck.splice(deck.indexOf(card), 1);
  discard.push(card);
  dealer.push(card);
  getCount();
  drawCounts();
  }
  drawDealer(6)


cardSum();

function drawProbs() {
x.domain(cardCounts.map(function(d) {return d.name}));
y.domain([0, d3.max(counts)]);

var bars = svg.selectAll(".bar")
  .data(cardCounts)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", function(d) {return x(d.name); })
  .attr("width", function(d) {return x.bandwidth();})
  .attr("y", function(d) {return y(d.value)})
  .attr("height", function(d) {return h - y(d.value)})      


svg.select(".y.axis")
  .transition(1000)
  .call(d3.axisLeft(y));
}
drawProbs();


