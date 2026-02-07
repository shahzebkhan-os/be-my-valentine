document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const config = {
        gifs: {
            initial: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmM2ZThhN2w0aG55dG5wY2o3YXY5aGd2b2QzY3V3eWJ3Y3V3eWJ3Y3V3eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/cLS1cfxvGOPVpf9g3y/giphy.gif",
            sad1: "https://media.giphy.com/media/TRgyI2f0hRHBS/giphy.gif", // Sad puppy
            sad2: "https://media.giphy.com/media/OPU6pZ2CVJbCSCWkzG/giphy.gif", // Crying cat
            sad3: "https://media.giphy.com/media/d2lcHJTG5TSCnT0I/giphy.gif", // Crying office
            sad4: "https://media.giphy.com/media/7SF5scGB2AFrgsXP63/giphy.gif", // Heartbroken
            sad5: "https://media.giphy.com/media/BEob5qwFkQRzXd9Lr/giphy.gif", // Devastated
            success: "https://media.giphy.com/media/26BRv0ThflsKCqM6k/giphy.gif" // Celebration
        },
        messages: [
            "Are you sure? 🥺",
            "Please think again 💕",
            "That hurt a little... 😢",
            "I'm going to cry... 😭",
            "You're breaking my heart 💔",
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
        noBtn.style.zIndex = '1000'; // Ensure it's on top
        
        // Ensure button stays within viewport with padding
        const padding = 20;
        const btnRect = noBtn.getBoundingClientRect();
        
        // Calculate safe area
        const maxX = window.innerWidth - btnRect.width - padding;
        const maxY = window.innerHeight - btnRect.height - padding;
        
        const randomX = Math.max(padding, Math.random() * maxX);
        const randomY = Math.max(padding, Math.random() * maxY);

        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
        
        // Mobile specific: If it overlaps Yes button, move again
        const yesRect = yesBtn.getBoundingClientRect();
        const noRect = noBtn.getBoundingClientRect(); // New position
        
        if (isOverlapping(yesRect, noRect)) {
            makeButtonRunAway(); // Recursively try again
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
        const colors = ['#ff6b6b', '#ffc3a0', '#ffd166', '#06d6a0', '#118ab2'];
        const confettiCount = 150;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = -10 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.opacity = Math.random();
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
});
