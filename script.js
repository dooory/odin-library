let myLibrary = [];

const booksContainer = document.querySelector(".books-container");
const createBookModal = document.querySelector(".create-book-modal");
const openModalButton = document.querySelector(".open-modal-button");
const closeModalButton = document.querySelector(".close-modal-button");

openModalButton.addEventListener("click", (event) =>
	createBookModal.showModal()
);

closeModalButton.addEventListener("click", (event) => createBookModal.close());

function Book(name, author, genre, pages, hasRead) {
	this.name = name;
	this.author = author;
	this.genre = genre;
	this.pages = pages;
	this.read = hasRead;
	this.id = crypto.randomUUID();
}

function addBookToLibrary(book) {
	myLibrary[book.id] = book;
}

function addBookToPage(book) {
	const bookElement = document.createElement("div");
	bookElement.className = "book";

	const title = document.createElement("h1");
	const genre = document.createElement("p");

	title.textContent = book.name;
	genre.textContent = book.genre;

	bookElement.appendChild(title);
	bookElement.appendChild(genre);

	booksContainer.appendChild(bookElement);
}

const FantasyBook = new Book(
	"My Fantasy Book",
	"Gabriela Day",
	"Fantasy",
	100,
	false
);

const HorrorBook = new Book(
	"My Horror Book",
	"Julie Lawson",
	"Horror",
	200,
	true
);

const ActionBook = new Book("My Action Book", "Pedro Lam", "Action", 300, true);

addBookToLibrary(FantasyBook);
addBookToLibrary(HorrorBook);
addBookToLibrary(ActionBook);

for (const bookId in myLibrary) {
	const book = myLibrary[bookId];

	addBookToPage(book);
}
