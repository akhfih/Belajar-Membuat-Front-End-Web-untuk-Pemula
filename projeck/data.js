const STORAGE_KEY = "TODO_APPS";
let books = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function saveData() {
  const parsed /* string */ = JSON.stringify(books);
  console.log(parsed);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

function composeBookObject(title, author, tahun, isComplete) {
  return {
    id: +new Date(),
    title: title,
    author: author,
    tahun: tahun,
    isCompleted: isComplete,
  };
}

function updateDataToStorage() {
  if (isStorageExist()) saveData();
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);
  console.log(data);
  if (data !== null) books = data;
  document.dispatchEvent(new Event("ondataloaded"));
}

function loadDataSearch(title = null) {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    if (title || title === "") {
      const dataSearch = data.filter(function (item) {
        const obj = Object.values(item.title);
        return obj.join("").indexOf(title) !== -1;
      });
      console.log(dataSearch);
      books = dataSearch;
      resetItem();
      document.dispatchEvent(new Event("ondataloaded"));
    } else {
      books = data;
      document.dispatchEvent(new Event("ondataloaded"));
    }
  } else {
    alert("Tidak ada data yang tersimpan");
  }
}

function findBook(bookId) {
  for (book of books) {
    if (book.id === bookId) return book;
  }

  return null;
}

function findBookIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) return index;
    index++;
  }

  return -1;
}
