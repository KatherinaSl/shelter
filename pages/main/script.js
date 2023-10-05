import cards from './cards.js';

const cardContainer = document.querySelector('.card_container');
const buttonRight = document.querySelector('.arrow-right');
const buttonLeft = document.querySelector('.arrow-left');
const index_visible_group = 2;
const count_card_block = 3;
const mediaQuery = window.matchMedia("(min-width: 1280px)");
const tableMediaQuery = window.matchMedia("(min-width: 768px) and (max-width: 1279px)");
const mobileMediaQuery = window.matchMedia("(min-width: 320px) and (max-width: 767px)");

let count_card = 3;
let count_card_table = 2;
let count_card_mobile = 1;
let cardsArray = new Array();
let visibleCards = new Array();
let deltaOrder = 0;  //change the ORDER
let isRightClick = false;
let isLeftClick = false;

let menuButton = document.querySelector('.icon');
let menuOverlay = document.querySelector('.menu');
let menu = document.querySelectorAll('li');
let cover = document.getElementById('cover');
let petsInformation = document.querySelector('.pets-container');
let popup = document.querySelector('.pop-up');
let popupButton = document.querySelector('.popup-button');

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
            cover.classList.remove('covering')
            document.querySelector('body').classList.remove('fixed-position');
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
}

// DARKEN THE AREA UNDER OPENED MENU
menuButton.addEventListener('click', function () {
    cover.classList.toggle('covering');
})

// SLIDER SECTION PETS
cards.forEach((pet) => {
    const cardComponent = createCardComponent(pet); //generation of all cards
    cardsArray.push(cardComponent);
});

// create group of cards
for (let i = 0; i < count_card_block; i++) {
    const cardGroup = document.createElement('ul');
    cardGroup.classList.add('card_group');  //create ul.card_group 
    cardGroup.style.order = `${i + 1}`; //add order 1,2,3 
    cardContainer.append(cardGroup); //add into div.card_container
}

if (mediaQuery.matches) {
    for (let i = 0; i < count_card; i++) {
        cardContainer.children[1].append(cardsArray[i]); //add ONE card in container
        visibleCards.push(cardsArray[i]);  //array with cards visible on the screen
    }
}

if (tableMediaQuery.matches) {
    for (let i = 0; i < count_card_table; i++) {
        cardContainer.children[1].append(cardsArray[i]); //add ONE card in container
        visibleCards.push(cardsArray[i]);  //array with cards visible on the screen
    }
}

if (mobileMediaQuery.matches) {
    for (let i = 0; i < count_card_mobile; i++) {
        cardContainer.children[1].append(cardsArray[i]); //add ONE card in container
        visibleCards.push(cardsArray[i]);  //array with cards visible on the screen
    }
}

// create one card
function createCardComponent(card) {
    const cardComponent = document.createElement('li');
    cardComponent.classList.add('slider-card');
    cardComponent.id = card.name
    cardComponent.onclick = function () {
        popup.classList.toggle('hidden');
        document.body.classList.toggle('scroll');
        for (let item of cards) {
            if (this.id === item.name) {
                petsInformation.removeChild(petsInformation.firstChild);
                petsInformation.append(createPopUpElement(item))
            }
        }
    };

    const img = document.createElement('img');
    img.src = card.img;
    img.alt = card.name.toLowerCase();
    img.style.width = '260px';
    const title = document.createElement('p');
    title.textContent = card.name;
    const button = document.createElement('button');
    button.textContent = 'Learn more';

    cardComponent.append(img, title, button);
    return cardComponent
}

buttonLeft.addEventListener('click', buttonLeftClickHandler);
buttonRight.addEventListener('click', buttonRightClickHandler);
cardContainer.addEventListener('transitionend', endTransitionHandler);

function buttonLeftClickHandler() {
    if (!isRightClick) {
        let rightCardGroup = null;
        for (let group of cardContainer.children) {
            if (group.style.order === (index_visible_group + 1).toString()) {
                rightCardGroup = group;
                break;
            }
        }

        while (rightCardGroup.firstElementChild) {
            rightCardGroup.firstElementChild.remove();
        }

        const cardsToShow = getCardsToShow(); //get group ot three cards 
        visibleCards = new Array(...cardsToShow);
        cardsToShow.forEach((card) => {
            rightCardGroup.insertAdjacentElement('beforeend', card)
        })
    }

    isLeftClick = true;
    isRightClick = !isLeftClick;

    deltaOrder = -1;
    cardContainer.classList.add('animate_left');
    disableButtons();
};

