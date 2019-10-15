import './nearby';
import './charming';
import './color-filter';
import './textes';

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
