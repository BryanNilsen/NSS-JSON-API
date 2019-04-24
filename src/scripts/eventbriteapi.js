console.log("Hello Eventbrite");

function getEventData(cat, id) {
  const containerDiv = document.getElementById("eventData");
  fetch(
    `https://www.eventbriteapi.com/v3/events/search/?location.address=Nashville&expand=venue&expand=category&sort_by=date&q=${cat}&token=${ebKey}`
  )
    .then(response => response.json())
    .then(parsedEvents => {
      let allEvents = parsedEvents.events;
      console.log(allEvents);
      allEvents.forEach(event => {
        if (event.category_id === id) {
          eventDetails = `
          <h1>${event.name.text}</h1>
          <p>${event.description.text}</p>
          `;
          containerDiv.innerHTML += eventDetails;
        }
      });
    });
}

getEventData("music", "103");
