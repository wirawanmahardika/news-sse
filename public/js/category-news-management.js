const images = document.getElementsByClassName("image");
const categories = document.getElementsByClassName("category");
const image = document.getElementById("image");
const update = document.getElementById("update");
const form = document.getElementsByTagName("form")[0];
const deleteCategoriesBtn = document.querySelectorAll(".delete-category")


// async function init() {
//   const response = await fetch("/api/v1/category-news/count")
//   const { count } = await response.json()
//   alert(count)

//   let el;
//   const params = new URLSearchParams(window.location.search);
//   const skip = params.get("skip") ? parseInt(params.get("skip")) :  1
//   const paging = document.querySelector(".paging")

//   el = document.createElement('button')
//   el.classList.add("p-3", "py-1", "bg-gray-800")
//   el.textContent = "<<"
//   paging.appendChild(el)

//   for (let i = 1; i <= (skip === 1 ? 4 : 5) ; i++) {
//     el = document.createElement('button')
//     el.classList.add("p-3", "py-1", "bg-red-700")
//     el.textContent = i
//     paging.appendChild(el)
//   }
  
//   el = document.createElement('button')
//   el.classList.add("p-3", "py-1", "bg-gray-800")
//   el.textContent = ">>"
//   paging.appendChild(el)
//   el = null
// }

// init()

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
     update.lastElementChild.lastElementChild.firstElementChild.textContent =
       "Update News " + e.target.dataset.category;
    update.classList.remove("hidden");
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const res = await fetch("/api/v1/category-news", {
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
