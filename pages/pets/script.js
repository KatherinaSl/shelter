import cards from '../main/cards.js';

const text_button_first = '<<';
const text_button_last = '>>';
const text_button_prev = '<';
const text_button_next = '>';

const mediaQuery = window.matchMedia("(min-width: 1280px)");
const tableMediaQuery = window.matchMedia("(min-width: 768px) and (max-width: 1279px)");
const mobileMediaQuery = window.matchMedia("(min-width: 320px) and (max-width: 767px)");

let menuButton = document.querySelector('.icon');
let menuOverlay = document.querySelector('.menu');
let menu = document.querySelectorAll('li');
let cover = document.getElementById('cover');
let showcaseElement = document.createElement('ul');
let petsInformation = document.querySelector('.pets-container');
let popup = document.querySelector('.pop-up');
let popupButton = document.querySelector('.popup-button');

let total_pages = 6;
let total_pages_table = 8;
let total_pages_mobile = 16;

let allPets = new Array();
let cardComponents = new Array();
let petsPage = new Array();
let countPage = 0;
let currentPage = 1;

let counterComponent = null;
let buttonFirst = null;
let buttonPrev = null;
let buttonNext = null;
let buttonLast = null;
let buttonCurrent = null;

// BURGER MENU
menuButton.addEventListener('click', function () {
    if (mobileMediaQuery.matches) {
        menuButton.classList.toggle('active');
        menuOverlay.classList.toggle('open');
        document.querySelector('body').classList.toggle('fixed-position');
    }
});

// close burger menu
document.addEventListener('click', (event) => {
    if (mobileMediaQuery.matches) {
        if (event.target === cover) {
            menuButton.classList.remove('active');
            menuOverlay.classList.remove('open');
            cover.classList.remove('covering');
            document.querySelector('body').classList.toggle('fixed-position');
        }
    }
})

// for contacts anchor
window.disableMenu = function disableMenu() {
    menuButton.classList.remove('active');
    menuOverlay.classList.remove('open');
    cover.classList.remove('covering')
    document.querySelector('body').classList.remove('fixed-position');
}

// BURGER MENU LIST ITEMS
for (let items of menu) {
    items.addEventListener('click', (event) => {
        menuButton = document.querySelector('.icon');
        menuButton.classList.remove('active');
        menuOverlay.classList.remove('open');
    })
};

// DARKEN THE AREA UNDER OPENED MENU
menuButton.addEventListener('click', function () {
    cover.classList.toggle('covering');
});

// PAGINATION
allPets.push(cards, cards, cards, cards, cards, cards)
allPets = allPets.flat();

if (mediaQuery.matches) {
    for (let i = 0; i < total_pages; i++) {
        const newPetsPage = new Array();

        for (let i = 0; i < 8; i++) {
            newPetsPage.push(allPets.shift())
        }

        let shufflednewPetsPage = newPetsPage.sort((a, b) => 0.5 - Math.random());
        petsPage.push(shufflednewPetsPage);
    }
    counterComponent = createCounterComponent(total_pages);}

if (tableMediaQuery.matches) {
    for (let i = 0; i < total_pages_table; i++) {
        const newPetsPage = new Array();

        for (let i = 0; i < 6; i++) {
            newPetsPage.push(allPets.shift())
        }

        let shufflednewPetsPage = newPetsPage.sort((a, b) => 0.5 - Math.random());
        petsPage.push(shufflednewPetsPage);
    }
    counterComponent = createCounterComponent(total_pages_table);
}

if (mobileMediaQuery.matches) {
    for (let i = 0; i < total_pages_mobile; i++) {
        const newPetsPage = new Array();

        for (let i = 0; i < 3; i++) {
            newPetsPage.push(allPets.shift())
        }

        let shufflednewPetsPage = newPetsPage.sort((a, b) => 0.5 - Math.random());
        petsPage.push(shufflednewPetsPage);
    }
    counterComponent = createCounterComponent(total_pages_mobile);
}

petsPage[0].forEach((pet) => {
    const cardComponent = createCardComponent(pet);
    showcaseElement.append(cardComponent);
    cardComponents.push(cardComponent);
})

showcaseElement.classList.add('showcase');
document.querySelector('.pagination').append(showcaseElement, counterComponent)

function createCardComponent(card) {
    const cardComponent = document.createElement('li');
    cardComponent.classList.add('slider-card');
    cardComponent.id = card.name;
    cardComponent.onclick = function () {
        popup.classList.toggle('hidden');
        document.body.classList.add('scroll');
        for(let item of cards) {
            if(this.id === item.name) {
                petsInformation.removeChild(petsInformation.firstChild);
                petsInformation.append(createPopUpElement(item))
            }
        }
    };
    const img = document.createElement('img');
    img.src = card.img;
    img.alt = card.name.toLowerCase();
    img.style.width = '260px'
    const title = document.createElement('p');
    title.textContent = card.name;
    const button = document.createElement('button');
    button.textContent = 'Learn more'

    cardComponent.append(img, title, button)
    return cardComponent
}

