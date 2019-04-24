console.log("joke");

const setupElement = document.querySelector("#setup");
const punchlineElement = document.querySelector("#punchline");

function addToDom(jokeObj) {
  setupElement.innerHTML = `<h2>${jokeObj.setup}</h2>`;
  let getPunchlineBtn = document.createElement("button");
  punchlineElement.innerHTML = `<h2>${jokeObj.punchline}</h2>`;
}

fetch("https://official-joke-api.appspot.com/random_joke")
  .then(result => result.json())
  .then(parsedJSON => {
    console.log("PARSED:", parsedJSON.setup, parsedJSON.punchline);
    addToDom(parsedJSON);
  });
