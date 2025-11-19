let myLibrary = {
	name: "MyLibrary",
	books: [],
};

const booksContainer = document.querySelector(".books-container");

const createBookModal = document.querySelector(".create-book-modal");
const createBookForm = document.getElementById("create-book-form");

const openModalButton = document.querySelector(".open-modal-button");
const closeModalButton = document.querySelector(".close-modal-button");
const addBookButton = document.getElementById("add-book");

function Book(data) {
	Object.assign(this, data);
	this.id = crypto.randomUUID();
	this.libraries = [];

	this.addToLibrary = function (library) {
		this.libraries.push(library);
		library.books[this.id] = this;
	};

	this.addToLibraryPage = function (library) {
		const book = document.createElement("div");
		book.classList.add("book");
		book.dataset.bookId = this.id;

		this.element = book;

		if (this.hasRead) {
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

		const deleteButton = document.createElement("button");
		deleteButton.classList.add("delete-book-button");
		deleteButton.textContent = "X";

		title.classList.add("book-title");
		author.classList.add("book-author");
		genre.classList.add("book-genre");
		pageCount.classList.add("book-page-count");

		title.textContent = this.title;
		author.textContent = `By ${this.author}`;
		pageCount.textContent = `Pages: ${this.pageCount}`;
		genre.textContent = `Genre: ${this.genre}`;

		bookHeader.appendChild(deleteButton);
		bookHeader.appendChild(title);
		bookHeader.appendChild(author);
		bookDescription.appendChild(genre);
		bookDescription.appendChild(pageCount);

		book.appendChild(bookHeader);
		book.appendChild(bookDescription);
		booksContainer.appendChild(book);

		deleteButton.addEventListener("click", () => {
			this.removeFromLibrary(library);
			this.removeFromLibraryPage(library);
		});
	};

	this.removeFromLibraryPage = function () {
		this.element.remove();
	};

	this.removeFromLibrary = function () {};
}

openModalButton.addEventListener("click", (event) =>
	createBookModal.showModal()
);

closeModalButton.addEventListener("click", (event) => createBookModal.close());

createBookForm.addEventListener("submit", (event) => {
	const formData = new FormData(createBookForm, addBookButton);
	const bookData = Object.fromEntries(formData);

	const newBook = new Book(bookData);

	newBook.addToLibrary(myLibrary);
	newBook.addToLibraryPage();

	createBookForm.reset();
});

const FantasyBook = new Book({
	title: "My Fantasy Book",
	author: "Gabriela Day",
	genre: "Fantasy",
	pageCount: 100,
	hasRead: true,
});

FantasyBook.addToLibrary(myLibrary);
FantasyBook.addToLibraryPage(myLibrary);
