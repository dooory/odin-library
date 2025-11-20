const myLibrary = new Library({
	name: "MyLibrary",
});

const booksContainer = document.querySelector(".books-container");

const createBookModal = document.querySelector(".create-book-modal");
const createBookForm = document.getElementById("create-book-form");

const openModalButton = document.querySelector(".open-modal-button");
const closeModalButton = document.querySelector(".close-modal-button");
const addBookButton = document.getElementById("add-book");

const hasReadClass = "has-read-book";

function Library(data) {
	Object.assign(this, data);
	this.id = crypto.randomUUID();
	this.books = [];

	this.removeBook = function (bookId) {
		if (!this.books[bookId]) {
			console.error(`No book with id <${bookId}> found`);
		}

		delete this.books[bookId];
	};

	this.addBook = function (bookData) {
		this.books[bookData.id] = bookData;
	};
}

function Book(data, instantiate, library) {
	Object.assign(this, data);
	this.id = crypto.randomUUID();
	this.libraries = [];

	this.addToLibrary = function (library) {
		this.libraries.push(library);
		library.addBook(this);
	};

	this.addToLibraryPage = function (library) {
		const book = document.createElement("div");
		book.classList.add("book");
		book.dataset.bookId = this.id;

		this.element = book;

		if (this.hasRead) {
			book.classList.add(hasReadClass);
		}

		const header = document.createElement("div");
		const bottom = document.createElement("div");

		header.classList.add("book-header");
		bottom.classList.add("book-bottom");

		const metaData = document.createElement("div");
		const controls = document.createElement("div");

		metaData.classList.add("book-metadata");
		controls.classList.add("book-controls");

		const title = document.createElement("h1");
		const author = document.createElement("h3");
		const hasRead = document.createElement("p");
		const genre = document.createElement("p");
		const pageCount = document.createElement("p");

		const toggleReadButton = document.createElement("button");
		toggleReadButton.classList.add("toggle-read-button");
		toggleReadButton.textContent = "Toggle Read";
		toggleReadButton.type = "button";

		const deleteButton = document.createElement("button");
		deleteButton.classList.add("delete-book-button");
		deleteButton.textContent = "X";
		deleteButton.type = "button";

		title.classList.add("book-title");
		author.classList.add("book-author");
		genre.classList.add("book-genre");
		hasRead.classList.add("book-hasRead");
		pageCount.classList.add("book-page-count");

		title.textContent = this.title;
		author.textContent = `By ${this.author}`;
		pageCount.textContent = `Pages: ${this.pageCount}`;
		genre.textContent = `Genre: ${this.genre}`;
		hasRead.textContent = `Has Read: ${
			this.hasRead === true ? "yes" : "no"
		}`;

		header.appendChild(deleteButton);
		header.appendChild(title);
		header.appendChild(author);
		controls.appendChild(toggleReadButton);
		metaData.appendChild(genre);
		metaData.appendChild(pageCount);
		metaData.appendChild(hasRead);

		bottom.appendChild(metaData);
		bottom.appendChild(controls);

		book.appendChild(header);
		book.appendChild(bottom);
		booksContainer.appendChild(book);

		toggleReadButton.addEventListener("click", () => {
			this.toggleRead();

			hasRead.textContent = `Has Read: ${
				this.hasRead === true ? "yes" : "no"
			}`;
		});

		deleteButton.addEventListener("click", () => {
			this.removeFromLibrary(library);
			this.removeFromPage();
		});
	};

	this.removeFromLibrary = function (library) {
		library.removeBook(this.id);
	};

	this.removeFromPage = function () {
		this.element.remove();
	};

	this.toggleRead = function () {
		this.hasRead = !this.hasRead;

		if (this.hasRead) {
			this.element.classList.add(hasReadClass);
		} else {
			this.element.classList.remove(hasReadClass);
		}

		console.log(this.hasRead);
	};

	if (instantiate) {
		this.addToLibrary(library);
		this.addToLibraryPage(library);
	}
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
	newBook.addToLibraryPage(myLibrary);

	createBookForm.reset();
});

const HarryPotter = new Book(
	{
		title: "Harry Potter and the Philosopher's Stone",
		author: "J. K. Rowling",
		genre: "Fantasy",
		pageCount: 100,
		hasRead: true,
	},
	true,
	myLibrary
);

const TheHobbit = new Book(
	{
		title: "The Hobbit",
		author: "J. R. R. Tolkien",
		genre: "Fantasy, Children's Fiction",
		pageCount: 200,
	},
	true,
	myLibrary
);

const AliceWonderland = new Book(
	{
		title: "Alice's Adventures in Wonderland",
		author: "Lewis Carroll",
		genre: "Fantasy, Absurdist Fiction",
		pageCount: 500,
	},
	true,
	myLibrary
);

const CatcherRye = new Book(
	{
		title: "The Catcher in the Rye",
		author: "J. D. Salinger",
		genre: "Coming-of-age",
		hasRead: true,
		pageCount: 300,
	},
	true,
	myLibrary
);

const PeterRabbit = new Book(
	{
		title: "Peter Rabbit",
		author: "Beatrix Potter",
		genre: "Children's literature",
		hasRead: true,
		pageCount: 600,
	},
	true,
	myLibrary
);

const CharlottesWeb = new Book(
	{
		title: "Charlotte's Web",
		author: "E. B. White",
		genre: "Children's Fiction",
		hasRead: true,
		pageCount: 400,
	},
	true,
	myLibrary
);
