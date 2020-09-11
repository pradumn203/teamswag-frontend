$("#signin-button").on("click", function () {
    localStorage.clear();
    let userData = {};
  
    userData["first_name"] = document.getElementById("materialRegisterFormFirstName").value;
    userData["last_name"] = document.getElementById("materialRegisterFormLastName").value;
    userData["username"] = document.getElementById("materialRegisterFormUsername").value;
    userData["email"] = document.getElementById("materialRegisterFormEmail").value;
    userData["password"] = document.getElementById("materialRegisterFormPassword").value;
    userData["phone"] = document.getElementById("materialRegisterFormPhone").value;

  
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
  