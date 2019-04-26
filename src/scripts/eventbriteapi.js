console.log("Hello Eventbrite");
document.getElementById("selectBtn").addEventListener("click", () => {
  const cat = document.getElementById("eventType");
  const catId = cat.options[cat.selectedIndex].value;
  const catName = cat.options[cat.selectedIndex].text;
  console.log(`${catName}, ${catId}`);
  getEventData(catName, catId);
});

function getCategories() {
  const eventTypeSelect = document.getElementById("eventType");
  console.log(eventTypeSelect);
  fetch(`https://www.eventbriteapi.com/v3/categories/?&token=${ebKey}`)
    .then(response => response.json())
    .then(parsedEvents => {
      const categories = parsedEvents.categories;
      categories.forEach(category => {
        let shortName = category.short_name;
        shortName = shortName.replace(/&/g, " ");
        const catOption = `
        <option value="${category.id}">${shortName}</option>`;
        eventTypeSelect.innerHTML += catOption;
      });
      console.log(categories);
    });
}
getCategories();

function getEventData(cat, id) {
  const containerDiv = document.getElementById("eventData");
  containerDiv.innerHTML = "";
  fetch(
    `https://www.eventbriteapi.com/v3/events/search/?location.address=Nashville&expand=venue&sort_by=date&q=${cat}&token=${ebKey}`
  )
    .then(response => response.json())
    .then(parsedEvents => {
      let allEvents = parsedEvents.events;
      allEvents = allEvents.slice(0, 11);
      allEvents.forEach(event => {
        if (event.category_id === id) {
          const eventCard = document.createElement("div");
          eventCard.id = event.id;
          console.log(event);
          let eventBtn = document.createElement("button");
          eventBtn.textContent = "Add to Itinerary";
          eventBtn.id = event.id;
          eventBtn.addEventListener("click", () => {
            console.log("you clicked me");
          });
          eventDetails = `
          <h1>${event.name.text}</h1>
          <h2>${event.venue.address.localized_address_display}</h2>
          <p class="block-with-text">${event.description.text}</p>
          `;
          eventCard.innerHTML += eventDetails;
          eventCard.appendChild(eventBtn);
          containerDiv.appendChild(eventCard);
        }
      });
    });
}
