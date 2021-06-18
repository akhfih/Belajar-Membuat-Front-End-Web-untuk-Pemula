const STORAGE_KEY = "BOOKSHELF_APPS";
let books = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
  location.reload();
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

function loadData(title = null) {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    if (title || title === "") {
      const toUpperCaseTitle = title.toUpperCase();
      const dataSearch = data.filter(function (item) {
        const obj = Object.values(item.title);
        return obj.join("").indexOf(toUpperCaseTitle) !== -1;
      });
      books = dataSearch;
      resetItem();
      document.dispatchEvent(new Event("ondataloaded"));
      books = data;
    } else {
      books = data;
      document.dispatchEvent(new Event("ondataloaded"));
    }
  } else {
    console.log("Tidak ada data yang tersimpan");
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
