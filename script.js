let myLibrary = [];

const booksContainer = document.querySelector(".books-container");

const createBookModal = document.querySelector(".create-book-modal");
const createBookForm = document.getElementById("create-book-form");

const openModalButton = document.querySelector(".open-modal-button");
const closeModalButton = document.querySelector(".close-modal-button");
const addBookButton = document.getElementById("add-book");

function Book(data) {
	Object.assign(this, data);
	this.id = crypto.randomUUID();
}

function addBookToPage(data) {
	const book = document.createElement("div");
	book.classList.add("book");

	if (data.hasRead) {
		book.classList.add("has-read-book");
	}

	const bookHeader = document.createElement("div");
	const bookDescription = document.createElement("div");

	bookHeader.classList.add("book-header");
	bookDescription.classList.add("book-description");

	const title = document.createElement("h1");
	const author = document.createElement("h3");
	const genre = document.createElement("p");
	const pageCount = document.createElement("p");

	title.classList.add("book-title");
	author.classList.add("book-author");
	genre.classList.add("book-genre");
	pageCount.classList.add("book-page-count");

	title.textContent = data.title;
	author.textContent = `By ${data.author}`;
	pageCount.textContent = `Pages: ${data.pageCount}`;
	genre.textContent = `Genre: ${data.genre}`;

	bookHeader.appendChild(title);
	bookHeader.appendChild(author);
	bookDescription.appendChild(genre);
	bookDescription.appendChild(pageCount);

	book.appendChild(bookHeader);
	book.appendChild(bookDescription);
	booksContainer.appendChild(book);
}

function addBookToLibrary(book) {
	myLibrary[book.id] = book;
}

const FantasyBook = new Book({
	title: "My Fantasy Book",
	author: "Gabriela Day",
	genre: "Fantasy",
	pageCount: 100,
	hasRead: true,
});

console.log(FantasyBook);

openModalButton.addEventListener("click", (event) =>
	createBookModal.showModal()
);

closeModalButton.addEventListener("click", (event) => createBookModal.close());

createBookForm.addEventListener("submit", (event) => {
	const formData = new FormData(createBookForm, addBookButton);
	const bookData = Object.fromEntries(formData);

	const newBook = new Book(bookData);

	addBookToLibrary(newBook);
	addBookToPage(newBook);

	createBookForm.reset();
});

addBookToLibrary(FantasyBook);

for (const bookId in myLibrary) {
	const book = myLibrary[bookId];

	addBookToPage(book);
}
