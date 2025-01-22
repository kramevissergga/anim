var checkup = document.getElementById('checkup');
if(checkup){
    var canvas = document.getElementById('checkup-canvas');
    var checkupConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true
    });
    
    var count = 200;
    var defaults = {
      origin: { y: 0.7 }
    };
    
    function getCanvasOffset(canvas) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height
      };
    }
    
    function fire(particleRatio, opts) {
        const rect = canvas.getBoundingClientRect();
        const canvasOffset = {
            x: rect.left,         
            y: rect.top,           
            width: rect.width,   
            height: rect.height 
        };
    
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
            origin: {
                x: (canvasOffset.x + canvasOffset.width / 2) / window.innerWidth,
                y: (canvasOffset.y + canvasOffset.height / 2) / window.innerHeight
            }
        });
    }
    
    
    function confettiExplosion() {
      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
    
    const element = document.querySelector(`#a-u-confetti-tracker`);
    
    let interval;
let isPaused = false;
let isRunning = false;

function checkOpacity() {
    const opacity = parseFloat(window.getComputedStyle(element).opacity);

    if (opacity >= 0.9) {
        confettiExplosion();
        clearInterval(interval);
        isRunning = false;
        isPaused = true;
        setTimeout(() => {
            isPaused = false;
            if (!isRunning && isVisible) {
                interval = setInterval(checkOpacity, 200);
                isRunning = true;
            }
        }, 5000);
    }
}

let isVisible = false;

function handleVisibility(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('Елемент на екрані');
            isVisible = true;

            if (!isPaused && !isRunning) { 
                interval = setInterval(checkOpacity, 200);
                isRunning = true;
            }
        } else {
            console.log('Елемент поза екраном');
            isVisible = false;
            clearInterval(interval);
            isRunning = false;
        }
    });
}

const observer = new IntersectionObserver(handleVisibility, {
    root: null,
    threshold: 0 
});

observer.observe(element);

}
