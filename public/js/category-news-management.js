const images = document.getElementsByClassName("image");
const categories = document.getElementsByClassName("category");
const image = document.getElementById("image");
const update = document.getElementById("update");
const form = document.getElementsByTagName("form")[0];
const deleteCategoriesBtn = document.querySelectorAll(".delete-category")

Array.from(images).forEach((element) => {
  element.addEventListener("click", async (e) => {
    image.firstElementChild.setAttribute("src", "/api/v1/category-news/" + e.target.dataset.id_category_news);
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
     update.lastElementChild.lastElementChild.firstElementChild.textContent =
       "Update News " + e.target.dataset.category;
    update.classList.remove("hidden");
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  await fetch("/api/v1/category-news", {
    method: "PATCH",
    body: formData,
  });

});

update.addEventListener("click", (e) => {
  if (e.target.classList.contains("fixed")) {
    e.target.classList.add("hidden");
  }
});

Array.from(deleteCategoriesBtn).forEach(deleteBtn => {
  deleteBtn.addEventListener("click", async (e) => {
    const response = await fetch("/api/v1/category-news/" + e.target.dataset.id_category_news, {
      method: "DELETE",
      credentials: "same-origin",
    })

    if(response.status !== 200) {
      alert("Gagal menghapus data")
      return
    }

    const data = await response.json()
    alert(data.message)
    location.reload()
  })
})
