function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


$("#signin-button").on("click", function (event) {
  event.preventDefault();

  localStorage.clear();
  let userData = {};

  

  userData["username"] = document.getElementById("username-input").value;
  userData["password"] = document.getElementById("password-input").value;

  if (userData["password"].length < 8) {
    toastr.error("Password too short");
    return;
  }

  toastr.info("Authenticating.....");
  toastr.info("Please Wait");

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
      localStorage["refresh"] = msg.refresh;
      localStorage["username"] = msg.username;
      localStorage["group"] = msg.group;
      localStorage["access"] = msg.access;
      window.location = window.location.origin;
      toastr.success("Logged in");
      toastr.info("Redirecting...");
      sleep(1000).then(() => {
        window.location = window.location.origin;
    });
    },
  });
});
