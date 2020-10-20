// function getDepartments() {
//   window
//   .fetch("https://collectionapi.metmuseum.org/public/collection/v1/departments")
//   .then(res => res.json())
//   .then(data => {
//     console.log(data);
//   })
// }

// getDepartments()
// list of departments
// 0: {departmentId: 1, displayName: "American Decorative Arts"}
// 1: {departmentId: 3, displayName: "Ancient Near Eastern Art"}
// 2: {departmentId: 4, displayName: "Arms and Armor"}
// 3: {departmentId: 5, displayName: "Arts of Africa, Oceania, and the Americas"}
// 4: {departmentId: 6, displayName: "Asian Art"}
// 5: {departmentId: 7, displayName: "The Cloisters"}
// 6: {departmentId: 8, displayName: "The Costume Institute"}
// 7: {departmentId: 9, displayName: "Drawings and Prints"}
// 8: {departmentId: 10, displayName: "Egyptian Art"}
// 9: {departmentId: 11, displayName: "European Paintings"}
// 10: {departmentId: 12, displayName: "European Sculpture and Decorative Arts"}
// 11: {departmentId: 13, displayName: "Greek and Roman Art"}
// 12: {departmentId: 14, displayName: "Islamic Art"}
// 13: {departmentId: 15, displayName: "The Robert Lehman Collection"}
// 14: {departmentId: 16, displayName: "The Libraries"}
// 15: {departmentId: 17, displayName: "Medieval Art"}
// 16: {departmentId: 18, displayName: "Musical Instruments"}
// 17: {departmentId: 19, displayName: "Photographs"}
// 18: {departmentId: 21, displayName: "Modern Art"}

let objects = [];
let femaleArtists = [];
let myArray = [];
let jsonString = '';

async function fetchObjects() {
  let response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=8');
  let data = await response.json();
  console.log(data);
  //let objectIds = await data.objectIDs.slice(0, 200);
  let objectIds = await data.objectIDs;

  for(const id of objectIds) {
    await new Promise(resolve => {
      setTimeout(resolve, 125)
    })

    let response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
    let data = await response.json();
    console.log(data)
    objects.push(data);

    if(data.artistGender.includes("Female")) {
      femaleArtists.push(data)
    }
  }
 console.log(femaleArtists); 
 constructObj(objects)
}

function constructObj(femaleArtists){
  let objects = femaleArtists.filter(data => {
    
    // by default we assume we have complete data
    dataComplete = true;
    
    // Test if images exist
    if(data.primaryImage == ""
      || data.primaryImageSmall == ""
      || data.objectBeginDate == undefined
    )dataComplete = false;

    return dataComplete;
  
  }).map((data) => {
    
    let filename = data.primaryImage.split('/').pop();

    return { 
      objectID: data.objectID,
      artist: data.artistDisplayName,
      title: data.title,
      date: data.objectBeginDate,
      primaryImage: data.primaryImage,
      filename: filename.includes(".jpg") ? filename : filename + ".jpg" // if the filename we defined above doesn't include .jpg add it at the end
    }

  })

  myArray.push(objects);
  myArray = [].concat(...myArray);
  console.log(myArray);
  jsonString += JSON.stringify(myArray);
}