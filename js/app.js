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

  imageContainer: document.getElementById("images"),
  resultsContainer: document.getElementById("final-results"),
  buttonContainer: document.getElementById("button"),
};

let clickCounter = 0;

//constructor for ducks

function DucksItems(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.lastClicked = null;
  this.votes = 0;
  this.views = 0;

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
  let itemTwo =
    globalVariables.items[getRandomInt(0, globalVariables.items.length)];
  let itemThree =
    globalVariables.items[getRandomInt(0, globalVariables.items.length)];

  while (itemOne === itemTwo || itemOne === itemThree) {
    itemOne =
      globalVariables.items[getRandomInt(0, globalVariables.items.length)];
  }

  while (itemTwo === itemThree || itemTwo === itemOne) {
    itemTwo =
      globalVariables.items[getRandomInt(0, globalVariables.items.length)];
  }
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
  console.log(clickCounter);
  renderItems();

  //section of loop that will only push rendering once condition is met
  if (clickCounter >= 25) {
    globalVariables.imageContainer.innerHTML = "";
    globalVariables.imageContainer.removeEventListener("click", userClickImage);
    const button = document.createElement("button");
    button.innerHTML = "View Results";
    button.addEventListener("click", resultsRendering);
    globalVariables.buttonContainer.appendChild(button);
    button.addEventListener("click", buttonRemover);
  } else {
    console.log("too few clicks");
  }
}

//function designed to remove the visual aspect of a button
function buttonRemover() {
  globalVariables.buttonContainer.innerHTML = "";
}
//function designed to render results

function resultsRendering() {
  globalVariables.resultsContainer.innerHTML = "";
  const resultsElement = document.createElement("ul");

  for (let i = 0; i < globalVariables.items.length; i++) {
    const newItem = globalVariables.items[i];
    const itemResult = document.createElement("li");

    itemResult.textContent = `${newItem.name} was seen ${newItem.views} times and was selected ${newItem.votes} times.`;

    resultsElement.appendChild(itemResult);
  }
  globalVariables.resultsContainer.appendChild(resultsElement);
}

//function designed to do the randomizing of images

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

//section that calls render and results function

renderItems();
