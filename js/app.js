const form = document.querySelector("#search-form");
const searchInput = document.querySelector("#search");
const results = document.querySelector("#results");
const statusText = document.querySelector("#status");

const yearFilter = document.querySelector("#year-filter");
let allBooks = [];

async function searchBooks(query) {
  statusText.textContent = "جاري البحث...";
  results.innerHTML = "";

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${query}&limit=12`,
    );
    const data = await response.json();

    if (data.docs.length === 0) {
      statusText.textContent = "لا توجد نتائج";
      return;
    }

    statusText.textContent = `تم العثور على ${data.numFound} كتاب`;
    allBooks = data.docs;
    applyFilter();
  } catch (error) {
    statusText.textContent = "صار خطأ بالاتصال، جرّب مرة ثانية";
  }
}

function renderBooks(books) {
  results.innerHTML = books
    .map(function (book) {
      const cover = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : "https://via.placeholder.com/200x260?text=No+Cover";
      const author = book.author_name
        ? book.author_name.join(", ")
        : "مؤلف غير معروف";
      const year = book.first_publish_year || "—";

      return `
      <article class="book-card">
        <img src="${cover}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p>${author}</p>
        <p>سنة النشر: ${year}</p>
      </article>
    `;
    })
    .join("");
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    searchBooks(query);
  }
});

function applyFilter() {
  const value = yearFilter.value;

  const filtered = allBooks.filter(function (book) {
    const year = book.first_publish_year;
    if (value === "all") return true;
    if (!year) return false;
    if (value === "old") return year < 2000;
    if (value === "mid") return year >= 2000 && year <= 2010;
    if (value === "new") return year > 2010;
  });

  if (filtered.length === 0) {
    results.innerHTML = '<p class="no-results">لا توجد كتب بهذه الفترة</p>';
    return;
  }

  renderBooks(filtered);
}

yearFilter.addEventListener("change", applyFilter);
searchBooks("programming");
