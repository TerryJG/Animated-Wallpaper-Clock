const bg = document.querySelector('.bg');

const images = [
    'src/images/test.jpg',
    'src/images/img2.jpg',
    'src/images/img3.jpg',
    'src/images/img4.jpg',
    'src/images/img5.jpg',
    'src/images/img6.jpg',
    'src/images/img7.jpg',
    'src/images/img8.jpg',
    'src/images/img9.jpg',
    'src/images/img10.jpg',
];
let currentIndex = 0;

function changeBackground() {
    if (currentIndex >= images.length) {
        currentIndex = 0; // Reset to first image if array ends
    }
    // fade-out effect
    bg.style.transition = 'opacity 2s ease-in-out';
    bg.style.opacity = 0; // fade-out

    // Change background img and start fade-in effect
    setTimeout(() => {
        bg.style.backgroundImage = `url(${images[currentIndex]})`;
        bg.style.opacity = 1; // fade-in
        currentIndex++;
    }, 2000); // (2 seconds)
}

changeBackground();
setInterval(changeBackground, 30000); // (30 seconds)