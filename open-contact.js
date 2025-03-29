// Učitavanje kontakt modala
fetch("kontakt-modal.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("kontakt-modal-placeholder").innerHTML = html;
  });
