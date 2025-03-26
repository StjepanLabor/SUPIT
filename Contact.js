$(document).ready(function () {
  $("#contact-form").on("submit", function () {
    let checkbox = $("#ReceiveNewsletter");
    checkbox.val(checkbox.is(":checked") ? "true" : "false");
  });
});
