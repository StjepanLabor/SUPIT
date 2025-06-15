jQuery(document).ready(function () {
  jQuery("#contact-form").submit(function (e) {
    var form = jQuery(this);

    var receiveNewsletter = jQuery("#notifications").prop("checked")
      ? "true"
      : "false";

    var formData = form.serializeArray();
    formData.push({ name: "ReceiveNewsletter", value: receiveNewsletter });

    jQuery.ajax({
      url: "https://www.fulek.com/mvc/supit/project-contact-form",
      type: "POST",
      data: formData,
      success: function (data) {},
      error: function (data) {
        console.log("Greška");
        console.log(data);
      },
    });
  });
});
