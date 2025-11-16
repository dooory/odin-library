let myLibrary = [];

function Book(name, genre) {
	this.name = name;
	this.genre = genre;
	this.id = crypto.randomUUID();
}

function addBookToLibrary(book) {
	myLibrary[book.id] = book;
}

let FantasyBook = new Book("My Fantasy Book", "Fantasy");
let HorrorBook = new Book("My Horror Book", "Horror");
let ActionBook = new Book("My Action Book", "Action");
let ScfiBook = new Book("My Sc-fi Book", "Sc-fi");
let AdventureBook = new Book("My Adventure Book", "Adventure");

addBookToLibrary(FantasyBook);
addBookToLibrary(HorrorBook);
addBookToLibrary(ActionBook);
addBookToLibrary(ScfiBook);
addBookToLibrary(AdventureBook);

for (const book in myLibrary) {
	const element = myLibrary[book];

	console.log(element);
}
