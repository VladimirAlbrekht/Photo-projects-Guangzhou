import { pastEvents } from "./constants.js";

//Переменные
const menuBurger = document.querySelector('.header__burger');
const headerBlock = document.querySelector('.header');
const container = document.querySelector('.container');
const tabsList = document.querySelectorAll('.gallery__link');
const contentList = document.querySelectorAll('.gallery__item');
const galleryList = document.querySelectorAll('.gallery__image');
const popupGallery = document.querySelector('.popup-gallery');
const popupProject = document.querySelector('.popup-project');
const pastEventList = document.querySelectorAll('.past-event');
let currentGalleryList
let currentIndex = 0; // Индекс текущего открытого изображения в попапе
const allDetails = document.querySelectorAll('.faq__question-list');
const templatePastEvent = document.querySelector('#past-event-template').content;
const pastEventContainer = document.querySelector('.past-events__container');

//Слушатели
menuBurger.addEventListener('click', () => {
    headerBlock.classList.toggle('header_active');
    menuBurger.classList.toggle('header__burger_active')
    container.classList.toggle('container_active')
})

// Автоматическое закрытие предыдущих ответов в FAQ
allDetails.forEach(item => {
    item.addEventListener('toggle', toggleOpenOneOnly)
})


pastEventList.forEach((item) => {
    let pastEventButton = item.querySelector('.past-event__link')
    pastEventButton.addEventListener('click', function () {
        popupProject.classList.add('popup_openned')

    })
})

// Функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_openned');
}

//Фукция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_openned')
}

//Подгрузка данных в галерею
function updatePopupGallery(popup, event) {
    let popupImage = popup.querySelector('.popup__image');
    popupImage.src = event.src;
    popupImage.alt = event.alt;
    currentGalleryList = Array.from(document.querySelectorAll('.gallery__item.gallery__item_active .gallery__image'));
    currentIndex = currentGalleryList.findIndex(image => image.src === event.src);
}

//Функция обновления изображения
function updatePopupImage() {
    let popupImage = popupGallery.querySelector('.popup__image');
    let imageSrc = currentGalleryList[currentIndex].src; // Получаем src следующего/предыдущего изображения
    popupImage.src = imageSrc; // Обновляем src в попапе
    popupImage.alt = currentGalleryList[currentIndex].alt;
}


// Добавление обработчика события на кнопку закрытия попапа
let closePopupButton = document.querySelectorAll('.popup__close');
closePopupButton.forEach(btn => {
    btn.addEventListener('click', function () {
        closePopup(popupGallery);
        closePopup(popupProject);
    })
})

//Функция открытия следующей картинки
function openNextImage() {
    currentIndex++; // Увеличиваем индекс текущего изображения
    if (currentIndex >= currentGalleryList.length) {
        currentIndex = 0; // Вернуться к первому изображению, если достигнут конец списка
    }
    updatePopupImage();
}

//Функция открытия предыдущей картинки
function openPreviousImage() {
    currentIndex--; // Уменьшаем индекс текущего изображения
    if (currentIndex < 0) {
        currentIndex = currentGalleryList.length - 1; // Перейти к последнему изображению, если достигнуто начало списка
    }
    updatePopupImage();
}


// Обработчик нажатия клавиш следующего предыдущего слайда и кнопки esc
function handleKeyPress(event) {
    if (event.key === 'ArrowRight') {
        openNextImage();
    } else if (event.key === 'ArrowLeft') {
        openPreviousImage();
    } else if (event.key === 'Escape') {
        closePopup(popupGallery);
        closePopup(popupProject);
    }
}

galleryList.forEach((image, index) => {
    image.addEventListener('click', function (e) {
        openPopup(popupGallery);
        // Добавление обработчика событий на нажатие клавиш стрелок и Esc
        document.addEventListener('keydown', handleKeyPress);
        updatePopupGallery(popupGallery, e.target)
        let rightArrow = popupGallery.querySelector('.popup__arrow-right');
        rightArrow.addEventListener('click', openNextImage);
        rightArrow.addEventListener('click', openNextImage);

        let leftArrow = popupGallery.querySelector('.popup__arrow-left');
        leftArrow.addEventListener('click', openPreviousImage);
        rightArrow.addEventListener('click', openNextImage);
    });
});

tabsList.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
        tabsList.forEach(tab => {
            tab.classList.remove('gallery__link_active');
        })
        e.target.classList.add('gallery__link_active');

        contentList.forEach(content => {
            content.classList.remove('gallery__item_active');
        })

        contentList[index].classList.add('gallery__item_active');
    })
})


//Функция  автоматического заркытия пункта FAQ при открытии следующего
function toggleOpenOneOnly() {
    if (this.open) {
        allDetails.forEach(item => {
            if (item != this && item.open) item.open = false
        });
    }
}


// Создаем карточки с прошедшими мероприятиями

pastEvents.forEach(item => {
    let newEvent = templatePastEvent.querySelector('.past-event').cloneNode(true);
    let imageEvent = newEvent.querySelector('.past-event__image');
    let titleEvent = newEvent.querySelector('.past-event__title');
    let descriptionEvent = newEvent.querySelector('.past-event__description');
    let linkEvent = newEvent.querySelector('.past-event__button');

    imageEvent.src = item.demoImage;
    imageEvent.alt = item.alt;
    titleEvent.textContent = item.title;
    descriptionEvent.textContent = item.description;

    linkEvent.addEventListener('click', function (event) {
        openPopup(popupProject);
        updateProjectPopupInfo(item);

    })

    pastEventContainer.appendChild(newEvent);
});

// Добавляем новые прошедние события

function updateProjectPopupInfo(item) {
    let titleProjectPopup = popupProject.querySelector('.popup-project__title');
    let descriptionProjectPopup = popupProject.querySelector('.popup-project__description');
    let linkProjectPopup = popupProject.querySelector('.popup-project__link');
    let imageOne = popupProject.querySelector('.popup-project__image_1')
    let imageTwo = popupProject.querySelector('.popup-project__image_2')
    let imageThree = popupProject.querySelector('.popup-project__image_3')
    let imageFour = popupProject.querySelector('.popup-project__image_4')
    let imageFive = popupProject.querySelector('.popup-project__image_5')

    titleProjectPopup.textContent = item.title;
    descriptionProjectPopup.textContent = item.description;
    linkProjectPopup.href = item.link;
    imageOne.src = item.image[0]
    imageOne.alt = item.alt
    imageTwo.src = item.image[1]
    imageTwo.alt = item.alt
    imageThree.src = item.image[2]
    imageThree.alt = item.alt
    imageFour.src = item.image[3]
    imageFour.alt = item.alt
    imageFive.src = item.image[4]
    imageFive.alt = item.alt


}

let linksNav = document.querySelectorAll('.link');

linksNav.forEach(function (link) {
    link.addEventListener('click', function (event) {
     /*    event.preventDefault(); */

        linksNav.forEach(function (link) {
            link.classList.remove('link_active');
        });

        event.target.classList.add('link_active');

        if (window.innerWidth < 568) {
            headerBlock.classList.remove('header_active');
            menuBurger.classList.remove('header__burger_active');
            container.classList.remove('container_active');
        }

       /*  let targetId = link.getAttribute('href');
        let targetSection = document.querySelector(targetId);

        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' }); */
    });
});

const slides = document.querySelectorAll('.slide')

for (const slide of slides) {

    slide.addEventListener('click', () => {
        removeClass()
        slide.classList.add('slide_active')
    })

}
function removeClass() {
    slides.forEach((slide) => {
        slide.classList.remove('slide_active')
    })
}
