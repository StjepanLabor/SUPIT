$(document).ready(function () {
  $("#contact-form").on("submit", function (e) {
    e.preventDefault();

    let form = $(this);
    let receiveNewsletter = $("#ReceiveNewsletter").is(":checked")
      ? "true"
      : "false";

    let formData = form.serializeArray();
    formData.push({ name: "ReceiveNewsletter", value: receiveNewsletter });

    $.post("https://www.fulek.com/mvc/supit/project-contact-form", formData)
      .done(function (response) {
        console.log("Uspješno poslano", response);
      })
      .fail(function (error) {
        console.error("Greška pri slanju", error);
      });
  });
});
