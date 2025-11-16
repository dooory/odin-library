let myLibrary = [];

function Book(name, genre) {
	this.name = name;
	this.genre = genre;
	this.id = crypto.randomUUID();
}

function addBookToLibrary(book) {
	myLibrary[book.id] = book;
}

const booksContainer = document.querySelector(".books-container");

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

const FantasyBook = new Book("My Fantasy Book", "Fantasy");
const HorrorBook = new Book("My Horror Book", "Horror");
const ActionBook = new Book("My Action Book", "Action");
const ScfiBook = new Book("My Sc-fi Book", "Sc-fi");
const AdventureBook = new Book("My Adventure Book", "Adventure");
const RomanceBook = new Book("My Romance Book", "Romance");

addBookToLibrary(FantasyBook);
addBookToLibrary(HorrorBook);
addBookToLibrary(ActionBook);
addBookToLibrary(ScfiBook);
addBookToLibrary(AdventureBook);
addBookToLibrary(RomanceBook);

for (const bookId in myLibrary) {
	const book = myLibrary[bookId];

	addBookToPage(book);
}
