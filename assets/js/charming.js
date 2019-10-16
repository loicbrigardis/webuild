import charming from 'charming';
import { TimelineMax, Power4, TweenMax } from 'gsap';

const element = document.querySelector('.c-main-title h1')

if (!element.classList.contains('charmed')) {

    charming(element);
    element.classList.add('charmed');

    const chars = [...document.querySelectorAll('.c-main-title__title span[class^=char]')];

    chars.sort(() => 5 - Math.random());

    TweenMax.staggerFrom(chars, 1, { rotationZ: '35deg', x: '-=25px', y: '-=55px', opacity: 0, ease: Power4.easeOut }, 0.05)

}