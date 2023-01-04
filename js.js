let selectIndex = 1;

const cardContainer = document.querySelector(".cards");
const addBookBtn = document.querySelector("#bookBtn");
const overlay = document.querySelector(".overlay");
const form = document.querySelector("form");

// book object
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return title + author + pages + read;
  };
}
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};
Book.prototype.displayBook = function () {
  const div = document.createElement("div");
  const title = document.createElement("div");
  const author = document.createElement("div");
  const pages = document.createElement("div");
  const isRead = document.createElement("div");
  const button = document.createElement("div");
  const read = document.createElement("button");
  const remove = document.createElement("button");

  title.textContent = `${this.title}`;
  author.textContent = `${this.author}`;
  pages.textContent = `${this.pages}`;
  isRead.textContent = `${this.read}`;
  read.textContent = "Read";
  remove.textContent = "Remove";

  button.classList.add("button");
  div.classList.add("card");
  div.setAttribute("data-index", `${selectIndex++}`);
  read.setAttribute("id", "read");
  read.addEventListener('click', changeRead);
  read.setAttribute("data-title", `${this.title}`);
  remove.setAttribute("id", "remove");
  remove.setAttribute("data-title", `${this.title}`);
  remove.addEventListener("click", removeBtn);

  cardContainer.appendChild(div);
  div.appendChild(title);
  div.appendChild(author);
  div.appendChild(pages);
  div.appendChild(isRead);
  div.appendChild(button);
  button.appendChild(read);
  button.appendChild(remove);
};

function Library() {
  this.books = [];
}
Library.prototype.getBook = function (bookTitle) {
  return this.books.find((book) => book.title === bookTitle);
};
Library.prototype.addBook = function (newBook) {
  if (this.inLibrary(newBook)) {
    alert("already in library");
    return false;
  }
  this.books.push(newBook);
  return true;
};
Library.prototype.removeBook = function (title) {
  this.books = this.books.filter((book) => book.title !== title);
  console.log(this.books);
};
Library.prototype.inLibrary = function (newBook) {
  return this.books.some((book) => newBook.title === book.title);
};
Library.prototype.displayLibrary = function () {
  clearCards();
  this.books.forEach((book) => book.displayBook());
};

const library = new Library();

function removeActive() {
  overlay.classList.remove("active");
  form.classList.remove("active");
}
window.onclick = function (event) {
  if (event.target === overlay) {
    removeActive();
  }
};

const getBookFromInput = () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;
  const book = new Book(title, author, pages, read);
  console.log(book);
  return book;
};

function changeRead(e){
  const bookTitle = `${e.target.dataset.title}`;
  console.log(bookTitle);
  let book = library.getBook(bookTitle);
  console.log(book);
  book.toggleRead();
  library.displayLibrary();
}
function removeBtn(e) {
  const bookTitle = `${e.target.dataset.title}`;
  library.removeBook(bookTitle);
  library.displayLibrary();
}
function submitBook(e) {
  const book = getBookFromInput();
  if (library.addBook(book)) { library.displayLibrary(); }
  removeActive();
  e.preventDefault();
}
const clearCards = () => {
  cardContainer.innerHTML = "";
};
form.onsubmit = submitBook;
addBookBtn.onclick = () => {
  overlay.classList.add("active");
  form.classList.add("active");
};
// const removeBtns = document.querySelectorAll(".remove");
// removeBtns.forEach((button) => button.addEventListener("click", removeBtn()));
