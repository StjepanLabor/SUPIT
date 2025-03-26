$(document).ready(function () {
  $("#form").submit(function (event) {
    event.preventDefault();

    let data = {
      username: $("#username").val(),
      password: $("#password").val(),
    };

    $.ajax({
      url: "https://www.fulek.com/data/api/user/login",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      dataType: "json",
      success: function (response) {
        if (response.isSuccess) {
          sessionStorage.setItem("username", data.username);
          sessionStorage.setItem("token", response.data.token);
          window.location.replace("index.html");
        } else {
          alert("Greška kod prijave.");
        }
      },
      error: function () {
        alert("Server greška");
      },
    });
  });
});
