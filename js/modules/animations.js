/**
 * Animation utilities and effects
 */
const AnimationModule = {
  init() {
    this.initScrollAnimations();
    this.initHoverEffects();
  },

  initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements with animation attributes
    const animatedElements = document.querySelectorAll('[data-animate], [data-animate-item]');
    animatedElements.forEach(element => {
      element.classList.add('opacity-0', 'translate-y-8');
      observer.observe(element);
    });
  },

  initHoverEffects() {
    // Add subtle hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('[data-hover-lift]');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.style.transform = 'translateY(-2px)';
        element.style.transition = 'transform 0.2s ease';
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translateY(0)';
      });
    });
  },

  // Utility function for creating toast notifications
  showToast(message, type = 'success', duration = 3000) {
    const toastContainer = document.getElementById('toast-container') || this.createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast ${type} transform translate-x-full transition-transform duration-300 ease-in-out bg-white border-l-4 p-4 shadow-lg rounded-lg mb-2 max-w-sm`;
    
    // Set border color based on type
    const borderColors = {
      success: 'border-green-500',
      error: 'border-red-500',
      warning: 'border-yellow-500',
      info: 'border-blue-500'
    };
    
    toast.classList.add(borderColors[type] || borderColors.info);
    
    toast.innerHTML = `
      <div class="flex">
        <div class="grow">
          <p class="text-gray-800">${message}</p>
        </div>
        <button class="ml-4 text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
      toast.classList.add('translate-x-full');
      setTimeout(() => {
        if (toast.parentElement) {
          toast.remove();
        }
      }, 300);
    }, duration);
  },

  createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed top-4 right-4 z-50';
    document.body.appendChild(container);
    return container;
  }
};

// Export for CommonJS
export default AnimationModule;
