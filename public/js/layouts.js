const navbar = document.getElementById("navbar");
const navbarBtn = document.getElementById("navbar-btn");

navbarBtn.addEventListener("click", (e) => {
  navbar.classList.toggle("navbar-left-0");
});

console.log("Hello world");
console.log(navbar);