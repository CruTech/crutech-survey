//
// Other Div Show
//
function showDivyesno(divId, element) {
  document.getElementById(divId).style.display = element.value == 'Yes' ? 'block' : 'none';
};

function showDivother(divId, element) {
  document.getElementById(divId).style.display = element.value == 'Other' ? 'block' : 'none';
};

//
// Submit Redirect
//
var count = 10;
var redirect = "/";

function countDown() {
  var timer = document.getElementById("timer");

  if (count > 0) {
    count--;
    timer.innerHTML = count;
    setTimeout("countDown()", 1000);
  } else {
    window.location.href = redirect;
  }
};
