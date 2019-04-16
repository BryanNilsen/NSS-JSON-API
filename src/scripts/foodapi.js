let foodProduct;
let APIfoodProducts = [];

fetch("http://localhost:8088/food")
  .then(foods => foods.json())
  .then(parsedFoods => {
    console.table(parsedFoods);

    // for loop foodProduct and make equal to parsedFoods[i]
    foodProduct = parsedFoods[0];

    // rewrite >> parsedFoods.forEach()

    // get barcode for each foodproduct and assign to foodBarcode
    let foodBarcode = parsedFoods[0].barcode;
    console.log(foodBarcode);
    // using the foodBarcode, return fetch
    return fetch(
      `https://world.openfoodfacts.org/api/v0/product/${foodBarcode}.json`
    );
  })
  .then(APIfoods => APIfoods.json())
  .then(parsedAPIfoods => {
    console.log(parsedAPIfoods.product.ingredients_text);

    let foodlist = document.querySelector("#foodlist");
    foodlist.innerHTML += `
            <div class="foodList">
                <h1 class="foodList-header">${foodProduct.name}</h1>
                <p>${foodProduct.ethnicity}</p>
                <p>${foodProduct.type}</p>
                <p>${parsedAPIfoods.product.ingredients_text}</p>
            </div>
            `;
  });

// test comment
