$(document).ready(function () {
  const images = $(".img-container img");
  const modal = $("#image-modal");
  const modalImage = $("#modal-image");
  const closeModal = $(".close-modal");
  const prevButton = $(".prev");
  const nextButton = $(".next");

  let currentIndex = 0;
  let imageSources = images
    .map(function () {
      return $(this).attr("src");
    })
    .get();

  images.on("click", function () {
    currentIndex = images.index(this);
    openModal(currentIndex);
  });

  function openModal(index) {
    currentIndex = index;
    modalImage.attr("src", imageSources[currentIndex]);
    modal.css("display", "flex");
  }

  function closeModalFunction() {
    modal.css("display", "none");
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % imageSources.length;
    modalImage.attr("src", imageSources[currentIndex]);
  }

  function showPreviousImage() {
    currentIndex =
      (currentIndex - 1 + imageSources.length) % imageSources.length;
    modalImage.attr("src", imageSources[currentIndex]);
  }

  closeModal.on("click", closeModalFunction);
  nextButton.on("click", showNextImage);
  prevButton.on("click", showPreviousImage);

  modal.on("click", function (e) {
    if ($(e.target).is(modal)) {
      closeModalFunction();
    }
  });

  $(document).on("keydown", function (e) {
    if (modal.css("display") === "flex") {
      if (e.key === "ArrowRight") showNextImage();
      if (e.key === "ArrowLeft") showPreviousImage();
      if (e.key === "Escape") closeModalFunction();
    }
  });
});
