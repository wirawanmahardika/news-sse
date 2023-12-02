const images = document.getElementsByClassName("image");
const categories = document.getElementsByClassName("category");
const image = document.getElementById("image");
const update = document.getElementById("update");
const form = document.getElementsByTagName("form")[0];

Array.from(images).forEach((element) => {
  element.addEventListener("click", async (e) => {
    const response = await fetch(
      "/api/v1/category-news/" + e.target.dataset.id_category_news
    );
    const imageNews = await response.json();
    image.firstElementChild.setAttribute("src", imageNews.img);
    image.firstElementChild.setAttribute(
      "alt",
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent
    );
    image.classList.toggle("hidden");
  });
});

image.addEventListener("click", (e) => {
  if (e.target.classList.contains("fixed")) {
    e.target.classList.add("hidden");
  }
});

Array.from(categories).forEach((element) => {
  element.addEventListener("click", (e) => {
    form.id_category_news.value = e.target.dataset.id_category_news;
    form.category.value = e.target.dataset.category;
    update.classList.remove("hidden");
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const res = await fetch("/api/v1/news/category", {
    method: "PATCH",
    body: formData,
  });

  const data = await res.json();
  console.log(data);
});

update.addEventListener("click", (e) => {
  if (e.target.classList.contains("fixed")) {
    e.target.classList.add("hidden");
  }
});
