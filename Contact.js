jQuery(document).ready(function () {
  //kada se cijeli dokument ucita
  jQuery("#contact-form").submit(function (e) {
    var form = jQuery(this);

    // Provjerava jeli je checkbox označen i postavlja vrijednost
    var receiveNewsletter = jQuery("#receiveNewsletter").prop("checked")
      ? "true"
      : "false";

    // Sakupljanje svih podataka sa forme i dodavanje ReceiveNewsletter
    var formData = form.serializeArray(); // Koristimo serializeArray da dobijemo podatke u objektima
    formData.push({ name: "ReceiveNewsletter", value: receiveNewsletter }); // Dodajemo checkbox vrijednost

    jQuery.ajax({
      url: "https://www.fulek.com/mvc/supit/project-contact-form",
      type: "POST",
      data: formData, // Šaljemo podatke
      success: function (data) {},
      error: function (data) {
        console.log("Greška");
        console.log(data);
      },
    });
  });
});
