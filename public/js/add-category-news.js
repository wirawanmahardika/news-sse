const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const dataToSend = {
    category: e.target.category.value,
  };

  if (e.target.image?.value) {
    dataToSend.image = "blablabla";
  }

  try {
    const unpreparedResult = await fetch("/api/v1/news/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
      credentials: "same-origin",
    });

    const result = await unpreparedResult.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
});
