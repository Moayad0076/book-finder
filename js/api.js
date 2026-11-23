export async function fetchBooks(query) {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${query}&limit=12`,
  );

  if (!response.ok) {
    throw new Error("Server error");
  }

  return await response.json();
}
