
let houseNameArray = got.houses.map(e => e.name);
let filterNode = document.querySelector(".filters");
let searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keyup", handleSearch);//assigning event listeners
let personArray = [];

got.houses.forEach(house => {
    personArray = personArray.concat(house.people.map(person => {
        person.houseName = house.name;
        return person
    }));
});
let cards = document.querySelector(".cards");
let currentList = [];//This list will be used to search by filters

// creating filter - bar
houseNameArray.forEach(name => {
    let filterElm = document.createElement("a");
    filterElm.setAttribute("href", "");
    filterElm.innerText = name;
    filterElm.addEventListener("click", handleFilter);
    filterNode.append(filterElm);
});

//creating UI without filters
createUI("all");
function createUI(str) {
    cards.innerText = "";

    personArray.forEach(person => {

        if (person.houseName.includes(str) || str == "all") {
            currentList.push(person);
            buildUI(person);
        }
    });
    console.log(currentList);
}

//genral function to build UI
function buildUI(object) {
    let card = document.createElement("div");
    card.classList.add("card", "flex-c", "flex-31");
    let cardImage = document.createElement("img");
    cardImage.src = object.image;
    cardImage.setAttribute("alt", object.name);
    cardImage.setAttribute("data-id", object.name);
    let cardName = document.createElement("h2");
    cardName.innerText = object.name;
    let cardDes = document.createElement("p");
    cardDes.innerText = object.description;
    let button = document.createElement("button");
    button.innerText = "KNOW MORE!";
    card.append(cardImage, cardName, cardDes, button);
    cards.append(card);
}

//this function uses current list to call populate UI
function handleSearch(event) {
    cards.innerText = "";
    currentList.forEach(person => {
        if (person.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())) {
            buildUI(person);
        }
    });
}

//This function populated UI on the basis of House Name
function handleFilter(event) {
    event.preventDefault();
    let houseName = event.target.innerText;
    reset();
    event.target.classList.add("selected");

    createUI(houseName);

}

//This function resets the style of filters and resets current list
function reset() {
    let filters = document.querySelector(".filters").children;
    for (filter of filters) {
        filter.classList.remove("selected");
        currentList.splice(0, currentList.length);
    }

}


