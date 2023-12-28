const navbar = document.querySelector(".navbar");
const navbarBtns = document.getElementsByClassName("navbar-btn");
const btnSearch = document.querySelector(".btn-search")
const inputSearch = document.getElementById("input-search")

Array.from(navbarBtns).forEach((btn) => {
  btn.addEventListener("click", () => {
    navbar.classList.toggle("navbar-left-0");
  });
});

btnSearch.addEventListener("click", async () => {
  if(!inputSearch.value) {
    alert("Masukkan judul berita terlebih dahulu")
    return
  }

  window.location.href = '/search-news?judul='+inputSearch.value
})
