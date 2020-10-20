
let data = [];
let cereal, calories;
let scale = 1;
let total = 0;

function preload() {
  table = loadTable('cereal.csv', 'csv', 'header');
}

function setup() {
  createCanvas(600, 400)
  pg = createGraphics(600, 400);
  background(255);
  
  cereal = table.getColumn('name');
  protein = table.getColumn('protein');
  sugar = table.getColumn('sugars');
  
  for (let i = 0; i < 77; i++) {
    data.push({
      name: cereal[i],
      protein: int(protein[i]),
      sugar: int(sugar[i])
    })
  }
  
  data.sort((a, b) => (a.sugar > b.sugar) ? 1 : -1)
  console.log(data)
}

function draw() {
  // title
  push();
  textSize(11);
  textAlign(CENTER);
  text("Amount of Sugar and Protein by Cereal", width/2, 50)
  pop();
    
  // average
  let proteinTotal = 0;
  let sugarTotal = 0;
  let scale = 10
  let sugarLine;
  let proteinLine;
  
  for(i = 0; i < data.length; i++) {
    proteinTotal += data[i].protein;
    sugarTotal += data[i].sugar
  }
  
  let proteinAvg = proteinTotal / data.length;
  let sugarAvg = sugarTotal / data.length;
  //console.log(proteinAvg)
  //console.log(sugarAvg)
  
  translate(10, 0)
    
    // draw the dashed averages
    for(i = 0; i < pg.width - 28; i += 7.5) {
      push();
      strokeWeight(0.25)
      line(i, (height - (sugarAvg * scale)) - 100, i + 3, (height - (sugarAvg * scale)) - 100)

      line(i, (height - (proteinAvg * scale)) - 105, i + 3, (height - (proteinAvg * scale)) - 105)
      pop();
    }
  
    //text for averages
    push();
    textSize(8)
    //text(`average amount of sugar: ${Math.round(sugarAvg)}g`, 0, (height - (sugarAvg * scale)) - 110);
    text(`average amount of protein: ${Math.round(proteinAvg)}g`, 0, (height - (proteinAvg * scale)) - 110);
    pop();
  
  data.forEach((d, i) => {
    // connecting lines
    push();
    strokeWeight(0.25);
    line(i * 7.5, (height - (d.sugar * scale)) - 100, i * 7.5, (height - (d.protein * scale)) - 100)
    pop();
    
    if(d.sugar == d.protein) {
      push();
      strokeWeight(5);
      stroke(253, 156, 124);
      point(i * 7.5, (height - (d.protein * scale)) - 100);
      pop();
    } else {
      // proteins
      push();
      strokeWeight(5);
      stroke(30, 196, 67)
      point(i * 7.5, (height - (d.protein * scale)) - 100);
      pop();

      // sugars
      push();
      strokeWeight(5);
      stroke(189, 38, 251);
      point(i * 7.5, (height - (d.sugar * scale)) - 100);
      pop();
    
    }
  })
    
    //legend
    push();
    strokeWeight(5);
    
    //sugar
    stroke(189, 38, 251);
    point(500, 25);
    
    //protein
    stroke(30, 196, 67);
    point(500, 40);
    pop();
    
    push();
    textSize(8);
    text("sugar amount", 510, 27);
    text("protein amount", 510, 42);
    pop();  
  
  noLoop();
}

function showSugarText() {
  push();
  textSize(8)
  text(`average amount of sugar: ${Math.round(sugarAvg)}g`, 0, (height - (sugarAvg * scale)) - 110);
  pop();
}

function showProteinText() {
  push();
  textSize(8)
  text(`average amount of protein: ${Math.round(proteinAvg)}g`, 0, (height - (proteinAvg * scale)) - 110);
  pop();
}
