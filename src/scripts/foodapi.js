// create a function to get all local and api food data and input into DOM

function getData() {
  // grab HTML element to inject food data
  let foodlist = document.querySelector("#foodlist");
  // clear element
  foodlist.innerHTML = "";
  // fetch local food data
  fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
      // console.table represents data in console as a table (obviously!:)
      console.table(parsedFoods);
      // loop over local food data, grab barcode and use it to fetch API data
      parsedFoods.forEach(food => {
        fetch(
          `https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`
        )
          .then(APIfoods => APIfoods.json())
          .then(parsedAPIfoods => {
            //  target html element and inject DOM element created by foodFactory function
            foodlist.innerHTML += foodFactory(food, parsedAPIfoods);
          });
      });
    });
}

// input local and API food data to create DOM element
function foodFactory(localFood, apiFood) {
  return `
  <div class="food_list">
    <h2>${localFood.name}</h2>
    <img src="${apiFood.product.image_url}">
    <p>${localFood.type}</p>
    <p>Country: ${apiFood.product.countries}</p>
    <p>Calories/serving: ${apiFood.product.nutriments.energy_serving}
    <p>Fat/serving: ${apiFood.product.nutriments.fat_serving}
    <p>Sugar/serving: ${apiFood.product.nutriments.sugars_serving}
    <p class="ingredients">${apiFood.product.ingredients_text}
  </div>
  `;
}

// grab button from index.html and add click event to populate DOM
const getDataBtn = document.getElementById("btn-getData");
getDataBtn.addEventListener("click", () => getData());