// компонент перелистывания страницы
function createCounterComponent(count) {
    countPage = count;

    let component = document.createElement('div');
    component.classList.add('pagination-container');

    buttonFirst = document.createElement('button');
    buttonFirst.classList.add('arrows');
    buttonFirst.textContent = text_button_first;
    buttonPrev = document.createElement('button');
    buttonPrev.classList.add('arrows');
    buttonPrev.textContent = text_button_prev;
    buttonCurrent = document.createElement('button');
    buttonCurrent.classList.add('current-page');
    buttonCurrent.textContent = currentPage;
    buttonNext = document.createElement('button');
    buttonNext.classList.add('arrows');
    buttonNext.textContent = text_button_next;
    buttonLast = document.createElement('button');
    buttonLast.classList.add('arrows');
    buttonLast.textContent = text_button_last;

    component.append(buttonFirst, buttonPrev, buttonCurrent, buttonNext, buttonLast);

    buttonFirst.addEventListener('click', buttonFirstClickHandler);
    buttonPrev.addEventListener('click', buttonPrevClickHandler);
    buttonNext.addEventListener('click', buttonNextClickHandler);
    buttonLast.addEventListener('click', buttonLastClickHandler);

    setStatusButton();

    return component;
}

function buttonFirstClickHandler() {
    currentPage = 1;
    buttonCurrent.textContent = currentPage;
    setStatusButton();
    showPage(currentPage);
}
function buttonPrevClickHandler() {
    if (currentPage > 1) {
        currentPage -= 1;
        buttonCurrent.textContent = currentPage;
        setStatusButton();
        showPage(currentPage);
    }
}
function buttonNextClickHandler() {
    if (currentPage < countPage) {
        currentPage += 1;
        buttonCurrent.textContent = currentPage;
        setStatusButton();
        showPage(currentPage);
    }
}
function buttonLastClickHandler() {
    currentPage = countPage;
    buttonCurrent.textContent = currentPage;
    setStatusButton();
    showPage(currentPage);
}


// состояние кнопок при переключении
function setStatusButton() {
    if (currentPage === 1) {
        buttonFirst.setAttribute('disabled', true);
        buttonPrev.setAttribute('disabled', true);
    } else {
        buttonFirst.removeAttribute('disabled');
        buttonPrev.removeAttribute('disabled');
    }

    if (currentPage === countPage) {
        buttonLast.setAttribute('disabled', true);
        buttonNext.setAttribute('disabled', true);
    } else {
        buttonLast.removeAttribute('disabled');
        buttonNext.removeAttribute('disabled');
    }

}

function showPage(number) {
    showcaseElement.style.opacity = '0';

    for (let i = 0; i < cardComponents.length; i++) {
        changeCardComponent(cardComponents[i], petsPage[number - 1][i]);
    }

    showcaseElement.style.opacity = '1';
}

function changeCardComponent(card, cards) {
    card.firstChild.src = cards.img;
    card.firstChild.alt = cards.name.toLowerCase();
    card.children[1].textContent = cards.name;
}

//POP UP

// close button
popupButton.addEventListener('click', () => {
    popup.classList.add('hidden');
    document.body.classList.toggle('scroll');
})

document.addEventListener('click', (event) => {
    let information = document.querySelector('.pets-container');
    let content = '.pop-up';
    const isClosest = event.target.closest(content);
    if (isClosest === popup && event.target !== information) {
        popup.classList.add('hidden');
        document.body.classList.remove('scroll');
    }
})

function createPopUpElement(card) {
    const popup = document.createElement('div');
    popup.classList.add("popup-information")

    const img = document.createElement('img');
    img.src = card.img;
    img.alt = card.name.toLowerCase();

    const div = document.createElement('div');
    div.classList.add('pets-description');

    const title = document.createElement('p');
    title.classList.add('title');
    title.textContent = card.name;

    const subtitle = document.createElement('p');
    subtitle.classList.add('subtitle')
    subtitle.textContent = card.type + ' - ' + card.breed;

    const description = document.createElement('p');
    description.classList.add('description')
    description.textContent = card.description;
    const list = document.createElement('ul');

    const listItem1 = getPopupListElement("Age: ", card.age);
    const listItem2 = getPopupListElement("Inoculations: ", card.inoculations);
    const listItem3 = getPopupListElement("Diseases: ", card.diseases);
    const listItem4 = getPopupListElement("Parasites: ", card.diparasitesseases);

    list.append(listItem1, listItem2, listItem3, listItem4);
    div.append(title, subtitle, description, list);

    popup.append(img, div);
    return popup
}

function getPopupListElement(text, value) {
    const listItem = document.createElement('li');
    const b = document.createElement("b");
    b.textContent = text;
    listItem.append(b, value);
    return listItem;
}