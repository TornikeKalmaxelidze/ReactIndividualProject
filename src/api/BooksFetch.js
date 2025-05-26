async function fetchReadingList() {
  const url = "https://openlibrary.org/people/mekBot/books/want-to-read.json";
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export default fetchReadingList;