document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".img-container img");
  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const closeModal = document.querySelector(".close-modal");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  let currentIndex = 0;
  let imageSources = [];

  // Prikupljanje svih src atributa slika
  images.forEach((img, index) => {
    imageSources.push(img.src);
    img.addEventListener("click", function () {
      openModal(index);
    });
  });

  function openModal(index) {
    currentIndex = index;
    modalImage.src = imageSources[currentIndex];
    modal.style.display = "flex";
  }

  function closeModalFunction() {
    modal.style.display = "none";
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % imageSources.length;
    modalImage.src = imageSources[currentIndex];
  }

  function showPreviousImage() {
    currentIndex =
      (currentIndex - 1 + imageSources.length) % imageSources.length;
    modalImage.src = imageSources[currentIndex];
  }

  // Event listeneri
  closeModal.addEventListener("click", closeModalFunction);
  nextButton.addEventListener("click", showNextImage);
  prevButton.addEventListener("click", showPreviousImage);

  // Zatvaranje modala klikom izvan slike
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModalFunction();
    }
  });

  // Navigacija strelicama na tipkovnici
  document.addEventListener("keydown", function (e) {
    if (modal.style.display === "flex") {
      if (e.key === "ArrowRight") showNextImage();
      if (e.key === "ArrowLeft") showPreviousImage();
      if (e.key === "Escape") closeModalFunction();
    }
  });
});
