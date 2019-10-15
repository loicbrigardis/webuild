import { TweenLite } from 'gsap';

const burger = document.querySelector('.c-navigation-list__item-burger');

new Nearby(burger, {
    onProgress: (distance, mousepos) => {
        const viewportOffset = burger.getBoundingClientRect();
        // these are relative to the viewport, i.e. the window
        const top = viewportOffset.top;
        const left = viewportOffset.left;
        let positionX = left - mousepos.x;
        let positionY = top - mousepos.y;
        let offsetHeight = burger.offsetHeight * 0.5;
        let offsetWidth = burger.offsetWidth * 0.5;
        const offsetWindow = 25;
        if (
            distance < 100
            && (mousepos.x < window.innerWidth - burger.offsetWidth - offsetWindow)
        ) {

            TweenLite.to(burger, 0.5, { scale: 2, x: -positionX - offsetWidth, y: -positionY - offsetHeight });

        } else {
            TweenLite.to(burger, 0.5, { scale: 1, x: 0, y: 0 });
        }
    }
});

const logo = document.querySelector('.c-navigation-list__item-logo');

new Nearby(logo, {
    onProgress: (distance, mousepos) => {
        const viewportOffset = logo.getBoundingClientRect();
        // these are relative to the viewport, i.e. the window
        const top = viewportOffset.top;
        const left = viewportOffset.left;
        let positionX = left - mousepos.x;
        let positionY = top - mousepos.y;
        let offsetHeight = logo.offsetHeight * 0.5;
        let offsetWidth = logo.offsetWidth * 0.5;
        const offsetWindow = 25;
        if (
            distance < 100
            && (mousepos.x < window.innerWidth - logo.offsetWidth - offsetWindow)) {

            TweenLite.to(logo, 0.5, { scale: 2, x: -positionX - offsetWidth, y: -positionY - offsetHeight });

        } else {
            TweenLite.to(logo, 0.5, { scale: 1, x: 0, y: 0 });
        }
    }
});