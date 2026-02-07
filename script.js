document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const config = {
        gifs: {
            initial: "./gifs/initial.gif",
            sad1: "./gifs/sad1.gif",
            sad2: "./gifs/sad2.gif",
            sad3: "./gifs/sad3.gif",
            sad4: "./gifs/sad4.gif",
            sad5: "./gifs/sad5.gif",
            success: "./gifs/success.gif"
        },
        messages: [
            "Are you sure? 🥺",
            "Please think again... 💕",
            "That hurt a little... 😢",
            "I'm going to cry... 😭",
            "You're breaking my heart! 💔",
            "Please? Pretty please? 🌸",
            "Don't do this to me! 🥺",
            "I believe in us! 💖"
        ]
    };

    // DOM Elements
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const reactionGif = document.getElementById('reaction-gif');
    const dynamicMessage = document.getElementById('dynamic-message');
    const successOverlay = document.getElementById('success-overlay');
    const heartsBg = document.getElementById('hearts-bg');

    // State
    let noClickCount = 0;

    // Initialize Background Hearts
    createFloatingHearts();

    // No Button Logic
    noBtn.addEventListener('click', () => {
        noClickCount++;

        // 1. Change GIF and Message (First 5 clicks)
        if (noClickCount <= 5) {
            // Update Message
            dynamicMessage.style.opacity = 0;
            setTimeout(() => {
                dynamicMessage.textContent = config.messages[noClickCount - 1] || config.messages[config.messages.length - 1];
                dynamicMessage.style.opacity = 1;
            }, 200);

            // Update GIF
            const gifKey = `sad${noClickCount}`;
            if (config.gifs[gifKey]) {
                reactionGif.src = config.gifs[gifKey];
            }
        }

        // 2. Make Yes Button Grow (Optional fun mechanic)
        const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
        yesBtn.style.fontSize = `${currentSize * 1.1}px`;

        // 3. Runaway Logic (After 5 clicks)
        if (noClickCount >= 5) {
            makeButtonRunAway();
        }
    });

    // Yes Button Logic
    yesBtn.addEventListener('click', () => {
        celebrate();
    });

    function makeButtonRunAway() {
        // Fix: Move button to body to ensure fixed positioning works relative to viewport
        // (Escape any transformed parent containers)
        if (noBtn.parentNode !== document.body) {
            document.body.appendChild(noBtn);
        }

        noBtn.style.position = 'fixed'; 
        noBtn.style.transition = 'all 0.3s ease'; 
        noBtn.style.zIndex = '9999'; // Ensure it's on top of EVERYTHING
        
        // Ensure button stays within viewport with padding
        // Using a larger padding to ensure it never touches the edge
        const padding = 50; 
        const btnRect = noBtn.getBoundingClientRect();
        const btnWidth = btnRect.width || 100; // Fallback if width is 0
        const btnHeight = btnRect.height || 50; // Fallback
        
        // Calculate safe area (Screen width minus button width minus padding)
        const maxX = window.innerWidth - btnWidth - padding;
        const maxY = window.innerHeight - btnHeight - padding;
        
        // Ensure coordinates are positive (prevent going off top/left)
        // Use random position between padding and max safe area
        const randomX = Math.max(padding, Math.min(Math.random() * maxX, maxX));
        const randomY = Math.max(padding, Math.min(Math.random() * maxY, maxY));

        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
        
        // Mobile specific: If it overlaps Yes button, move again
        const yesRect = yesBtn.getBoundingClientRect();
        // Recalculate noRect based on new coordinates we just assigned (conceptually)
        // or just wait for next tick? 
        // Better: simple overlap check with the calculated coordinates
        
        const noLeft = randomX;
        const noRight = randomX + btnWidth;
        const noTop = randomY;
        const noBottom = randomY + btnHeight;

        const yesLeft = yesRect.left;
        const yesRight = yesRect.right;
        const yesTop = yesRect.top;
        const yesBottom = yesRect.bottom;

        // Check intersection
        const overlaps = !(noRight < yesLeft || 
                          noLeft > yesRight || 
                          noBottom < yesTop || 
                          noTop > yesBottom);

        if (overlaps) {
            // Recursively try again immediately
            makeButtonRunAway(); 
        }
    }

    function isOverlapping(rect1, rect2) {
        return !(rect1.right < rect2.left || 
                 rect1.left > rect2.right || 
                 rect1.bottom < rect2.top || 
                 rect1.top > rect2.bottom);
    }

    function celebrate() {
        successOverlay.style.display = 'flex';
        startConfetti();
    }

    // Floating Hearts Background
    function createFloatingHearts() {
        const heartCount = 15;
        for (let i = 0; i < heartCount; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('bg-heart');
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.animationDuration = Math.random() * 5 + 10 + 's';
                heartsBg.appendChild(heart);
                
                // Remove and recreate to keep DOM clean-ish
                heart.addEventListener('animationend', () => {
                    heart.remove();
                    createFloatingHearts(); // Recursively add one back
                });
            }, i * 500);
        }
    }

    // Confetti Effect
    function startConfetti() {
        const colors = ['#ff6b6b', '#ffc3a0', '#ffd166', '#06d6a0', '#118ab2', '#ff0000', '#ff00ff', '#00ffff'];
        const confettiCount = 500; // Increased count for impact

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = '50%'; // Start from center
            confetti.style.top = '50%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Random direction
            const angle = Math.random() * 360;
            const velocity = Math.random() * 20 + 10;
            const tx = Math.cos(angle * Math.PI / 180) * window.innerWidth; // Shoot outwards
            const ty = Math.sin(angle * Math.PI / 180) * window.innerHeight;
            
            confetti.style.setProperty('--tx', `${tx}px`);
            confetti.style.setProperty('--ty', `${ty}px`);
            
            confetti.style.animationDuration = Math.random() * 2 + 1.5 + 's';
            confetti.style.opacity = 1;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }
});
