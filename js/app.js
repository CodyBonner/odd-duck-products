"use strict";

const globalVariables = {
  items: [
    new DucksItems("bag", "img/bag.jpg"),
    new DucksItems("banana", "img/banana.jpg"),
    new DucksItems("bathroom", "img/bathroom.jpg"),
    new DucksItems("boots", "img/boots.jpg"),
    new DucksItems("breakfast", "img/breakfast.jpg"),
    new DucksItems("bubblegum", "img/bubblegum.jpg"),
    new DucksItems("chair", "img/chair.jpg"),
    new DucksItems("cthulhu", "img/cthulhu.jpg"),
    new DucksItems("dog duck", "img/dog-duck.jpg"),
    new DucksItems("dragon", "img/dragon.jpg"),
    new DucksItems("pen", "img/pen.jpg"),
    new DucksItems("pet sweep", "img/pet-sweep.jpg"),
    new DucksItems("scissors", "img/scissors.jpg"),
    new DucksItems("shark", "img/shark.jpg"),
    new DucksItems("sweep", "img/sweep.png"),
    new DucksItems("tauntaun", "img/tauntaun.jpg"),
    new DucksItems("unicorn", "img/unicorn.jpg"),
    new DucksItems("water can", "img/water-can.jpg"),
    new DucksItems("wine glass", "img/wine-glass.jpg"),
  ],
  //example key value in existingCounts: unicorn: 3

  imageContainer: document.getElementById("images"),
  resultsContainer: document.getElementById("final-results"),
  buttonContainer: document.getElementById("button"),
  chartCotainer: document.getElementById("results-chart"),

  previousImages: [],
  currentImages: [],
};

let clickCounter = 0;
const maxVotes = 25;

//constructor for ducks

function DucksItems(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.lastClicked = null;
  this.votes = 0;
  this.views = 0;
  this.newVotes = [];
  this.newViews = [];
  //section for rendering inside constructor
  DucksItems.prototype.render = function () {
    const itemImage = document.createElement("img");
    itemImage.src = this.filePath;
    itemImage.alt = this.name;

    globalVariables.imageContainer.appendChild(itemImage);
  };
}

//function that forces rendering
function renderItems() {
  globalVariables.imageContainer.innerHTML = "";
  globalVariables.imageContainer.addEventListener("click", userClickImage);

  let itemOne =
    globalVariables.items[getRandomInt(0, globalVariables.items.length)];
  while (globalVariables.previousImages.includes(itemOne)) {
    //  console.log('previous images includes: item one'); //log to see if a repeat occured and if so fix it
    itemOne =
      globalVariables.items[getRandomInt(0, globalVariables.items.length)];
  }
  let itemTwo =
    globalVariables.items[getRandomInt(0, globalVariables.items.length)];
  while (globalVariables.previousImages.includes(itemTwo)) {
    //console.log('previous images includes: item two'); //log to see if a repeat occured and if so fix it
    itemTwo =
      globalVariables.items[getRandomInt(0, globalVariables.items.length)];
  }
  let itemThree =
    globalVariables.items[getRandomInt(0, globalVariables.items.length)];

  while (globalVariables.previousImages.includes(itemThree)) {
    //console.log('previous images includes: item three'); //log to see if a repeat occured and if so fix it
    itemThree =
      globalVariables.items[getRandomInt(0, globalVariables.items.length)];
  }
  //while loops that ensure there aren't two of the same thing on the same page
  while (itemOne === itemTwo || itemOne === itemThree) {
    itemOne =
      globalVariables.items[getRandomInt(0, globalVariables.items.length)];
  }

  while (itemTwo === itemThree || itemTwo === itemOne) {
    itemTwo =
      globalVariables.items[getRandomInt(0, globalVariables.items.length)];
  }
  //pushes variables into array currentImages
  globalVariables.currentImages.push(itemOne, itemTwo, itemThree);

  //console.log('global variables.previousImages: ',globalVariables.previousImages);
  //adds a counter to each images view variable as it appears on screen
  itemOne.views++;
  itemTwo.views++;
  itemThree.views++;

  //calls render function of each item that's passed through
  itemOne.render();
  itemTwo.render();
  itemThree.render();
}
//function to register user click

function userClickImage(event) {
  event.preventDefault();

  const target = event.target.alt;

  for (let i = 0; i < globalVariables.items.length; i++) {
    if (target === globalVariables.items[i].name) {
      globalVariables.items[i].votes++;
    }

    //console.log(globalVariables.items[i]);
  }

  clickCounter++;

  //once user click, forces information of current images into previous images
  globalVariables.previousImages = globalVariables.currentImages;
  //resets current images to empty after user click
  globalVariables.currentImages = [];
  //restarts the process after user click
  renderItems();

  //section of loop that will only push rendering once condition is met
  if (clickCounter >= maxVotes) {
    globalVariables.imageContainer.innerHTML = "";
    globalVariables.imageContainer.removeEventListener("click", userClickImage);
    const button = document.createElement("button");
    button.innerHTML = "View Results";
    button.addEventListener("click", resultsRendering);
    globalVariables.buttonContainer.appendChild(button);
    button.addEventListener("click", buttonRemover);
  } else {
  }
}

//function designed to remove the visual aspect of a button
function buttonRemover() {
  globalVariables.buttonContainer.innerHTML = "";
}
//function designed to render results


let viewsArray = [];
let votesArray = [];

function resultsRendering() {
  globalVariables.resultsContainer.innerHTML = "";

  const resultsElement = document.createElement("ul");

  for (let i = 0; i < globalVariables.items.length; i++) {
    const newItem = globalVariables.items[i];

    const itemResult = document.createElement("li");

    itemResult.textContent = `${newItem.name} was seen ${newItem.views} times and was selected ${newItem.votes} times.`;

    
    votesArray.push(newItem.votes);
    viewsArray.push(newItem.views);


    //converting info to local storage
    localStorage.setItem("votes", JSON.stringify(votesArray));
    localStorage.setItem("views", JSON.stringify(viewsArray));

     //retrieving info and restoring it
     
     //This retrieved votes array should have a length of the number of images but doesn't
     const retrievedVotes = JSON.parse(localStorage.getItem("votes"));
     const retrievedViews = JSON.parse(localStorage.getItem("views"));
     
     newItem.votes += retrievedVotes;
     newItem.votes += retrievedViews;
     
     resultsElement.appendChild(itemResult);
    }
    
 

  globalVariables.resultsContainer.appendChild(resultsElement);
  globalVariables.chartCotainer.innerHTML = createChart();
  globalVariables.resultsContainer.appendChild(globalVariables.chartCotainer);
}

//function designed to do the randomizing of images

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

//section that creates a chart based on information provided

function createChart() {
  const ctx = document.getElementById("results-chart");
  const itemLabels = [];
  const itemVotes = [];
  const itemViews = [];

  for (let i = 0; i < globalVariables.items.length; i++) {
    const itemElement = globalVariables.items[i];
    itemLabels.push(itemElement.name);
    itemVotes.push(itemElement.votes);
    itemViews.push(itemElement.views);
  }

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: itemLabels,
      datasets: [
        {
          label: "Number of Votes",
          data: itemVotes,
          borderWidth: 1,
        },
        {
          label: "Number of Views",
          data: itemViews,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

//section that calls render and results function

renderItems();
