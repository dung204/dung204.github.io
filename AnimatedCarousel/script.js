const carouselButtons = document.querySelectorAll(".carousel-btn");
const fullscreenButton = document.querySelector(".toggle-fullscreen-btn");
const fullscreenButtonLogo = fullscreenButton.children[0];
const images = document.querySelectorAll(".carousel-items");
const imgNameContainer = document.querySelector(".carousel-img-name");
const pageNumberContainer = document.querySelector(".carousel-page-number");
let currIndex = 0;

const setImgName = () => {
  const imgName = document.querySelector("[selected-item]").children[0].alt;
  imgNameContainer.innerHTML = imgName;
}

const setPageNumber = () => {
  pageNumberContainer.innerHTML = `${currIndex + 1} / ${images.length}`
};

const setFullscreenLogoAndTitle = () => {
  if (window.innerHeight === screen.height && window.innerWidth === screen.width) {
    fullscreenButtonLogo.innerHTML = "fullscreen_exit";
    fullscreenButton.title = "Exit fullscreen mode";
    document.documentElement.requestFullscreen();
  }
  else {
    fullscreenButtonLogo.innerHTML = "fullscreen";
    fullscreenButton.title = "Toggle fullscreen mode";
  }
}

setImgName();
setPageNumber();
setFullscreenLogoAndTitle();
setTimeout(alert, 500, "Before you start, you can use\
left arrow key (←) and right arrow key (→) \
to move between images.\n\n\
Do NOT use F11 for fullscreen, use the fullscreen toggle \
in the upper right corner instead.\n\n\
Project author: Mantrilogix.\n\
Inspired by Web Dev Simplified.\n\
Enjoy!!");


carouselButtons.forEach(button => button.addEventListener("click", () => {
  const signal = button.getAttribute("btn-signal") === "prev" ? -1 : 1;
  const selectedImage = document.querySelector("[selected-item]");

  if (currIndex + signal === images.length) currIndex = 0;
  else if (currIndex + signal < 0) currIndex = images.length - 1;
  else currIndex += signal;

  selectedImage.removeAttribute("selected-item");
  images[currIndex].setAttribute("selected-item", "");

  setImgName();
  setPageNumber();
}));

document.addEventListener("keydown", (ev) => {
  if (ev.key === "ArrowLeft") carouselButtons[0].click();
  if (ev.key === "ArrowRight") carouselButtons[1].click();
})

document.onfullscreenchange = setFullscreenLogoAndTitle;

fullscreenButton.addEventListener("click", () => {
  if (window.innerHeight === screen.height && window.innerWidth === screen.width)
    document.exitFullscreen();
  else document.documentElement.requestFullscreen();
});