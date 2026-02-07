let noCount = 0;
const noButton = document.getElementById('noBtn');
const pleadingMessage = document.getElementById('pleadingMessage');
const mainContainer = document.getElementById('mainContainer');
const successMessage = document.getElementById('successMessage');
const fireworksContainer = document.getElementById('fireworks');
const yesButton = document.getElementById('yesBtn');

// Messages to display when "No" is clicked
const messages = [
    "Are you sure?",
    "Really sure?",
    "Pretty please? 🥺",
    "I'll be very sad 😢",
    "Last chance to reconsider! 💕"
];

noButton.addEventListener('click', function() {
    noCount++;
    
    if (noCount <= 5) {
        pleadingMessage.textContent = messages[noCount - 1];
        
        if (noCount === 5) {
            // Change position of the "No" button after 5 clicks
            noButton.style.position = 'absolute';
            
            // Set initial random position
            moveNoButton();
        }
    } else {
        moveNoButton();
    }
});

function moveNoButton() {
    // Calculate random position within the container
    const containerRect = mainContainer.getBoundingClientRect();
    const buttonRect = noButton.getBoundingClientRect();
    
    const maxX = window.innerWidth - buttonRect.width - 20;
    const maxY = window.innerHeight - buttonRect.height - 20;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noButton.style.left = randomX + 'px';
    noButton.style.top = randomY + 'px';
}

yesButton.addEventListener('click', function() {
    // Hide the main container and show the success message
    mainContainer.style.display = 'none';
    successMessage.style.display = 'block';
    
    // Create fireworks
    createFireworks();
});

function createFireworks() {
    fireworksContainer.style.display = 'block';
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            
            // Random position
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            // Random color
            const colors = ['#ff6b6b', '#4ecdc4', '#ffd166', '#6a0572', '#1a936f'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            firework.style.left = x + 'px';
            firework.style.top = y + 'px';
            firework.style.backgroundColor = color;
            
            fireworksContainer.appendChild(firework);
            
            // Remove firework after animation completes
            setTimeout(() => {
                firework.remove();
            }, 1000);
        }, i * 100);
    }
    
    // Repeat fireworks periodically
    setInterval(() => {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                
                const colors = ['#ff6b6b', '#4ecdc4', '#ffd166', '#6a0572', '#1a936f'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                firework.style.left = x + 'px';
                firework.style.top = y + 'px';
                firework.style.backgroundColor = color;
                
                fireworksContainer.appendChild(firework);
                
                setTimeout(() => {
                    firework.remove();
                }, 1000);
            }, i * 100);
        }
    }, 2000);
}

// Create floating hearts background
function createHearts() {
    const heartInterval = setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'hearts';
        
        // Random horizontal position
        const leftPos = Math.random() * window.innerWidth;
        heart.style.left = leftPos + 'px';
        
        // Random size
        const size = Math.random() * 10 + 5;
        heart.style.width = size + 'px';
        heart.style.height = size + 'px';
        
        // Random color
        const colors = ['#ff6b6b', '#ff8e8e', '#ffafaf', '#ffb6c1', '#ff69b4'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        heart.style.backgroundColor = color;
        
        document.body.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 500);
}

// Start creating hearts
createHearts();