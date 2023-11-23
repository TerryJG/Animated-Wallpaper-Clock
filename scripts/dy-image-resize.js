function setBgSizeAndSpeed() {
    const bg = document.querySelector('.bg');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const targetWidth = bg.clientWidth;
    const targetHeight = bg.clientHeight;
    const defaultSize = 110; // default background-image overrides CSS defaults

    // scaling factor calculation
    const widthScale = (windowWidth / targetWidth) * 100;
    const heightScale = (windowHeight / targetHeight) * 100;

    // Use larger scaling factor or the default size to ensure image covers viewport/window
    const bgSize = Math.max(widthScale, heightScale, defaultSize);
    bg.style.backgroundSize = `${bgSize}%`;

    // Calculate speed based on window size
    const windowSize = windowWidth * windowHeight;
    const minWindowSize = 1366 * 768; // Minimum window size for reference

    // Speed duration (in seconds)
    const defaultSpeedDuration = 40;
    const maxSpeedDuration = 90;
    const minSpeedDuration = 40;

    // Speed duration function of the window size calculation
    const speedDuration = ((windowSize - minWindowSize) / (1920 * 1080 - minWindowSize)) *
        (maxSpeedDuration - minSpeedDuration) + minSpeedDuration;

    // Set to default speed duration if minWindowSize is less than reference size
    const finalSpeedDuration = windowSize < minWindowSize ? defaultSpeedDuration : speedDuration;

    // Set animation duration for panning effect
    bg.style.animation = `panRight ${finalSpeedDuration}s linear infinite`;
}
window.addEventListener('resize', setBgSizeAndSpeed);
setBgSizeAndSpeed();