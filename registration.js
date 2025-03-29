const $formForRegister = $("#form"); // Odaberi formu
const $username = $("#username"); // Odaberi polje za korisničko ime
const $password = $("#password"); // Odaberi polje za lozinku

const registrirajKorisnika = (podaci) => {
  $.ajax({
    url: "https://www.fulek.com/data/api/user/register", // URL na koji šaljemo POST zahtjev
    method: "POST",
    contentType: "application/json", // Šaljemo podatke u JSON formatu
    data: JSON.stringify(podaci), // Pretvaramo podatke u JSON string
    success: function (response) {
      if (response.isSuccess) {
        window.location.replace("login.html"); // Preusmjerenje nakon uspjeha
      } else {
        alert("Pogreška pri registraciji.");
      }
    },
    error: function () {
      alert("Greška kod slanja podataka.");
    },
  });
};

$formForRegister.submit(function (event) {
  event.preventDefault(); // Spriječi da se stranica ponovno učita

  const korisnikPodaci = {
    username: username.value,
    password: password.value,
  };

  registrirajKorisnika(korisnikPodaci);
});
