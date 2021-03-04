const ANIMATION_DURATION = 1000;
const SLIDE_COUNT = 5;
const PREFIX = 'placeholder_1920x1080_';

let active = false;
let slide = 0;
let element = null;
let container = null;

function init() {
    container = $('.carousel__container');
    element = $('.carousel__image');

    element.attr('src', `/public/assets/images/carousel/${PREFIX}${slide}.svg`);

    $('.carousel__navigation__prev').on('click', () => prev());
    $('.carousel__navigation__next').on('click', () => next());
}

function next() {
    slide = slide + 1;

    if (slide >= SLIDE_COUNT) {
        slide = 0;
    }

    swap();
}

function prev() {
    slide = slide - 1;

    if (slide < 0) {
        slide = SLIDE_COUNT - 1;
    }

    swap(-1);
}

function swap(direction = 1) {
    if (active === true){
        return;
    } else {
        active = true;
        setTimeout(() => active = false, ANIMATION_DURATION);
    }

    element.css('z-index', '-1');

    const clone = element.clone();
    clone.css('left', `${direction * 100}%`);
    clone.attr('src', `/public/assets/images/carousel/${PREFIX}${slide}.svg`);

    container.append(clone);

    clone.animate({
        left: clone.parent().width() / 2 - clone.width() / 2
    }, ANIMATION_DURATION);
    element.animate({
        left: -direction * clone.parent().width()
    }, ANIMATION_DURATION);

    const _ = element;
    setTimeout(() => _.remove(), ANIMATION_DURATION + 100);

    element = clone;
} 

function run() {
    init();
}

$(run);