// ===== Navigation =====

function openSidebar() {
	document.getElementById("sidebar").style.width = "400px";
	document.getElementById("open-sidebar").classList.add("hide");
}
function closeSidebar() {
	document.getElementById("sidebar").style.width = "0";
	document.getElementById("open-sidebar").classList.remove("hide");
}

function openPageOverlay() {
	openOverlay();
	document.getElementById("page-form").classList.remove("hide");
}

function openFolderOverlay() {
	openOverlay();
	document.getElementById("folder-form").classList.remove("hide");
}

function closeOverlay() {
	document.getElementById("overlay-container").classList.add("hide");
	document.getElementById("body-container").classList.remove("blur");
}

function openOverlay() {
	document.getElementById("overlay-container").classList.remove("hide");
	document.getElementById("body-container").classList.add("blur");
	document.getElementById("folder-form").classList.add("hide");
	document.getElementById("page-form").classList.add("hide");
}

function navigateSettings() {
	window.location.href = "settings.html";
}

function main() {
	let fontFamily = localStorage.getItem("font-family");
	let fontSize = localStorage.getItem("font-size");
	let pageWidth = localStorage.getItem("page-width");

	document.documentElement.setAttribute(
		"font-family",
		fontFamily == null ? "monospace" : fontFamily
	);
	document.documentElement.setAttribute(
		"font-size",
		fontSize == null ? "medium" : fontSize
	);
	document.documentElement.setAttribute(
		"page-width",
		pageWidth == null ? "regular" : pageWidth
	);

	document.getElementById("overlay").addEventListener("click", (e) => {
		e.stopPropagation();
	});
}

main();
