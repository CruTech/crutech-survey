//
// Other Div Show
//
function showDiv(divId, element) {
  document.getElementById(divId).style.display = element.value == 'Yes' ? 'block' : 'none';
};

//
// Submit Redirect
//
function countDown() {
  var count = 10;
  var redirect = "/";
  var timer = document.getElementById("timer");

  if (count > 0) {
      count--;
      timer.innerHTML = count;
      setTimeout("countDown()", 1000);
  } else {
      window.location.href = redirect;
  };
};
