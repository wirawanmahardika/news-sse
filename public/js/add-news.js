const contentNumber = document.querySelector(".content-number");
const jumlahSubJudulContainer = document.querySelector(".jumlah-sub-judul");
const subJudulContainer = document.getElementById("sub-judul-container");
const contentContainer = document.getElementById("content-container");
const form = document.getElementsByTagName("form")[0];
const popup = document.getElementById("pop-up");
const jumlahSubJudul = document.getElementById("jumlah-sub-judul");

jumlahSubJudulContainer.addEventListener("input", (e) => {
  let jmlSubjudul = e.target.value;
  contentNumber.innerHTML = "";

  while (true) {
    const element = document.querySelector(".input-content-container");
    if (element) {
      element.remove();
    } else {
      break;
    }
  }

  for (let i = jmlSubjudul; i > 0; i--) {
    let inputContentContainer = document.createElement("div");
    inputContentContainer.classList.add(
      "w-full",
      "p-3",
      "gap-y-2",
      "flex-col",
      "input-content-container"
    );

    const labelInput = document.createElement("label");
    labelInput.classList.add("font-bold", "text-lg", "md:text-xl");
    labelInput.textContent = "Sub Judul Ke " + i;

    const newInput = document.createElement("input");
    newInput.name = "sub_title" + i;
    newInput.type = "text";
    newInput.required = true;
    newInput.classList.add(
      "sub-judul-container",
      "w-full",
      "px-2",
      "py-1",
      "outline-none",
      "border-2",
      "border-gray-700",
      "focus-within:border-cyan-600",
      "md:py-2",
      "md:px-3",
      "lg:py-1"
    );

    const labelTxtArea = document.createElement("label");
    labelTxtArea.classList.add("font-bold", "text-lg", "md:text-xl");
    labelTxtArea.textContent = "Content Ke " + i;

    const newtxtArea = document.createElement("textarea");
    newtxtArea.name = "content" + i;
    newtxtArea.cols = "30";
    newtxtArea.rows = "10";
    newtxtArea.required = true;
    newtxtArea.classList.add(
      "content-container",
      "w-full",
      "px-2",
      "py-1",
      "outline-none",
      "border-2",
      "border-gray-700",
      "focus-within:border-cyan-600",
      "md:py-2",
      "md:px-3",
      "lg:py-1"
    );

    e.target.parentElement.after(
      inputContentContainer,
      inputContentContainer.cloneNode(true)
    );
    e.target.parentElement.nextElementSibling.append(labelInput, newInput);
    e.target.parentElement.nextElementSibling.nextElementSibling.append(
      labelTxtArea,
      newtxtArea
    );
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  try {
    const response = await fetch("http://localhost:5173/api/v1/news", {
      method: "POST",
      body: formData,
      credentials: "same-origin",
    });

    const result = await response.json();
    popup.classList.remove("hidden");
    popup.lastElementChild.textContent = result.message;
    e.target.judul.value = "";
    jumlahSubJudul.value = "";
    while (true) {
      const element = document.querySelector(".input-content-container");
      if (element) {
        element.remove();
      } else {
        break;
      }
    }
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