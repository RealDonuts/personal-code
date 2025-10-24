// Create floating hearts in the background
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const hearts = ['❤️', '💖', '💕', '💗', '💓', '💞'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = Math.random() * 6 + 's';
        heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
        container.appendChild(heart);
    }
}

function openEnvelope() {
    const envelope = document.getElementById('envelope');
    const heartLetterContainer = document.getElementById('heartLetterContainer');
    
    envelope.classList.add('open');
    
    // Add slight delay for better animation sequence
    setTimeout(() => {
        heartLetterContainer.classList.add('show');
    }, 500);
}

function flipLetter() {
    const heartLetter = document.getElementById('heartLetter');
    heartLetter.classList.toggle('flipped');
}

function closeLetter(event) {
    // Stop event propagation to prevent flipping when closing
    event.stopPropagation();
    
    const envelope = document.getElementById('envelope');
    const heartLetterContainer = document.getElementById('heartLetterContainer');
    const heartLetter = document.getElementById('heartLetter');
    
    // Reset letter to front page
    heartLetter.classList.remove('flipped');
    
    // Hide the letter container
    heartLetterContainer.classList.remove('show');
    
    // Close envelope after a delay
    setTimeout(() => {
        envelope.classList.remove('open');
        
        // Show custom popup after envelope closes
        setTimeout(() => {
            showPopup();
        }, 300);
    }, 800);
}

// Show custom popup
function showPopup() {
    const popupOverlay = document.getElementById('popupOverlay');
    popupOverlay.classList.add('active');
}

// Close custom popup
function closePopup() {
    const popupOverlay = document.getElementById('popupOverlay');
    popupOverlay.classList.remove('active');
}

// Confetti effect function
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffa5a5', '#ffe66d'];
    const confettiCount = 80;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '8px';
        confetti.style.height = '8px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.opacity = '0';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        // Animate confetti
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
        });
        
        // Remove confetti after animation
        animation.onfinish = () => {
            confetti.remove();
        };
    }
}

// Handle responsive behavior
function handleResize() {
    const envelope = document.getElementById('envelope');
    const heartLetterContainer = document.getElementById('heartLetterContainer');
    
    // Reset positions on resize
    if (heartLetterContainer.classList.contains('show')) {
        heartLetterContainer.style.top = '50%';
        heartLetterContainer.style.transform = 'translateX(-50%) translateY(-50%)';
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    
    // Add confetti when letter is first opened
    const heartLetterContainer = document.getElementById('heartLetterContainer');
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                if (heartLetterContainer.classList.contains('show')) {
                    createConfetti();
                }
            }
        });
    });
    
    observer.observe(heartLetterContainer, { attributes: true });
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
});

// Prevent zoom on double-tap for mobile
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);