document.addEventListener('DOMContentLoaded', function() {
  const steps = document.querySelectorAll('.timeline-step');
  const contents = document.querySelectorAll('.content-item');
  const imageWrapper = document.querySelector('.image-wrapper');
  let currentStep = 1;
  let isScrolling = false;
  let scrollTimeout;
  updateActiveStep(1);
  window.addEventListener('wheel', function(e) {
    if (isScrolling) return;
    
    clearTimeout(scrollTimeout);
    isScrolling = true;
    
    if (e.deltaY > 0 && currentStep < 3) {
      currentStep++;
    } else if (e.deltaY < 0 && currentStep > 1) {
      currentStep--;
    }
    
    updateActiveStep(currentStep);
    
    scrollTimeout = setTimeout(function() {
      isScrolling = false;
    }, 800);
  }, { passive: false });

  let touchStartY = 0;
  window.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', function(e) {
    if (isScrolling) return;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY - touchEndY;
    
    if (deltaY > 50 && currentStep < 3) {
  
      currentStep++;
      updateActiveStep(currentStep);
    } else if (deltaY < -50 && currentStep > 1) {
     
      currentStep--;
      updateActiveStep(currentStep);
    }
  }, { passive: true });

  function updateActiveStep(step) {
  
    steps.forEach(s => s.classList.remove('active'));
    document.querySelector(`.timeline-step[data-step="${step}"]`).classList.add('active');

    contents.forEach(c => c.classList.remove('active'));
    document.querySelector(`.content-item[data-step="${step}"]`).classList.add('active');
    const position = (step - 1) * -33.333;
    imageWrapper.style.transform = `translateY(${position}%)`;
  }
  steps.forEach(step => {
    step.addEventListener('click', function() {
      const stepNumber = parseInt(this.getAttribute('data-step'));
      currentStep = stepNumber;
      updateActiveStep(currentStep);
    });
  });
});