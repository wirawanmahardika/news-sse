const navbar = document.querySelector(".navbar");
const navbarBtns = document.getElementsByClassName("navbar-btn");
const searhForm = document.getElementById("search-form")

Array.from(navbarBtns).forEach((btn) => {
  btn.addEventListener("click", () => {
    navbar.classList.toggle("navbar-left-0");
  });
});

searhForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  const input = e.target.title.value
  if (!input) {
    alert("Masukkan judul berita terlebih dahulu")
    return
  }

  window.location.href = '/search-news?judul=' + input
})