const folderListElement = document.getElementById("folder-list");
const titleElement = document.getElementById("page-title");
const bodyElement = document.getElementById("page-body");
const contentElement = document.querySelector(".content");

const overlayIdentifierElement = document.getElementById("overlay-identifier");
const tagInputElement = document.getElementById("tag-input");
const folderColorInputElement = document.getElementById("folder-color");
const folderTagInputElement = document.getElementById("folder-tag");
const overlayElement = document.getElementById("overlay");

const tagDisplayElement = document.getElementById("tag-display");

let COLORS = [
	"red",
	"green",
	"blue",
	"pastel-red",
	"pastel-green",
	"pastel-blue",
	"pastel-grey",
];

function generateId() {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ========== Storage ==========

function saveStructure(structure) {
	localStorage.setItem("folderStructure", JSON.stringify(structure));
}

function loadStructure() {
	let rawStructure = JSON.parse(localStorage.getItem("folderStructure"));
	if (rawStructure == null) {
		let structure = [
			{
				title: "Untagged",
				id: "0",
				color: "pastel-grey",
				pages: [],
			},
		];
		return structure;
	}
	return rawStructure;
}

// ========== Generate HTML ==========

function createSubPageHTML(page) {
	return `<li id="${page.id}" onclick="handleLoadPage(this.id)" class="folder-page">${page.title}</li>`;
}

function createFolderHTML(folder) {
	let subpageHTML = (() => {
		string = "";
		for (let i = 0; i < folder.pages.length; i++) {
			string += createSubPageHTML(folder.pages[i]);
		}
		return string;
	})();

	return `<div class="folder-container">
                <div class="folder">
                    <div onclick="handleOpenFolderOverlay('${folder.id}')" class="folder-icon grow pointer ${folder.color}"></div>
                    <div class="folder-identifier">${folder.title}</div>
                </div>
                <ul class="folder-subnotes">${subpageHTML}</ul>
            </div>`;
}

// ========== Retrieve From Structure =========

function retrievePage(id) {
	// Possibly cause for concern <- folderstructure in function scope
	for (let i = 0; i < folderStructure.length; i++) {
		for (let j = 0; j < folderStructure[i].pages.length; j++) {
			if (folderStructure[i].pages[j].id == id) {
				return folderStructure[i].pages[j];
			}
		}
	}
}

function retrieveFolderFromPage(id) {
	// Possibly cause for concern <- folderstructure in function scope
	for (let i = 0; i < folderStructure.length; i++) {
		for (let j = 0; j < folderStructure[i].pages.length; j++) {
			if (folderStructure[i].pages[j].id == id) {
				return folderStructure[i];
			}
		}
	}
}

function retrieveFolder(id) {
	for (let i = 0; i < folderStructure.length; i++) {
		if (folderStructure[i].id == id) {
			return folderStructure[i];
		}
	}
}

function retrieveFolderFromIdentifier(identifier) {
	for (let i = 0; i < folderStructure.length; i++) {
		if (folderStructure[i].title == identifier) {
			return folderStructure[i];
		}
	}
	return null;
}

// ========== Page Creations + Deletion ==========

function randomId() {
	collectedId = [];
	for (let i = 0; i < folderStructure.length; i++) {
		for (let j = 0; j < folderStructure[i].pages.length; j++) {
			collectedId.push(folderStructure[i].pages[j].id);
		}
	}
	// If there are no pages, create a new untagged one and load it :
	handleNoPages();
	return collectedId.length > 0
		? collectedId[Math.floor(Math.random() * collectedId.length)]
		: randomId();
}

function handleNoPages() {
	pages = 0;
	for (let i = 0; i < folderStructure.length; i++) {
		for (let j = 0; j < folderStructure[i].pages.length; j++) {
			pages++;
		}
	}

	if (pages == 0) {
		handleCreatePage();
	}
}

function handleLoadPage(id) {
	if (contentElement.id != "") {
	}
	let page = retrievePage(id);
	titleElement.innerHTML = page.title == "Untitled" ? "" : page.title;
	bodyElement.innerHTML = page.content;
	contentElement.id = id;
	tagDisplayElement.classList.forEach((item) => {
		if (COLORS.includes(item)) {
			tagDisplayElement.classList.remove(item);
		}
	});
	tagDisplayElement.classList.add(retrieveFolderFromPage(id).color);
}

function handleCreateFolder(title, color) {
	let id = generateId();
	folderStructure.push({
		title: title,
		color: color,
		pages: [],
		id: id,
	});
	updateElements();
	return id;
}

function handleCreatePage() {
	let untaggedFolder = retrieveFolder("0");
	if (untaggedFolder == null) {
		untaggedFolder = (() => {
			folderStructure.push({
				title: "Untagged",
				color: "pastel-grey",
				id: "0",
				pages: [],
			});
			return retrieveFolder("0");
		})();
	}

	id = generateId();
	untaggedFolder.pages.push({
		title: "Untitled",
		id: id,
		content: "",
		tag: untaggedFolder.title,
	});
	updateElements();
	handleLoadPage(id);
	handleSaveCurrentPage();
	handleSaveCurrentPage();
}

function handleSaveCurrentPage() {
	let page = retrievePage(contentElement.id);
	page.title =
		titleElement.innerHTML == "" ? "Untitled" : titleElement.innerHTML;
	page.content = bodyElement.innerHTML;
	updateElements();
}

function formatColor() {
	let formattedColor = folderColorInputElement.value
		.toLowerCase()
		.split(" ")
		.join("-");

	return COLORS.includes(formattedColor)
		? formattedColor
		: COLORS[Math.floor(Math.random() * COLORS.length)];
}

function submitPageOverlay() {
	let folder = retrieveFolderFromPage(contentElement.id);
	let page = retrievePage(contentElement.id);
	let tag = tagInputElement.value == "" ? "Untagged" : tagInputElement.value;

	if (tag != page.tag) {
		folder.pages = folder.pages.filter((item) => item != page);
		let newFolder = retrieveFolderFromIdentifier(tag);
		if (newFolder == null) {
			id = handleCreateFolder(
				tag,
				COLORS[Math.floor(Math.random() * COLORS.length)]
			);
			newFolder = retrieveFolder(id);
		}
		newFolder.pages.push(page);
	}
	handleSaveCurrentPage();
	updateElements();
	handleLoadPage(page.id);
	handleSaveCurrentPage();
	closeOverlay();
}

function submitFolderOverlay() {
	let folder = retrieveFolder(overlayElement.id);
	folder.color = formatColor();
	let title =
		folderTagInputElement.value == "" ? "Unnamed" : folderTagInputElement.value;

	if (title != folder.title) {
		folder.id = generateId();
	}

	folder.title = title;
	folder.pages.forEach((page) => {
		page.tag = title;
	});
	updateElements();
	handleLoadPage(contentElement.id);
	handleSaveCurrentPage();
	closeOverlay();
}

function deletePageOverlay() {
	let folder = retrieveFolderFromPage(contentElement.id);
	folder.pages = folder.pages.filter(
		(item) => item != retrievePage(contentElement.id)
	);
	updateElements();
	handleLoadPage(randomId());
	closeOverlay();
}

function deleteFolderOverlay() {
	let folder = retrieveFolder(overlayElement.id);
	folderStructure = folderStructure.filter((item) => item != folder);
	updateElements();
	handleLoadPage(randomId());
	closeOverlay();
}

function handleOpenPageOverlay() {
	handleSaveCurrentPage();
	tagInputElement.value = retrievePage(contentElement.id).tag;
	overlayIdentifierElement.innerHTML = retrievePage(contentElement.id).title;
	openPageOverlay();
}

function handleOpenFolderOverlay(id) {
	handleSaveCurrentPage();
	folderColorInputElement.value = retrieveFolder(id).color;
	folderTagInputElement.value = retrieveFolder(id).title;
	overlayElement.id = id;
	overlayIdentifierElement.innerHTML = retrieveFolderFromPage(
		contentElement.id
	).title;
	openFolderOverlay();
}

// ========= Main Body ==========

function updateElements() {
	// Cause for concern because functional scope
	folderListElement.innerHTML = (() => {
		let elementString = "";
		// make sure untagged is always last
		let untaggedIndex = -1;
		for (let i = 0; i < folderStructure.length; i++) {
			if (folderStructure[i].title == "Untagged") {
				untaggedIndex = i;
				continue;
			}
			elementString += createFolderHTML(folderStructure[i]);
		}
		if (untaggedIndex != -1) {
			elementString += createFolderHTML(folderStructure[untaggedIndex]);
		}
		return elementString;
	})();
}

function main() {
	folderStructure = loadStructure();
	updateElements();
	//TODO: Do not load random page, instead save ID to localStorage and load that page
	handleLoadPage(randomId());
	handleSaveCurrentPage();
	titleElement.addEventListener("keyup", handleSaveCurrentPage);
	bodyElement.addEventListener("keyup", handleSaveCurrentPage);
}

main();
