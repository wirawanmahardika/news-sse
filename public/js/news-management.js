const images = document.getElementsByClassName("image");
const news = document.getElementsByClassName("news");
const image = document.getElementById("image");
const update = document.getElementById("update");
const form = document.getElementsByTagName("form")[0];

Array.from(images).forEach((element) => {
  element.addEventListener("click", async (e) => {
    const response = await fetch("/api/v1/news/" + e.target.dataset.id_news);
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

Array.from(news).forEach((element) => {
  element.addEventListener("click", (e) => {
    form.id_news.value = e.target.dataset.id_news;
    form.title.value = e.target.dataset.title;
    form.id_category_news.value = e.target.dataset.id_category_news;
    update.lastElementChild.lastElementChild.firstElementChild.textContent =
      "Update News " + e.target.dataset.title;
    update.classList.remove("hidden");
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (e.target.img.files[0]) {
    delete e.target.img;
  }
  const formData = new FormData(e.target);

  const res = await fetch("/api/v1/content", {
    method: "PATCH",
    body: formData,
  });

  // const data = await res.json();
  // console.log(data);
});

update.addEventListener("click", (e) => {
  if (e.target.classList.contains("fixed")) {
    e.target.classList.add("hidden");
  }
});
