const headers2 = document.getElementsByTagName("h2");
const paragraphsContainer = document.getElementsByTagName("div");

Array.from(headers2).forEach((h) => {
  h.addEventListener("click", (e) => {
    const form = document.createElement("form");
    form.classList.add("flex", "w-full", "gap-x-4", "justify-between");
    form.action = "/api/v1/content";
    form.method = "POST";

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "id_content";
    hiddenInput.value = e.target.dataset.id_content;

    const input = document.createElement("input");
    input.classList.add("px-3", "py-1", "border-2", "border-blue-600", "w-4/5");
    input.type = "text";
    input.name = "sub_title";
    input.value = e.target.textContent;

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Submit";
    button.classList.add(
      "px-3",
      "py-1",
      "font-semibold",
      "rounded",
      "bg-orange-500"
    );

    form.append(input, hiddenInput, button);
    e.target.parentNode.replaceChild(form, e.target);
  });
});

Array.from(paragraphsContainer).forEach((div) => {
  div.addEventListener("click", (e) => {
    const form = document.createElement("form");
    form.action = "/api/v1/content";
    form.method = "POST";

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "id_content";
    if (e.target.tagName === "P") {
      hiddenInput.value = e.target.parentNode.dataset.id_content;
    } else {
      hiddenInput.value = e.target.dataset.id_content;
    }

    form.classList.add(
      "flex",
      "w-full",
      "gap-x-4",
      "justify-between",
      "items-center"
    );

    const textArea = document.createElement("textarea");
    textArea.name = "content";
    textArea.type = "text";
    textArea.rows = "10";
    textArea.classList.add(
      "px-3",
      "py-1",
      "border-2",
      "border-blue-600",
      "w-4/5"
    );

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Submit";
    button.classList.add(
      "px-3",
      "py-1",
      "font-semibold",
      "rounded",
      "bg-orange-500"
    );

    form.append(textArea, hiddenInput, button);

    if (e.target.tagName === "P") {
      for (const child of e.target.parentNode.children) {
        textArea.value +=
          child.textContent +
          (e.target.parentNode.children.length > 1 ? "\n$S\n" : "");
      }
      e.target.parentElement.insertAdjacentElement("afterend", form);
      e.target.parentElement.remove();
    } else {
      for (const child of e.target.children) {
        textArea.value +=
          child.textContent + (e.target.children.length > 1 ? "\n$S\n" : "");
      }
      e.target.insertAdjacentElement("afterend", form);
      e.target.remove();
    }
  });
});
