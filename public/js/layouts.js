const navbar = document.querySelector(".navbar");
const navbarBtns = document.getElementsByClassName("navbar-btn");
const searhForm = document.getElementById("search-form")

Array.from(navbarBtns).forEach((btn) => {
  btn.addEventListener("click", () => {
    if (window.scrollY < 193) window.scrollTo({ top: 193, behavior: "smooth" })
    navbar.classList.toggle("navbar-visibility");
  });
});

searhForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  const input = e.target.title.value
  if (!input) return alert("Masukkan judul berita terlebih dahulu")
  window.location.href = '/search-news?judul=' + input
})