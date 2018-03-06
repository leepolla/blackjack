var playerPositions = [0,0,0,0,0,0];
var scriptIndex = 0;
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
        //hand.exit().remove();
    }
