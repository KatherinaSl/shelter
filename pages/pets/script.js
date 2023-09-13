// BURGER MENU
let menuButton = document.querySelector('.icon');
menuButton.addEventListener('click', function () {
    if (window.matchMedia("(min-width: 320px) and (max-width: 767px)").matches) {
        menuButton = document.querySelector('.icon');
        let menuOverlay = document.querySelector('.menu');
        menuButton.classList.toggle('active');
        menuOverlay.classList.toggle('open');
        document.querySelector('body').classList.toggle('fixed-position');
    }
});

document.querySelector('.our-friends').addEventListener('click', function () {
    if (window.matchMedia("(min-width: 320px) and (max-width: 767px)").matches) {
        menuButton = document.querySelector('.icon');
        let menuOverlay = document.querySelector('.menu');
        menuButton.classList.remove('active');
        menuOverlay.classList.remove('open');

    }
})

// BURGER MENU LIST ITEMS
let menu = document.querySelectorAll('li')
for(let items of menu) {
    items.addEventListener('click', (event) => {
        menuButton = document.querySelector('.icon');
        let menuOverlay = document.querySelector('.menu');
        menuButton.classList.remove('active');
        menuOverlay.classList.remove('open');
    })
}

// DARKEN THE AREA UNDER OPENED MENU
let cover = document.getElementById('cover');
menuButton.addEventListener('click', function () {
    cover.classList.toggle('covering');
})


