const $background = document.querySelector('.main-background');
const $list = document.querySelector('.c-date__list');

$list.addEventListener('mouseover', (e) => {
    if (e.target.tagName === "A") {
        const $scene = document.querySelector('canvas');
        // console.log($scene);
        // console.log($scene.style);
        const hue = e.target.parentNode.dataset.hue || 0;
        $background.style.filter = `hue-rotate(${hue}deg)`;

        if (window.matchMedia("(min-width: 768px)").matches) {
            $scene.style.filter = `grayscale(0%) hue-rotate(${hue}deg) saturate(200%)`;
        };
    }
});

$list.addEventListener('mouseout', (e) => {
    if (e.target.tagName === "A") {
        const $scene = document.querySelector('canvas');
        $background.style.filter = `hue-rotate(0deg)`;
        if (window.matchMedia("(min-width: 768px)").matches) {
            $scene.style.filter = `sepia(0%) hue-rotate(0deg) saturate(0%)`;
        };
    }
});