// contenfulApi.js
import { clientContentful } from "./client";

export const fetchPriceByEventName = async (eventName) => {
  try {
    // Make the necessary API request to Contentful to fetch the price based on eventName
    const response = await clientContentful.getEntries({
      // Include query parameters to fetch the price
      // ...
    });

    // Extract and return the price from the response
    const price = response.items[0]?.fields?.price; // Adjust this based on your Contentful structure
    return price;
  } catch (error) {
    throw new Error("Error fetching price from Contentful: " + error.message);
  }
};
