const navbar = document.getElementById("navbar");
const navbarBtns = document.getElementsByClassName("navbar-btn");

Array.from(navbarBtns).forEach((btn) => {
  btn.addEventListener("click", (e) => {
    navbar.classList.toggle("navbar-left-0");
  });
});

