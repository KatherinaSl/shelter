// SLIDER SECTION PETS

// get three random numbers
function randomNums(range, amount) {
    let arr = []
    for (let i = 1; i <= range; i++) {
        arr.push(i)
    }

    let result = [];

    for (let i = 1; i <= amount; i++) {
        const random = Math.floor(Math.random() * (range - i));
        result.push(arr[random]);
        arr[random] = arr[range - i];
    }

    return result;
}


let buttonNext = document.querySelector('.arrow-right')
let buttonPrev = document.querySelector('.arrow-left')

let imagesOffset = 0

// get three random slider div 
let slider = document.querySelector('.slider')
let indexes = randomNums(7, 3)
for (let i = 0; i < indexes.length; i++) {
    let cardElement = getCardElement(cards[indexes[i]])
    slider.append(cardElement)
}

buttonNext.addEventListener('click', () => {
    let sliderCard = document.querySelector('.slider-card').offsetWidth
    imagesOffset = -(sliderCard * 3) - 233

    let indexes = randomNums(7, 3)
    for (let i = 0; i < indexes.length; i++) {
        let cardElement = getCardElement(cards[indexes[i]])
        slider.append(cardElement)
    }

    if(document.querySelector('.slider').childElementCount > 6) {
        slider.classList.add('notransition')

        slider.firstChild.remove()
        slider.firstChild.remove()
        slider.firstChild.remove()
        
        slider.style.marginLeft = '0px'

        slider.offsetHeight
        slider.classList.remove('notransition')
    }

    slider.style.marginLeft = imagesOffset + 'px'

})

buttonPrev.addEventListener('click', () => {
    
    let sliderCard = document.querySelector('.slider-card').offsetWidth
    slider.classList.add('notransition')

    let indexes = randomNums(7, 3)
    for (let i = 0; i < indexes.length; i++) {
        let cardElement = getCardElement(cards[indexes[i]])
        slider.insertBefore(cardElement, slider.firstChild)
    }
    
    slider.style.marginLeft = (-sliderCard * 3 - 233 )+ 'px'

    slider.offsetHeight
    slider.classList.remove('notransition')

    if(slider.childElementCount > 6) {
        slider.classList.add('notransition')

        slider.lastChild.remove()
        slider.lastChild.remove()
        slider.lastChild.remove()
        
        slider.offsetHeight
        slider.classList.remove('notransition')
    }
    
    slider.style.marginLeft = '0px'
})


import cards from './cards.js';

// create slider-card
function getCardElement(card) {
    let sliderCard = document.createElement('div')
    sliderCard.classList.add('slider-card')

    let img = document.createElement('img')
    img.src = card.img;
    img.alt = card.name.toLowerCase();
    img.style.width = '270px'
    let title = document.createElement('p')
    title.textContent = card.name;
    let button = document.createElement('button')
    button.textContent = 'Learn more'

    sliderCard.append(img, title, button)
    return sliderCard
}


function getUniqueElements() {
    // let arr = []
    let array = slider.childElementCount
    for (let i = 0; i < array; i++) {
        let imgElement = document.querySelector('.slider-card').firstChild
        console.log(imgElement)
    }
}

console.log(getUniqueElements())