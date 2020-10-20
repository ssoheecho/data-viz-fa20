let table, cereal, sodium, rating;
let data = [];
let total = 0;

function preload() {
  table = loadTable('cereal.csv', 'csv', 'header');
}

function setup() {
  createCanvas(850, 400)
  background(255);
  
  cereal = table.getColumn('name');
  sodium = table.getColumn('sodium');
  rating = table.getColumn('rating');
  
  for (let i = 0; i < 77; i++) {
    data.push({
      name: cereal[i],
      sodium: int(sodium[i]),
      rating: Number.parseFloat(rating[i]).toFixed(1)
    })
  }
}


function draw() {
  translate(30, height/2);
  
  data.forEach((d, i) => {

    // draw circles with diameter that maps to the amount of sodium.
    // height of the circles correspond to the rating
    
    if(d.sodium == 0) {
      push();
      strokeWeight(0.25)
      fill(255);
      ellipse(i * 10, d.rating, 5, 5);
      pop();
    }
    
    push();
    noStroke();
    
    let opacity = map(d.sodium, 0, 290, 10, 255)
    fill(181, 0, 181, opacity);
    
    let r = map(d.sodium, 0, 290, 0, 25)
    ellipse(i * 10, d.rating, r, r)
    
    
    pop();
    

  });
  
   // get average
  for(i = 0; i < data.length; i++) {
    let number = parseFloat(data[i].rating);
    total += number
    average = total / data.length;
  };
  
  // draw average line and text
  push();
  strokeWeight(0.5);
  line(0, average, width - 90, average);
  textSize(8);
  text(`average rating: ${Number.parseFloat(average).toFixed(1)}`, 0, average - 7.5);
  pop();
  
  noLoop();
}