$(document).ready(function(){
  $("#login-button").click(log_in_user);
});

function log_in_user(e){
  var form = $(e.currentTarget.parentElement);
  var user = form.find("#username").val();
  var pass = form.find("#pass").val();
  console.log("about to send a request");
  $.ajax({
    url: "/login/",
    type: "POST",
    data: {
      username: user,
      password: pass
    },
    success: function(e){
      console.log("Yay");
    },
    error: function(xhr, textStatus, thrownError){
      console.log("There has been an error: " + textStatus + ", " + thrownError);
    }
  })
}
