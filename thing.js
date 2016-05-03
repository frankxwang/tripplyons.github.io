var target = "95025812";
var pw = "123";
var xmlhttp = new XMLHttpRequest();
xmlhttp.open("POST", "https://palo-alto.edu/index.cfm", true);
xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xmlhttp.send("uid="+target+"&userpassword="+pw+"&submit=Sign+in");
xmlhttp.onreadystatechange = function() {
  console.log(xmlhttp.responseText);
};
document.getElementsByClassName("alertbox");
