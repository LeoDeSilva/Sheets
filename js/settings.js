const fontFamilyElement = document.getElementById("font-family");
const fontSizeElement = document.getElementById("font-size");
const pageWidthElement = document.getElementById("page-width");

function handleSubmit() {
	let fontFamilies = ["serif", "sans-serif", "monospace"];
	let fontSizes = ["small", "medium", "large"];
	let pageWidths = ["thin", "regular", "wide"];

	let fontFamily = fontFamilies.includes(fontFamilyElement.value)
		? fontFamilyElement.value
		: "monospace";
	let fontSize = fontSizes.includes(fontSizeElement.value)
		? fontSizeElement.value
		: "medium";
	let pageWidth = pageWidths.includes(pageWidthElement.value)
		? pageWidthElement.value
		: "regular";

	localStorage.setItem("font-family", fontFamily);
	localStorage.setItem("font-size", fontSize);
	localStorage.setItem("page-width", pageWidth);

	window.location.href = "index.html";
}

function main() {
	let fontFamily = localStorage.getItem("font-family");
	let fontSize = localStorage.getItem("font-size");
	let pageWidth = localStorage.getItem("page-width");

	fontFamilyElement.value = fontFamily == null ? "monospace" : fontFamily;
	fontSizeElement.value = fontSize == null ? "medium" : fontSize;
	pageWidthElement.value = pageWidth == null ? "regular" : pageWidth;
}

main();
