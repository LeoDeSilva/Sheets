function openSidebar() {
	//	document.getElementById("mySidebar").style.width = "25%";
	//document.getElementById("sidebar").classList.remove("hide");
	document.getElementById("sidebar").style.width = "400px";
	document.getElementById("open-sidebar").classList.add("hide");
}
function closeSidebar() {
	//document.getElementById("sidebar").classList.add("hide");
	document.getElementById("sidebar").style.width = "0";
	document.getElementById("open-sidebar").classList.remove("hide");
}
