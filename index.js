// ===== Navigation =====

function openSidebar() {
	document.getElementById("sidebar").style.width = "400px";
	document.getElementById("open-sidebar").classList.add("hide");
}
function closeSidebar() {
	document.getElementById("sidebar").style.width = "0";
	document.getElementById("open-sidebar").classList.remove("hide");
}

function closeOverlay() {
	document.getElementById("overlay-container").classList.add("hide");
	document.getElementById("body-container").classList.remove("blur");
}

function openOverlay() {
	document.getElementById("overlay-container").classList.remove("hide");
	document.getElementById("body-container").classList.add("blur");
}

function submitOverlay() {
	console.log("SUBMIT");
	closeOverlay();
}

document.getElementById("overlay").addEventListener("click", (e) => {
	e.stopPropagation();
});
