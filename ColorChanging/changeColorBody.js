document.getElementById("colorSlider").oninput = () => {
  let red = document.getElementById("red").value;
  let green = document.getElementById("green").value;
  let blue = document.getElementById("blue").value;

  document.getElementById("body").style.backgroundColor = "rgb(" + red + "," + green + "," + blue + ")"
};