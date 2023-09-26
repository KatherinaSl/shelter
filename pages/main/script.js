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
let menu = document.querySelectorAll('li');
let cover = document.getElementById('cover');

// BURGER MENU 
menuButton.addEventListener('click', function () {
    if (mobileMediaQuery.matches) {
        menuButton = document.querySelector('.icon');
        let menuOverlay = document.querySelector('.menu');
        menuButton.classList.toggle('active');
        menuOverlay.classList.toggle('open');
        document.querySelector('body').classList.toggle('fixed-position');
    }
});

document.querySelector('.start-content').addEventListener('click', function () {
    if (mobileMediaQuery.matches) {
        menuButton = document.querySelector('.icon');
        let menuOverlay = document.querySelector('.menu');
        menuButton.classList.remove('active');
        menuOverlay.classList.remove('open');
    }
})

document.querySelector('.logo').addEventListener('click', function () {
    if (mobileMediaQuery.matches) {
        menuButton = document.querySelector('.icon');
        let menuOverlay = document.querySelector('.menu');
        menuButton.classList.remove('active');
        menuOverlay.classList.remove('open');

    }
})

// BURGER MENU LIST ITEMS
for (let items of menu) {
    items.addEventListener('click', (event) => {
        menuButton = document.querySelector('.icon');
        let menuOverlay = document.querySelector('.menu');
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
function createCardComponent(cards) {
    const cardComponent = document.createElement('li');
    cardComponent.classList.add('slider-card');
    const img = document.createElement('img')
    img.src = cards.img;
    img.alt = cards.name.toLowerCase();
    img.style.width = '270px'
    const title = document.createElement('p')
    title.textContent = cards.name;
    const button = document.createElement('button')
    button.textContent = 'Learn more'

    cardComponent.append(img, title, button)
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


