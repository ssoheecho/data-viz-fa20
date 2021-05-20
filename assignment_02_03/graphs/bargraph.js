// basic method with d3 is to select an element and append to it
// since we don't have anything in the body yet,
// we're going to select the body and append our svg element
// and save it in a variable
const svg = d3.select("body").append("svg")
.attr("height", "100%") // the svg element comes in a default, so we are going to change the size here
.attr("width", "100%") // setting the height & weight to be at 100%

var nameData = [];

d3.csv("data/cereal.csv").then(function(data) {
  data.forEach(d => (nameData.push(d.name)))
  //console.log(nameData)

   // scales:
  let height = 300;

  let margin = {
                left: [50, 55],
                right: 50,
                top: 100,
                bottom: 0 
              }

  // axis
  let y = d3.scaleLinear()
            .domain([0, 160])
            .range([height, 0]);

  let yAxis = d3.axisLeft(y).tickPadding(10);

  let tooltip = d3.select("body")
                  .append("div")
                  .style("position", "absolute")
                  .style("z-index", "10")
                  .style("visibility", "hidden")
                  .style("color", "white")
                  .style("background-color", "gray")
                  .style("border-radius", "5px")
                  .style("padding", "5px")
                  .style('font-size', '.75em')
                  .text("a simple tooltip");
  
  let chartGroup = svg.append("g").attr("transform", "translate("+margin.left[1]+", "+margin.top+")");

  chartGroup.selectAll("rect") // rect doesn't exist yet
    .data(data) // binding data
    .enter() // where all the data that wasn't bound properly go into
    .append("rect") // creating/appending our rectangles
    .attr("height", (d) => height - y(parseInt(d.calories))) // binding data to make dynamic bars
    .attr("width", "6")
    .attr("x", (d, i) =>  i * 8 )
    .attr("y", (d) => y(parseInt(d.calories)))
    .attr("fill", "#8859b6")
    .on("mouseover", function(event, d){
      return tooltip.style("visibility", "visible")
                    .text(d.name + " - " + d.calories + " cal");
    })
	  .on("mousemove", function(){
      return tooltip.style("top", (event.pageY-40)+"px")
                    .style("left",(event.pageX-60)+"px")
    })
	  .on("mouseout", function(){
      return tooltip.style("visibility", "hidden");
    });

  chartGroup.append("g")
    .attr("class", "axis")
    .call(yAxis)

  chartGroup.append("text")
    .attr("x", 300)             
    .attr("y", 350)
    .attr("text-anchor", "middle")  
    .text("calories per cereal");
})