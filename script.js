const addBook = document.querySelector("#addBook");
const dialog = document.querySelector("dialog");
const cancel = document.querySelector("#cancel");
const conf = document.querySelector("#confirm");
const form = document.querySelector("form");
/** @type {HTMLDivElement} */
const libraryDisplay = document.querySelector("#lib");

addBook.addEventListener("click", () => {
  //   console.log("hi");
  dialog.showModal();
});

cancel.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});

class books {
  #read;

  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.#read = !this.#read;
  }

  set read(value) {
    this.#read = value === "on";
  }

  get read() {
    return this.#read;
  }
}

let myLib = [];

libraryDisplay.style.justifyContent = "center";
libraryDisplay.style.alignItems = "center";

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");

const titleError = document.querySelector("#titleError");
const authorError = document.querySelector("#authorError");
const pagesError = document.querySelector("#pagesError");

function formValidate() {
  title.addEventListener("input", () => {
    if (title.validity.tooShort) {
      titleError.textContent = "Title can't be shorter than 2 characters";
    } else {
      titleError.textContent = "";
    }
  });

  author.addEventListener("input", () => {
    if (author.validity.tooShort) {
      authorError.textContent = "Author can't be shorter than 2 characters";
    } else {
      authorError.textContent = "";
    }
  });

  pages.addEventListener("input", () => {
    if (pages.validity.rangeUnderflow) {
      pagesError.textContent = "Pages can't be lower than 1";
    } else {
      pagesError.textContent = "";
    }
  });
}

formValidate();

function isntValid() {
  return (
    title.value.trim() === "" ||
    author.value.trim() === "" ||
    pages.value.trim() === "" ||
    !title.validity.valid ||
    !author.validity.valid ||
    !pages.validity.valid
  );
}

function submit(e) {
  e.preventDefault();
  if (isntValid()) {
    console.log("meow");
    if (title.value.trim() === "") {
      titleError.textContent = "Title is required";
    } else if (title.validity.tooShort) {
      titleError.textContent = "Title can't be shorter than 2 characters";
    } else {
      titleError.textContent = "";
    }

    if (author.value.trim() === "") {
      authorError.textContent = "Author is required";
    } else if (author.validity.tooShort) {
      authorError.textContent = "Author can't be shorter than 2 characters";
    } else {
      authorError.textContent = "";
    }

    if (pages.value.trim() === "") {
      pagesError.textContent = "Pages is required";
    } else if (pages.validity.rangeUnderflow) {
      pagesError.textContent = "Pages can't be lower than 1";
    } else {
      pagesError.textContent = "";
    }
  } else {
    libraryDisplay.style.justifyContent = "";
    libraryDisplay.style.alignItems = "";

    const data = new FormData(e.target);
    const book = new books(
      data.get("title"),
      data.get("author"),
      data.get("pages"),
      data.get("read")
    );
    e.target.reset();
    myLib.push(book);
    console.log(myLib);
    display();
    dialog.close();
  }
}

form.addEventListener("submit", submit);

function display() {
  libraryDisplay.innerHTML = "";

  if (myLib.length === 0) {
    libraryDisplay.style.justifyContent = "center";
    libraryDisplay.style.alignItems = "center";

    const nothing = document.createElement("p");
    nothing.textContent = "Nothing Here Yet.";
    libraryDisplay.appendChild(nothing);

    const addaBook = document.createElement("p");
    addaBook.textContent = "Add a book";
    libraryDisplay.appendChild(addaBook);
  }

  for ([index, book] of myLib.entries()) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    libraryDisplay.appendChild(bookDiv);

    const details = document.createElement("div");
    bookDiv.appendChild(details);

    const titleP = document.createElement("p");
    titleP.textContent = "Title:";
    details.appendChild(titleP);

    const titleValue = document.createElement("p");
    titleValue.textContent = book.title;
    details.appendChild(titleValue);

    const authorP = document.createElement("p");
    authorP.textContent = "Author:";
    details.appendChild(authorP);

    const authorValue = document.createElement("p");
    authorValue.textContent = book.author;
    details.appendChild(authorValue);

    const pagesP = document.createElement("p");
    pagesP.textContent = "Pages:";
    details.appendChild(pagesP);

    const pagesValue = document.createElement("p");
    pagesValue.textContent = book.pages;
    details.appendChild(pagesValue);

    const status = document.createElement("div");
    bookDiv.appendChild(status);

    const read = document.createElement("label");
    read.textContent = "Read:";
    status.appendChild(read);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.index = index;
    checkbox.addEventListener("change", toggleRead);
    checkbox.checked = book.read;
    read.appendChild(checkbox);

    const remove = document.createElement("button");
    remove.textContent = "Remove";
    remove.dataset.index = index;
    remove.addEventListener("click", removeBook);
    remove.classList.add("remove");
    status.appendChild(remove);
  }
}

function toggleRead(event) {
  const index = event.target.dataset.index;
  myLib[index].toggleRead();
}

function removeBook(event) {
  const index = event.target.dataset.index;
  console.log(index);
  myLib.splice(index, 1);
  display();
}
