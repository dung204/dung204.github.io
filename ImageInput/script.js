const uploadButton = document.querySelector("#upload-btn");
const deleteButton = document.querySelector("#delete-btn");
const imageInput = document.querySelector("input[type=file]");
const imgContainer = document.querySelector(".img-container");

const displayImagesToHTML = () => {
  const imagesList = imageInput.files;
  if (imagesList.length === 0) return;

  for (let image of imagesList) {
    let newImgCard = createNewImgCardFromFile(image);
    imgContainer.appendChild(newImgCard);
  }
};

const createNewImgCardFromFile = (image) => {
  const imageURL = URL.createObjectURL(image);
  const imageCard = document.createElement("div");
  imageCard.className = "img-card";
  imageCard.onclick = () => {
    let anchorTag = document.createElement("a");
    Object.assign(anchorTag, {
      href: imageURL,
      target: "_blank",
    }).click();
  };

  const imgElement = document.createElement("img");
  Object.assign(imgElement, {
    src: imageURL,
    alt: image.name,
  });

  imageCard.appendChild(imgElement);
  return imageCard;
};

const deleteAllImageCards = () => {
  const imgCards = document.querySelectorAll(".img-card");
  imgCards.forEach((tag) => tag.remove());
};

uploadButton.onclick = () => imageInput.click();
deleteButton.onclick = deleteAllImageCards;
imageInput.onchange = displayImagesToHTML;
