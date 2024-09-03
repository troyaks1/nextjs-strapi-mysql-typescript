import { unstable_noStore as noStoreCache } from 'next/cache';

export function flattenStrapiAttributes(data: any): any {
  // Check if data is a plain object; return as is if not
  if (
    typeof data !== "object" ||
    data === null ||
    data instanceof Date ||
    typeof data === "function"
  ) {
    return data;
  }

  // If data is an array, apply flattenAttributes to each element and return as array
  if (Array.isArray(data)) {
    return data.map((item) => flattenStrapiAttributes(item));
  }

  // Initialize an object with an index signature for the flattened structure
  let flattened: { [key: string]: any } = {};

  // Iterate over each key in the object
  for (let key in data) {
    // Skip inherited properties from the prototype chain
    if (!data.hasOwnProperty(key)) continue;

    // If the key is 'attributes' or 'data', and its value is an object, merge their contents
    if (
      (key === "attributes" || key === "data") &&
      typeof data[key] === "object" &&
      !Array.isArray(data[key])
    ) {
      Object.assign(flattened, flattenStrapiAttributes(data[key]));
    } else {
      // For other keys, copy the value, applying flattenAttributes if it's an object
      flattened[key] = flattenStrapiAttributes(data[key]);
    }
  }

  return flattened;
}

export function getStrapiURL() {
  const url = process?.env?.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
  return url
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;

  // Trim any potential leading/trailing whitespace or hidden characters.
  url = url.trim();

  // Explicitly handle both "http" and "https"
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Handle URLs that start with "//"
  if (url.startsWith("//")) {
    return url;
  }

  // Ensure that relative URLs start with a leading slash.
  const cleanedUrl = url.startsWith("/") ? url : `/${url}`;

  // Construct the full URL using the Strapi base URL.
  const strapiUrl = getStrapiURL();
  return `${strapiUrl}${cleanedUrl}`;
}

export async function fetchStrapiData(url: string) {
  noStoreCache(); // disable caching for components that use this function
  const authToken = null; // we will implement this getAuthToken() later
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };
  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    return flattenStrapiAttributes(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}
