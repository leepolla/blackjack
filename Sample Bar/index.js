var width = 750;
var height = 450;
var margin = {top: 20, right: 15, bottom: 30, left: 40};
var w = width - margin.left - margin.right;
var h = height - margin.top - margin.bottom;

var tooltip = d3.select("body").select("#visualization").append("div")
.attr("class", "tooltip")
.style("opacity", 1)
.style("position", "absolute");

var x = d3.scaleBand()
        .range([0,w])
        .paddingInner(0.05);

var y = d3.scaleLinear()
        .range([h, 0]);

var colorScale = d3.scaleQuantile()
    .range(["#CD7F32", "#C0C0C0", "#FFD700"]);

var svg = d3.select("body").append("svg")
.attr("width", w + margin.left + margin.right)
.attr("height", h + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var dataset;

d3.csv("winter_medals2.csv", function(error, winter) {
  //read in the data
  if (error) throw error;

  winter.forEach(function(d) {
    d.Year = +d.Year;
    d.MedalCount = +d.MedalCount;
  });

    dataset = winter;
    drawVis(dataset, 1994);
});

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + h + ")");
svg.append("g")
    .attr("class","y axis");

function drawVis(dataset, year) {
  dataset = dataset.filter(function(d){return d.Year==year;});
  console.log(dataset)

   x.domain(dataset.map(function(d) {return d.Country;}));
   y.domain([0, d3.max(dataset, function(d){return d.MedalCount;})]);
   colorScale.domain([0, d3.max(dataset, function(d){return d.MedalCount;})]);

  var bars = svg.selectAll(".bar")
    .data(dataset)

  bars
    .exit()
    .remove();
  var new_bars = bars
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {return x(d.Country); })
    .attr("width", function(d) {return x.bandwidth();})
    .attr("y", h)
    .attr("height", 0)
    .on("mouseover", function(d){
      tooltip.style("opacity", 0.9);
      tooltip.html("Country: " + d.Country + "<br/>Medals: " + d.MedalCount)
      .style("left", (d3.event.pageX) + "px")
      .style("top", ((d3.event.pageY) - 28) + "px");
      })
    .on("mouseout", function(d) {
      tooltip.style("opacity", 0);
    })

    new_bars.merge(bars)
      .transition(1000)
    .attr("x", function(d) {return x(d.Country); })
    .attr("width", function(d) {
      return x.bandwidth();
    })
    .attr("fill", function(d) {
        return colorScale(d.MedalCount);
      })
     .attr("y", function(d) { 
        return y(d.MedalCount);
      })
      .attr("height", function(d) { return (h - y(d.MedalCount)); 
      });
      


  svg.select(".x.axis")
    .transition(1000)
    .call(d3.axisBottom(x));
  svg.select(".y.axis")
    .transition(1000)
    .call(d3.axisLeft(y));
}

var slider = d3.select("#olympic");
slider.on("change", function() {
  console.log(this.value);
  drawVis(dataset, this.value);
});

 