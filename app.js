console.log("Unsplash?");
const ACCESS_KEY = ""; // access key från unsplash här

// DOM-referenser
const formEl = document.getElementById("search-form");
const inputEl = document.getElementById("search-input");
const imageContainerEl = document.getElementById("image-container");
const resultsCountSelect = document.getElementById("results-count");
const prevPageBtn = document.getElementById("prev-page-button");
const nextPageBtn = document.getElementById("next-page-button");

let currentPage = 1;

// lyssna på formulärets submit-händelse
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("submit clicked");
  // ta med vad användaren vill söka på
  const query = inputEl.value.trim();
  console.log(query);
  fetchImages(query);
});

async function fetchImages(query) {
  const perPage = resultsCountSelect.value;
  const endpoint = `https://api.unsplash.com/search/collections?page=${currentPage}&query=${query}&client_id=${ACCESS_KEY}&per_page=${perPage}`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    displayImages(data.results);
  } catch (error) {
    console.error(error);
  }
}

function displayImages(images) {
  // rendera ut bilderna till UI:t
  console.log(images);
  // töm tidigare innehåll
  imageContainerEl.innerHTML = "";
  // fyller vi på med nya bilder
  images.forEach((image) => {
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("image-item");
    imgDiv.innerHTML = `
            <a href="${image.links.html}" target="_blank">
                <img src="${image.cover_photo.urls.small}" alt="${image.cover_photo.alt_description}">
            </a>
        `;
    imageContainerEl.appendChild(imgDiv);
  });
}

// lyssna på klick på "prev page"
prevPageBtn.addEventListener("click", () => {
  currentPage--;
  fetchImages(inputEl.value.trim());
});

// lyssna på klick på "next page"
nextPageBtn.addEventListener("click", () => {
  currentPage++;
  fetchImages(inputEl.value.trim());
});
