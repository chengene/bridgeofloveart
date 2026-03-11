const customCursor = document.getElementById("customCursor");
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  const speed = 0.15;

  cursorX += (mouseX - cursorX) * speed;
  cursorY += (mouseY - cursorY) * speed;

  customCursor.style.left = cursorX + "px";
  customCursor.style.top = cursorY + "px";

  requestAnimationFrame(animateCursor);
}

animateCursor();

window.addEventListener("scroll", () => {
  document
    .getElementById("nav-pill")
    .classList.toggle("scrolled", window.scrollY > 10);
});

const hamburger = document.getElementById("hamburger");
const mobileDrop = document.getElementById("mobile-drop");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileDrop.classList.toggle("open");
});

document.querySelectorAll(".nav-center a").forEach((link) => {
  link.addEventListener("click", () => {
    document
      .querySelectorAll(".nav-center a")
      .forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});