function buttonRightClickHandler() {
    if (!isLeftClick) {
        let leftCardGroup = null;
        for (let group of cardContainer.children) {
            if (group.style.order === (index_visible_group - 1).toString()) {
                leftCardGroup = group;
                break;
            }
        }
        while (leftCardGroup.firstChild) {
            leftCardGroup.firstElementChild.remove();
        }

        const cardsToShow = getCardsToShow(); //get group ot three cards 
        visibleCards = new Array(...cardsToShow);
        cardsToShow.forEach((card) => {
            leftCardGroup.insertAdjacentElement('beforeend', card)
        })
    }

    isRightClick = true;
    isLeftClick = !isRightClick;

    deltaOrder = 1;
    cardContainer.classList.add('animate_right');
    disableButtons();
};

function endTransitionHandler() {
    cardContainer.classList.add('no_transition')
    if (mediaQuery.matches) {
        for (const group of cardContainer.children) {
            let order = Number(group.style.order);
            order = order + deltaOrder;
            if (order <= 0) {
                order = count_card;
            } else if (order > count_card) {
                order = 1;
            }

            group.style.order = order;
        }
    }

    if (tableMediaQuery.matches) {
        for (const group of cardContainer.children) {
            let order = Number(group.style.order);
            order = order + deltaOrder;
            if (order === 0) {
                order = 3;
            } else if (order > count_card_block) {
                order = 1
            }
            group.style.order = order;
        }
    }

    if (mobileMediaQuery.matches) {
        for (const group of cardContainer.children) {
            let order = Number(group.style.order);
            order = order + deltaOrder;
            if (order < count_card_mobile) {
                order = 3;
            } else if (order > count_card_block) {
                order = 1
            }
            group.style.order = order;
        }
    }

    cardContainer.classList.remove('animate_right', 'animate_left');
    setTimeout(() => {
        cardContainer.classList.remove('no_transition');
        enableButtons();
    }, 1)
}

// check if card exist in group on the screen AND in group that we create rn
// if NO add to group that we create rn
function getCardsToShow() {
    if (mediaQuery.matches) {
        let cardsToShow = new Array();
        while (cardsToShow.length < count_card) {
            const index = getRandomNumber(0, cardsArray.length - 1);
            if (!visibleCards.includes(cardsArray[index]) && !cardsToShow.includes(cardsArray[index])) {
                cardsToShow.push(cardsArray[index]);
            }
        }
        return cardsToShow
    }

    if (tableMediaQuery.matches) {
        let cardsToShow = new Array();
        while (cardsToShow.length < count_card_table) {
            const index = getRandomNumber(0, cardsArray.length - 1);
            if (!visibleCards.includes(cardsArray[index]) && !cardsToShow.includes(cardsArray[index])) {
                cardsToShow.push(cardsArray[index]);
            }
        }
        return cardsToShow
    }

    if (mobileMediaQuery.matches) {
        let cardsToShow = new Array();
        while (cardsToShow.length < count_card_mobile) {
            const index = getRandomNumber(0, cardsArray.length - 1);
            if (!visibleCards.includes(cardsArray[index]) && !cardsToShow.includes(cardsArray[index])) {
                cardsToShow.push(cardsArray[index]);
            }
        }
        return cardsToShow
    }
}

function getRandomNumber(min, max) {
    min = Math.ceil(min); //округление вверх
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

// when animation begins buttons disable
function disableButtons() {
    buttonLeft.setAttribute('disabled', true);
    buttonRight.setAttribute('disabled', true);
}
// when animation ends buttons become active
function enableButtons() {
    buttonLeft.removeAttribute('disabled');
    buttonRight.removeAttribute('disabled');
}


//POP UP

// close button
popupButton.addEventListener('click', () => {
    popup.classList.add('hidden');
    document.body.classList.toggle('scroll');
})

document.addEventListener('click', (event) => {    
    const closest = event.target.closest('.popup-information');
    const closestCard = event.target.closest('.slider-card');
    if (closest === null && !popup.classList.contains('hidden') && closestCard === null) {
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
