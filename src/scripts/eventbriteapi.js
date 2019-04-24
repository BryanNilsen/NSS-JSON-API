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
      allEvents.forEach(event => {
        if (event.category_id === id) {
          const eventCard = document.createElement("div");
          let eventDesc = event.description.text;
          console.log(event);
          eventDetails = `
          <h1>${event.name.text}</h1>
          <h2>${event.venue.address.localized_address_display}</h2>
          <p>${eventDesc.slice(0, 250)}...</p>
          `;
          eventCard.innerHTML += eventDetails;
          containerDiv.appendChild(eventCard);
        }
      });
    });
}
