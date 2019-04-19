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

function downloadCSV(csv, filename) {
  var csvFile;
  var downloadLink;

  csvFile = new Blob([csv], {type:"text/csv"});
  downloadLink = document.createElement("a");
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";

  document.body.appendChild(downloadLink);
  downloadLink.click();
}

function exportTableToCSV(filename) {
  var csv = [];
  var rows = document.querySelectorAll("table tr");

  for(var i = 0; i < rows.length; i++) {
    var row = [], cols = rows[i].querySelectorAll("td, th");
    for(var j = 0; j < cols.length; j++)
    row.push(cols[j].innerText);
    csv.push(row.join(","));
  }

  // Download CSV File
  downloadCSV(csv.join("\n"), filename);
}
