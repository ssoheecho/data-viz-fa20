let table, sex, name, pclass, boat;

function preload() {
  table = loadTable('data/titanic.csv', 'csv', 'header');
  
}

function setup() {
  createCanvas(1440, 900);
  background(255);
  rectMode(CENTER);
  strokeWeight(0.5);
  
  sex = table.getColumn('sex');
  name = table.getColumn('name');
  pclass = table.getColumn('pclass')
  boat = table.getColumn('boat')
  survived = table.getColumn('survived')
  
  let pclassFirst = [];
  let pclassSecond = [];
  let pclassThird = [];
  let lifeboat14 = [];
  
  for(i = 0; i < sex.length; i++) {
    let object = {
      sex: sex[i],
      name: name[i],
      pclass: pclass[i],
      lifeboat: boat[i],
      survived: survived[i]
    }
    
    if(object.lifeboat) {
      lifeboat14.push(object)
    }
    
    if(object.pclass === "1") {
      pclassFirst.push(object);
    } else if(object.pclass === "2") {
      pclassSecond.push(object);
    } else {
      pclassThird.push(object);
    }
  }
  
  console.log(pclassFirst)
  console.log(pclassSecond)
  console.log(pclassThird)
  console.log(lifeboat14.length)

  
  drawByClass(pclassFirst, 100);
  drawByClass(pclassSecond, 300);
  drawByClass(pclassThird, 475)
      

  //saveCanvas();
}

function drawByClass(array, y) {
  let index = 10;
  array.forEach((data) => { 
    if(data.sex == "female") {
      if(data.survived === "1") {
        //noFill();
        fill(82, 107, 96);
        ellipse(index * 17.5, y, 10, 10);
      } else {
        //fill(253, 159, 40);
        ellipse(index * 17.5, y, 10, 10);
      }
    } else {
      if(data.survived === "1") {
        //noFill();
        fill(82, 107, 96);
        rect(index * 17.5, y, 10, 10);
      } else {
        noFill();
        //fill(253, 159, 40);
        rect(index * 17.5, y, 10, 10);
      }      
    }
    index += 1
    if(index * 17.5 > (width - 200)) {
      y += 30;
      index = 10;
    }
  });
};
  