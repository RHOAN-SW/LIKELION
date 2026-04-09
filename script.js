const wrapper = document.getElementById('fullpage-wrapper');
let currentSection = 0;
const totalSections = document.querySelectorAll('.section').length;
let isScrolling = false;

window.addEventListener('wheel', (e) => {
  if (isScrolling) return;

  // Threshold to avoid super light accidental scrolls
  if (e.deltaY > 40) {
    if (currentSection < totalSections - 1) {
      currentSection++;
      scrollPage();
    }
  } else if (e.deltaY < -40) {
    if (currentSection > 0) {
      currentSection--;
      scrollPage();
    }
  }
}, { passive: false });

function scrollPage() {
  isScrolling = true;
  wrapper.style.transform = `translateY(-${currentSection * 100}vh)`;
  
  // Timeout matches the CSS transition time (0.8s = 800ms) with a tiny buffer 
  // to avoid instant trackpad momentum re-triggering
  setTimeout(() => {
    isScrolling = false;
  }, 1000);
}

// Touch Support for Mobile
let touchStartY = 0;
let touchEndY = 0;

window.addEventListener('touchstart', (e) => {
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

window.addEventListener('touchend', (e) => {
  touchEndY = e.changedTouches[0].screenY;
  handleTouch();
}, { passive: true });

function handleTouch() {
  if (isScrolling) return;
  const swipeDistance = touchStartY - touchEndY;
  
  if (swipeDistance > 50) {
    if (currentSection < totalSections - 1) {
      currentSection++;
      scrollPage();
    }
  } else if (swipeDistance < -50) {
    if (currentSection > 0) {
      currentSection--;
      scrollPage();
    }
  }
}

// Dropdown Logic
const taskBtn = document.getElementById('task-btn');
const taskDropdown = document.getElementById('task-dropdown');

if (taskBtn && taskDropdown) {
  taskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    taskDropdown.classList.toggle('show');
  });

  // Close dropdown if clicked outside
  window.addEventListener('click', (e) => {
    if (!e.target.matches('#task-btn')) {
      if (taskDropdown.classList.contains('show')) {
        taskDropdown.classList.remove('show');
      }
    }
  });
}

// Generate Starry Background
function createStars() {
  const container = document.createElement('div');
  container.id = 'star-container';
  const section1 = document.querySelector('.section-1');
  if (section1) {
    section1.prepend(container);
  }

  const starCount = 100; // Number of stars

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random position (constraining to 100vh so they stay fixed in the viewport bg)
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    
    // Random size between 1px and 2.5px for subtle dot stars
    const size = Math.random() * 1.5 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Random animation delay and duration to create a chaotic twinkling effect
    star.style.animationDuration = `${Math.random() * 3 + 2}s`;
    star.style.animationDelay = `${Math.random()}s`;
    
    container.appendChild(star);
  }
}

// Initialize
createStars();
