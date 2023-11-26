const contentNumber = document.querySelector(".content-number");
const jumlahSubJudulContainer = document.querySelector(".jumlah-sub-judul");
const subJudulContainer = document.getElementById("sub-judul-container");
const contentContainer = document.getElementById("content-container");
const form = document.getElementsByTagName("form")[0];

let dataToFetch = [];
let selectedContent;

jumlahSubJudulContainer.addEventListener("input", (e) => {
  let jmlSubjudul = e.target.value;
  contentNumber.innerHTML = "";

  for (let i = 1; i <= jmlSubjudul; i++) {
    dataToFetch.push({
      subJudulKe: i,
      subJudul: "",
      content: "",
    });

    const a = document.createElement("a");
    // a.setAttribute("dataset-number", i.toString());
    a.dataset.number = i.toString();
    a.classList.add(
      "bg-gray-700",
      "py-1",
      "px-3",
      "text-white",
      "hover:bg-cyan-600",
      "cursor-pointer"
    );
    a.textContent = i;
    contentNumber.append(a);

    if (jmlSubjudul > 0) {
      contentContainer.classList.replace("hidden", "flex");
      contentContainer.firstChild.textContent = "Content Ke-" + 1;
      subJudulContainer.classList.replace("hidden", "flex");
      subJudulContainer.firstChild.textContent = "Subjudul Ke-" + 1;
      selectedContent = 1;
    }
  }
});

contentNumber.addEventListener("click", (e) => {
  e.preventDefault();
  if (selectedContent == e.target.dataset.number) return;
  selectedContent = e.target.dataset.number;
  subJudulContainer.lastElementChild.value = dataToFetch.find(
    (d) => d.subJudulKe == selectedContent
  ).subJudul;
  contentContainer.lastElementChild.value = dataToFetch.find(
    (d) => d.subJudulKe == selectedContent
  ).content;
  subJudulContainer.firstChild.textContent = "Subjudul Ke-" + selectedContent;
  contentContainer.firstChild.textContent = "Content Ke-" + selectedContent;
});

subJudulContainer.lastElementChild.addEventListener("input", (e) => {
  const targetData = dataToFetch.find((d) => d.subJudulKe == selectedContent);
  dataToFetch = dataToFetch.filter((d) => d.subJudulKe != selectedContent);
  targetData.subJudul = e.target.value;
  dataToFetch.push(targetData);
});

contentContainer.lastElementChild.addEventListener("input", (e) => {
  const targetData = dataToFetch.find((d) => d.subJudulKe == selectedContent);
  dataToFetch = dataToFetch.filter((d) => d.subJudulKe != selectedContent);
  targetData.content = e.target.value;
  dataToFetch.push(targetData);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const dataToSend = {
    contents: dataToFetch.map((c) => {
      const subJudul = c.subJudul;
      delete c.subJudulKe;
      delete c.subJudul;
      return {
        ...c,
        sub_title: subJudul,
        title: e.target.judul.value,
        id_news: e.target.category.value,
      };
    }),
  };

  try {
    const unpreparedResult = await fetch("/api/v1/private/content", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dataToSend),
      credentials: "same-origin",
    });
    const result = await unpreparedResult.json();
    console.log(result);
    dataToFetch = [];
    contentNumber.innerHTML = "";
  } catch (error) {
    console.log(error);
  }
});
