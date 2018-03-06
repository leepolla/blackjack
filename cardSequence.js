var playerPositions = [0,0,0,0,0,0];
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
        update()
    }
}

function forward(){
    if (scriptIndex < 10) {
        scriptIndex += 1;
        update()
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
svg.attr("width", 800)
    .attr("height", 500);


function update(){
    document.getElementById('cardArea').innerHTML = "";
    playerPositions = [0,0,0,0,0,0];
        currentRound = rounds[scriptIndex];

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

update()
