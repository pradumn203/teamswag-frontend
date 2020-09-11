function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

$("#reg-button").on("click", function (event) {
  event.preventDefault();
  localStorage.clear();
  let userData = {};

  userData["first_name"] = document.getElementById(
    "materialRegisterFormFirstName"
  ).value;
  userData["last_name"] = document.getElementById(
    "materialRegisterFormLastName"
  ).value;
  userData["username"] = document.getElementById(
    "materialRegisterFormUsername"
  ).value;
  userData["email"] = document.getElementById(
    "materialRegisterFormEmail"
  ).value;
  userData["password"] = document.getElementById(
    "materialRegisterFormPassword"
  ).value;
  userData["phone"] = document.getElementById(
    "materialRegisterFormPhone"
  ).value;

  if (userData["password"].length < 8) {
    toastr.error("Password too short");
    return;
  }

  toastr.info("Registering.....");
  toastr.info("Please Wait");

  console.log(userData["password"].length);

  console.log(userData);

  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  userData = JSON.stringify(userData);

  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: proxyurl + "https://teamswag.herokuapp.com/auth/api/v1/create/user",
    data: userData,
    error: function (e) {
      toastr.error("User already registered.");
    },
    success: function (msg) {
      toastr.success("User created successfully.");
      toastr.info("Redirecting...");
      sleep(1000).then(() => {
        window.location = window.location.origin;
    });
    },
  });
});
