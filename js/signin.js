$("#signin-button").on("click", function () {
  localStorage.clear();
  let userData = {};

  userData["username"] = document.getElementById("username-input").value;
  userData["password"] = document.getElementById("password-input").value;

  console.log(userData);

  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  userData = JSON.stringify(userData);

  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: proxyurl + "https://teamswag.herokuapp.com/auth/api/v1/login/token",
    data: userData,
    error: function (e) {
      console.log(e);
      toastr.error("Authentication Failed.");
    },
    success: function (msg) {
      console.log(msg);
      localStorage["refresh"] = msg.refresh;
      localStorage["username"] = msg.username;
      localStorage["group"] = msg.group;
      localStorage["access"] = msg.access;
      window.location = window.location.origin;
    },
  });
});
