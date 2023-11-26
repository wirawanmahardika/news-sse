const navbar = document.getElementById("navbar");
const navbarBtn = document.getElementById("navbar-btn");

navbarBtn.addEventListener("click", (e) => {
  navbar.classList.toggle("left-0");
});
