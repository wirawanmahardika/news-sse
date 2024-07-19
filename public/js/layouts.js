const navbar = document.querySelector(".navbar");
const navbarBtns = document.getElementsByClassName("navbar-btn");
const searhForm = document.getElementById("search-form")
const navbarKategori = document.getElementById("navbar-kategori")

Array.from(navbarBtns).forEach((btn) => {
  btn.addEventListener("click", () => {
    if (window.scrollY < 193) window.scrollTo({ top: 193, behavior: "smooth" })
    navbar.classList.toggle("navbar-visibility");
    document.body.classList.toggle("bg-gray-400")
  });
});

searhForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  const input = e.target.title.value
  if (!input) return alert("Masukkan judul berita terlebih dahulu")
  window.location.href = '/search-news?judul=' + input
});

(async () => {
  const res = await fetch("/api/v1/category-news")
  const data = await res.json()

  data.map(d => {
    const li = document.createElement("li")
    const a = document.createElement("a")
    a.href = "/"
    a.textContent = d.category
    a.classList.add("hover:text-sky-600")

    li.appendChild(a)
    navbarKategori.prepend(li)
  })
})();