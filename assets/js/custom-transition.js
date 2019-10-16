import Highway from '@dogstudio/highway';
import charming from 'charming';
import { TimelineMax, Power4, TweenMax } from 'gsap';

class CustomTransition extends Highway.Transition {
    out({ from, trigger, done }) {
        const transition = document.querySelector('.o-transition');
        const transitionSpans = document.querySelectorAll('.o-transition span');
        transition.style.display = "flex";
        TweenMax.staggerFromTo(transitionSpans, 0.5,
            { x: "-100%" },
            { x: "0%" }
            , 0.2, done);

    }

    in({ from, to, trigger, done }) {
        from.remove();

        const transition = document.querySelector('.o-transition');
        const transitionSpans = document.querySelectorAll('.o-transition span');
        TweenMax.staggerFromTo(transitionSpans, 0.5,
            { x: 0 },
            { x: "-100%" }
            , 0.2);

        const scene = document.querySelector('#scene');
        if (to.getAttribute('data-router-view') !== 'index') {
            scene.style.display = "none";
        } else {
            scene.style.display = "block";
        }

        const element = document.querySelector('.c-main-title h1')
        if (!element.classList.contains('charmed')) {
            charming(element);
        }

        const chars = [...document.querySelectorAll('.c-main-title__title span[class^=char]')];
        chars.sort(() => 5 - Math.random());

        TweenMax.staggerFromTo(chars, 1,
            { rotationZ: '35deg', x: '-=25px', y: '-=55px', opacity: 0, ease: Power4.easeOut },
            { rotationZ: '0deg', x: '0px', y: '0px', opacity: 1, ease: Power4.easeOut, onComplete: () => done() },
            0.05)

    }

}

export default CustomTransition;