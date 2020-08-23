var imageBefore = document.querySelector(".example__image-before");
var imageAfter = document.querySelector(".example__image-after--mobile");
var sliderSwitch = document.querySelector(".example__switch-input");


sliderSwitch.addEventListener("click", function() {
  if (sliderSwitch.checked == false) {
    imageAfter.style.display = "none";
    imageBefore.style.display = "block";
  } else {
    imageAfter.style.display = "block";
    imageBefore.style.display = "none";
  }
});
