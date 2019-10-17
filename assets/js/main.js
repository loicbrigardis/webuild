import './nearby';
import './charming';
import './color-filter';
import Highway from '@dogstudio/highway';
import CustomTransition from './custom-transition';
import CustomRenderer from './custom-renderer';
import { TweenLite } from 'gsap';

if (window.matchMedia("(min-width: 768px)").matches) {
    import('./scene').then();
    import('./magnet').then();
};

import AOS from "AOS";

AOS.init({
    disable: function () {
        var maxWidth = 998;
        return window.innerWidth < maxWidth;
    }
});

const H = new Highway.Core({
    renderers: {
        index: CustomRenderer
    },
    transitions: {
        default: CustomTransition
    }
});