const myLibrary = [];
let selectIndex = 1;

const cardContainer = document.querySelector(".cards");
// const book = new Book("d", "d", "2", false);
const addBookBtn = document.querySelector("#bookBtn");
const overlay = document.querySelector(".overlay");
const form = document.querySelector("form");
const submitBtn = document.getElementById("submit");
const readBtn = document.getElementById("read");

function toggleRead(e) {
  readBtn.textContent = "Not Read";
}
readBtn.addEventListener("click", toggleRead);

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
const getBookFromInput = () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;
  const book = new Book(title, author, pages, read);
  console.log(book);
  return book;
};
function removeActive() {
  overlay.classList.remove("active");
  form.classList.remove("active");
}
window.onclick = function (event) {
  if (event.target === overlay) {
    removeActive();
  }
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}
// function displayLibrary() {
//   for (const book in myLibrary) {
//     displayBook(book);
//   }
// }
function displayBook(book) {
  const div = document.createElement("div");
  div.classList.add("card");
  div.setAttribute("data-index", `${selectIndex++}`);
  div.innerHTML = `<div>${book.title}</div>
    <div>${book.author}</div>
    <div>${book.pages}</div>
    <div>${book.read}</div>
    <div class = "buttons">
        <button id = 'read'>Read</button>
        <button id = 'remove'>Remove</button>
    </div>`;
  console.log(div);
  cardContainer.appendChild(div);
}
// displayBook(book);

function removeBtn(e) {
  const i = e.target.parentElement.parentElement.dataset.index;
  console.log(i);
  cardContainer.removeChild(document.querySelector(`[data-index= '${i}']`));
}
function submitBook(e) {
  const book = getBookFromInput();
  addBookToLibrary();
  displayBook(book);
  const removeBtns = document.querySelectorAll("#remove");
  console.log(removeBtns);
  removeBtns.forEach((button) => button.addEventListener("click", removeBtn));
  removeActive();
  e.preventDefault();
}
const hi = document.querySelector(`[data-index= '${1}']`);
submitBtn.addEventListener("click", submitBook);
addBookBtn.onclick = () => {
  overlay.classList.add("active");
  form.classList.add("active");
};
// const removeBtns = document.querySelectorAll(".remove");
// removeBtns.forEach((button) => button.addEventListener("click", removeBtn()));
