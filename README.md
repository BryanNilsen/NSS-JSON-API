# MAKING FETCH CALLS - JSON SERVER / EXTERNAL API

This exercise was meant to develop skills using the `fetch` statement to make requests for data.

## Objective

To fetch local food data stored in a json database and data served on a remote API and output combined results to the DOM.

## Tools Used

- JSON Server
- Postman

## Lessons Learned

I created a json database and several food objects that had various properties, such as name and type, as well as a barcode id. Using the barcode id, I fetched the data associated with that barcode from an external food API so I could use additional information to display within my app, such as ingredients, calories, fat content, and an image if provided.

I also created a foodFactory function which took the local and API data and created HTML elements to append to the DOM.

This was a great exercise to develop my skills making requests for data and then drilling down into results to select the information I want to use in my application.
