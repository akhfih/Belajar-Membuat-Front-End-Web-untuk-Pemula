const INCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
let inputBookIsComplete = false;
const BOOK_ITEMID = "itemId";

function makeBook(title, author, tahun, isComplete) {
  const textTitle = document.createElement("h3");
  textTitle.innerText = title;

  const textAuthor = document.createElement("p");
  textAuthor.innerText = author;

  const textTahun = document.createElement("p");
  textTahun.innerText = tahun;

  const container = document.createElement("article");
  container.classList.add("book-item");
  container.append(textTitle, textAuthor, textTahun);
  if (isComplete) {
    container.append(createBelumButton(), createHapusButton());
  } else {
    container.append(createSelesaiButton(), createHapusButton());
  }

  return container;
}

function createSelesaiButton() {
  return createButton("btn-blue", "selesai", function (event) {
    addBookToCompleted(event.target.parentElement);
  });
}

function createBelumButton() {
  return createButton("btn-blue", "belum", function (event) {
    undoBookFromCompleted(event.target.parentElement);
  });
}

function createHapusButton() {
  return createButton("btn-grey", "hapus", function (event) {
    removeBook(event.target.parentElement);
  });
}

function createButton(buttonTypeClass, buttonText, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.innerText = buttonText;
  button.addEventListener("click", function (event) {
    eventListener(event);
    event.stopPropagation();
  });
  return button;
}

function addBook() {
  const textInputBookTitle = document.getElementById("inputBookTitle").value;
  const textInputBookAuthor = document.getElementById("inputBookAuthor").value;
  const textInputBookTahun = document.getElementById("inputBookTahun").value;
  const InputBookComplete = document.getElementById(
    "inputBookIsComplete"
  ).checked;

  const book = makeBook(
    textInputBookTitle,
    textInputBookAuthor,
    textInputBookTahun,
    InputBookComplete
  );

  const bookObject = composeBookObject(
    textInputBookTitle,
    textInputBookAuthor,
    textInputBookTahun,
    InputBookComplete
  );

  book[BOOK_ITEMID] = bookObject.id;

  books.push(bookObject);

  if (InputBookComplete) {
    const BookshelfList = document.getElementById(COMPLETED_LIST_BOOK_ID);
    BookshelfList.append(book);
  } else {
    const BookshelfList = document.getElementById(INCOMPLETED_LIST_BOOK_ID);
    BookshelfList.append(book);
  }

  updateDataToStorage();
}

function addBookToCompleted(bookElement) {
  const bookComplete = document.getElementById(COMPLETED_LIST_BOOK_ID);
  const textTitle = bookElement.querySelector(".book-item > h3").innerText;
  const textAuthor = bookElement.querySelector(
    ".book-item p:nth-child(2) "
  ).innerText;
  const textTahun = bookElement.querySelector(
    ".book-item p:nth-child(3) "
  ).innerText;
  const InputBookComplete = true;

  newBook = makeBook(textTitle, textAuthor, textTahun, InputBookComplete);
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = InputBookComplete;
  newBook[BOOK_ITEMID] = book.id;
  bookComplete.append(newBook);
  bookElement.remove();
  updateDataToStorage();
}

function undoBookFromCompleted(bookElement) {
  const bookIncomplete = document.getElementById(INCOMPLETED_LIST_BOOK_ID);
  const textTitle = bookElement.querySelector(".book-item > h3").innerText;
  const textAuthor = bookElement.querySelector(
    ".book-item p:nth-child(2) "
  ).innerText;
  const textTahun = bookElement.querySelector(
    ".book-item p:nth-child(3) "
  ).innerText;
  const InputBookComplete = false;

  newBook = makeBook(textTitle, textAuthor, textTahun, InputBookComplete);
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = InputBookComplete;
  newBook[BOOK_ITEMID] = book.id;
  bookIncomplete.append(newBook);
  bookElement.remove();
  updateDataToStorage();
}

function removeBook(bookElement) {
  const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);
  alert("yakin nih mau dihpaus brey!");
  bookElement.remove();
  updateDataToStorage();
}

function resetItem() {
  const bookIncomplete = document.getElementById(INCOMPLETED_LIST_BOOK_ID);
  bookIncomplete.remove();
  const bookcomplete = document.getElementById(COMPLETED_LIST_BOOK_ID);
  bookcomplete.remove();

  const complete = document.getElementById("complete");
  const incomplete = document.getElementById("incomplete");

  const articleIncomplete = document.createElement("div");
  articleIncomplete.classList.add("book-list");
  const articleComplete = document.createElement("div");
  articleComplete.classList.add("book-list");

  articleIncomplete.setAttribute("id", "incompleteBookshelfList");
  articleComplete.setAttribute("id", "completeBookshelfList");

  incomplete.append(articleIncomplete);
  complete.append(articleComplete);
}

function refreshDataFromTodos() {
  const bookComplete = document.getElementById(COMPLETED_LIST_BOOK_ID);
  const bookIncomplete = document.getElementById(INCOMPLETED_LIST_BOOK_ID);

  for (book of books) {
    const newBook = makeBook(
      book.title,
      book.author,
      book.tahun,
      book.isCompleted
    );
    newBook[BOOK_ITEMID] = book.id;

    if (book.isCompleted) {
      bookComplete.append(newBook);
    } else {
      bookIncomplete.append(newBook);
    }
  }
}

function cariJudulBook() {
  const searchTitle = document.getElementById("searchBookTitle").value;

  loadDataSearch(searchTitle);
}
