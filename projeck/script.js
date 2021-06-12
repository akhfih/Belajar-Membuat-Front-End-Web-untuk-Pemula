document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");
  const submitSearch = document.getElementById("searchSubmit");
  const checked = document.querySelector("input[id=inputBookIsComplete]");

  checked.addEventListener("change", function (event) {
    if (this.checked) {
      document.getElementById("submitBook").value =
        "MASUKKAN KE RAK SELESAI DIBACA";
    } else {
      document.getElementById("submitBook").value =
        "MASUKKAN KE RAK BELUM SELESAI DIBACA";
    }
  });

  submitSearch.addEventListener("click", function (event) {
    event.preventDefault();
    cariJudulBook();
  });

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  if (isStorageExist()) {
    loadData();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil di simpan.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromTodos();
});
