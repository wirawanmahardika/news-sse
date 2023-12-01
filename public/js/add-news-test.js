const contentNumber = document.querySelector(".content-number");
const jumlahSubJudulContainer = document.querySelector(".jumlah-sub-judul");
const subJudulContainer = document.getElementById("sub-judul-container");
const contentContainer = document.getElementById("content-container");
const form = document.getElementsByTagName("form")[0];

jumlahSubJudulContainer.addEventListener("input", (e) => {
  let jmlSubjudul = e.target.value;
  contentNumber.innerHTML = "";

  //   const subJudulContainers = document.getElementsByClassName(
  //     "sub-judul-container"
  //   );
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
      //   "hidden"
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

    // const a = document.createElement("a");
    // a.dataset.number = i.toString();
    // a.classList.add(
    //   "bg-gray-700",
    //   "py-1",
    //   "px-3",
    //   "text-white",
    //   "hover:bg-cyan-600",
    //   "cursor-pointer"
    // );
    // a.textContent = i;
    // contentNumber.append(a);

    // if (jmlSubjudul > 0) {
    //   contentContainer.classList.replace("hidden", "flex");
    //   contentContainer.firstChild.textContent = "Content Ke-" + 1;
    //   subJudulContainer.classList.replace("hidden", "flex");
    //   subJudulContainer.firstChild.textContent = "Subjudul Ke-" + 1;
    //   selectedContent = 1;
    // }
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  try {
    const response = await fetch("http://localhost:5173/api/v1/content", {
      method: "POST",
      body: formData,
      credentials: "same-origin",
    });

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
});