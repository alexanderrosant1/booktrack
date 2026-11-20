const defaultBooks = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    rating: 5,
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    rating: 5,
  },
  {
    title: "1984",
    author: "George Orwell",
    rating: 4,
  },
];

const savedBooks = localStorage.getItem("books");
const books = savedBooks ? JSON.parse(savedBooks) : defaultBooks;

const bookList = document.querySelector("#book-list");
const searchInput = document.querySelector("#search");
const bookForm = document.querySelector("#book-form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const ratingInput = document.querySelector("#rating");

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

function displayBooks() {
  bookList.innerHTML = "";

  const searchText = searchInput.value.toLowerCase();

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchText) ||
      book.author.toLowerCase().includes(searchText)
    );
  });

  filteredBooks.forEach((book) => {
    const card = document.createElement("article");
    card.classList.add("book-card");

    const title = document.createElement("h3");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = `Höfundur: ${book.author}`;

    const rating = document.createElement("p");
    rating.textContent = `Einkunn: ${"⭐".repeat(Number(book.rating || 0))}`;

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(rating);

    bookList.appendChild(card);
  });
}

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newBook = {
    title: titleInput.value.trim(),
    author: authorInput.value.trim(),
    rating: ratingInput.value,
  };

  books.push(newBook);

  saveBooks();
  displayBooks();
  bookForm.reset();
});

searchInput.addEventListener("input", displayBooks);

displayBooks();