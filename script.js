

// ========================================
// 1. LIVE CLOCK
// ========================================

function updateClock() {
    const el = document.getElementById('clock');

    if (el) {
        el.textContent = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
}

updateClock();
setInterval(updateClock, 1000);


// ========================================
// 2. REVEAL ANIMATION WHEN SCROLLING
// ========================================

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12
    });

    revealItems.forEach((item) => {
        revealObserver.observe(item);
    });

} else {

    revealItems.forEach((item) => {
        item.classList.add('visible');
    });

}


// ========================================
// 3. GALLERY SLIDESHOW
// ========================================

let slideIndex = 0;

function changeSlide(step) {

    const slides = document.querySelectorAll('.memory-slide');

    if (!slides.length) return;

    slides[slideIndex].hidden = true;

    slideIndex = (slideIndex + step + slides.length) % slides.length;

    slides[slideIndex].hidden = false;

    const count = document.getElementById('slide-count');

    if (count) {
        count.textContent = (slideIndex + 1) + ' / ' + slides.length;
    }

}


// ========================================
// 4. GRANDPA MEMORY SONG
// ========================================

const grandpaSong = document.getElementById('grandpaSong');
const musicButton = document.getElementById('musicButton');

if (grandpaSong && musicButton && 'IntersectionObserver' in window) {

    const grandpaSection = grandpaSong.closest('section');

    let musicEnabled = false;

    // Automatically play muted when visitor reaches Grandpa section.
    const musicObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                if (!musicEnabled) {
                    grandpaSong.muted = true;
                    grandpaSong.play().catch(() => {
                        console.log('Browser requires interaction to play audio.');
                    });
                }

            } else {

                grandpaSong.pause();

            }

        });

    }, {
        threshold: 0.4
    });

    if (grandpaSection) {
        musicObserver.observe(grandpaSection);
    }

    // Visitor can turn on the music by clicking the button.
    musicButton.addEventListener('click', () => {

        musicEnabled = true;
        grandpaSong.muted = false;

        grandpaSong.play().then(() => {

            musicButton.textContent = '♫ Music is playing';

        }).catch(() => {

            musicButton.textContent = '♫ Click to play music';

        });

    });

    // Pause music when visitor leaves the Grandpa section.
    // If they return, the song resumes.

}
