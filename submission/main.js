document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    tambahBuku();
  });
});

const acak = () => {
  let ID = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (var i = 0; i < 12; i++) {
    ID += characters.charAt(Math.floor(Math.random() * 36));
  }
  return ID;
};

function tambahBuku() {
  const id = acak();
  const title = document.getElementById("inputBookAuthor");
  const author = document.getElementById("inputBookAuthor");
  const year = document.getElementById("inputBookYear");
  const isComplete = false;
}
