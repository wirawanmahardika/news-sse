const form = document.querySelector("form");
const popup = document.getElementById("pop-up");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const unpreparedResult = await fetch("/api/v1/category-news", {
      method: "POST",
      body: new FormData(e.target),
      credentials: "same-origin",
    });

    const result = await unpreparedResult.json();
    popup.classList.remove("hidden");
    popup.lastElementChild.textContent = result.message;
    e.target.category.value = "";
  } catch (error) {
    console.log(error);
  }
});

popup.firstElementChild.firstElementChild.addEventListener("click", (e) => {
  if (e.target.tagName === "path") {
    e.target.parentElement.parentElement.parentElement.classList.add("hidden");
    return;
  }
  e.target.parentElement.parentElement.classList.add("hidden");
});