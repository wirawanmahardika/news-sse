const navbar = document.querySelector(".navbar");
const navbarBtns = document.getElementsByClassName("navbar-btn");

Array.from(navbarBtns).forEach((btn) => {
  btn.addEventListener("click", () => {
    navbar.classList.toggle("navbar-left-0");
  });
});
