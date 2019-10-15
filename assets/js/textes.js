import { TimelineMax, Power4, TweenMax } from 'gsap';

const chars = [...document.querySelectorAll('.c-main-title__title span[class^=char]')];
chars.sort(() => 5 - Math.random());

TweenMax.staggerFrom(chars, 1, { rotationZ: '35deg', x: '-=25px', y: '-=55px', opacity: 0, ease: Power4.easeOut }, 0.05)